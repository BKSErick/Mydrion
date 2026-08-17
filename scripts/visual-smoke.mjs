import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.MYDRION_BASE_URL ?? "http://127.0.0.1:4177";
const executablePath =
  process.env.MYDRION_CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactsDirectory = resolve("artifacts");

await mkdir(artifactsDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const failures = [];

async function inspectViewport(name, viewport, fullPage = false) {
  const page = await browser.newPage({ viewport });

  page.on("pageerror", (error) => failures.push(`${name}: ${error.message}`));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().includes("Failed to load resource")
    ) {
      failures.push(`${name}: console ${message.text()}`);
    }
  });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    title: document.title,
    heading: document.querySelector("h1")?.getAttribute("aria-label"),
    titleMaskPaddingTop: parseFloat(
      getComputedStyle(document.querySelector(".hero__title-mask")).paddingTop
    ),
    offenders: Array.from(document.querySelectorAll("*"))
      .map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          element: `${element.tagName.toLowerCase()}.${element.className}`,
          left: Math.round(bounds.left),
          right: Math.round(bounds.right),
          width: Math.round(bounds.width)
        };
      })
      .filter(
        ({ left, right }) =>
          left < -1 || right > document.documentElement.clientWidth + 1
      )
      .slice(0, 8)
  }));

  if (dimensions.content > dimensions.viewport + 1) {
    failures.push(
      `${name}: overflow horizontal ${dimensions.content}px > ${dimensions.viewport}px ${JSON.stringify(dimensions.offenders)}`
    );
  }

  if (!dimensions.title.includes("Mydrion")) {
    failures.push(`${name}: título ausente`);
  }

  // Fonte da verdade: `hero.headline` em src/data/siteContent.ts.
  // Comparação exata de propósito: além de detectar hero errado, ela pega
  // corrupção de acento (ver checagem de titleMaskPaddingTop logo abaixo).
  if (
    dimensions.heading !== "A GENTE ORGANIZA O COMERCIAL E A OPERAÇÃO DE QUEM FABRICA."
  ) {
    failures.push(`${name}: hero divergente`);
  }

  if (dimensions.titleMaskPaddingTop <= 0) {
    failures.push(`${name}: máscara do hero pode cortar acentos`);
  }

  await page.screenshot({
    path: resolve(artifactsDirectory, `mydrion-${name}.png`),
    fullPage
  });

  if (name === "desktop") {
    const trackingAndProjects = await page.evaluate(() => ({
      pixelId: window.__mydrionMetaPixelId,
      pixelScript: document.querySelector(
        'script[data-mydrion-meta-pixel="true"]'
      )?.getAttribute("src"),
      hasRemovedProject: document.body.textContent?.includes("Ideia Hub"),
      projectTotal: document.querySelector(
        ".projects__counter span:nth-child(3)"
      )?.textContent
    }));

    if (
      trackingAndProjects.pixelId !== "1175331711422463" ||
      trackingAndProjects.pixelScript !==
        "https://connect.facebook.net/en_US/fbevents.js"
    ) {
      failures.push(
        `${name}: Meta Pixel não foi inicializado com o ID confirmado`
      );
    }
    if (trackingAndProjects.hasRemovedProject) {
      failures.push(`${name}: Ideia Hub ainda aparece na página`);
    }
    if (trackingAndProjects.projectTotal !== "03") {
      failures.push(
        `${name}: contador de projetos retornou ${trackingAndProjects.projectTotal}`
      );
    }

    const logoCount = await page
      .locator('.client-marquee__group:not([aria-hidden="true"]) img')
      .count();
    if (logoCount !== 7) {
      failures.push(`${name}: carrossel carregou ${logoCount} de 7 logos`);
    }

    await page.locator(".client-marquee").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const logoPresentation = await page.evaluate(() => {
      const logo = document.querySelector(".client-marquee__group img");
      const logoViewport = document.querySelector(".client-marquee__viewport");
      const projectViewport = document.querySelector(".projects__viewport");

      return {
        logoFilter: logo ? getComputedStyle(logo).filter : "missing",
        logoOverflow: logoViewport
          ? getComputedStyle(logoViewport).overflowX
          : "missing",
        projectScrollbar: projectViewport
          ? getComputedStyle(projectViewport).scrollbarWidth
          : "missing",
        hasPageProgress: Boolean(document.querySelector(".page-progress"))
      };
    });

    if (logoPresentation.logoFilter !== "none") {
      failures.push(
        `${name}: logos ainda recebem filtro ${logoPresentation.logoFilter}`
      );
    }
    if (logoPresentation.logoOverflow !== "hidden") {
      failures.push(
        `${name}: viewport das logos usa overflow ${logoPresentation.logoOverflow}`
      );
    }
    if (logoPresentation.projectScrollbar !== "none") {
      failures.push(
        `${name}: scrollbar dos projetos está ${logoPresentation.projectScrollbar}`
      );
    }
    if (!logoPresentation.hasPageProgress) {
      failures.push(`${name}: progresso vertical ausente`);
    }

    await page.screenshot({
      path: resolve(artifactsDirectory, "mydrion-desktop-clients.png")
    });

    await page.locator("#projetos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const projectViewport = page.locator(".projects__viewport");
    await projectViewport.hover();
    const scrollBefore = await projectViewport.evaluate(
      (element) => element.scrollLeft
    );
    await page.mouse.wheel(0, 760);
    await page.waitForTimeout(500);
    const scrollAfter = await projectViewport.evaluate(
      (element) => element.scrollLeft
    );

    if (scrollAfter <= scrollBefore) {
      failures.push(`${name}: roda do mouse não moveu os projetos lateralmente`);
    }

    await page.screenshot({
      path: resolve(artifactsDirectory, "mydrion-desktop-projects.png")
    });

    const brief = page.locator("#briefing");
    await brief.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const requiredFields = await brief.locator("[required]").count();
    if (requiredFields < 4) {
      failures.push(
        `${name}: briefing encontrou somente ${requiredFields} campos obrigatórios`
      );
    }
    const formAffordance = await brief.evaluate((section) => {
      const form = section.querySelector(".project-brief__form");
      const header = section.querySelector(".project-brief__form-header");
      const input = section.querySelector("input");
      const select = section.querySelector("select");

      return {
        hasHeader: Boolean(header?.textContent?.includes("Briefing inicial")),
        formBorder: form ? getComputedStyle(form).borderTopWidth : "missing",
        inputBackground: input
          ? getComputedStyle(input).backgroundColor
          : "missing",
        selectAppearance: select ? getComputedStyle(select).appearance : "missing",
        requiredMarkers: section.querySelectorAll(
          '.project-brief__field label span[aria-hidden="true"]'
        ).length
      };
    });
    if (
      !formAffordance.hasHeader ||
      formAffordance.formBorder === "0px" ||
      formAffordance.inputBackground === "rgba(0, 0, 0, 0)" ||
      formAffordance.selectAppearance !== "none" ||
      formAffordance.requiredMarkers < 4
    ) {
      failures.push(
        `${name}: affordance do formulário inválida ${JSON.stringify(formAffordance)}`
      );
    }
    await page.screenshot({
      path: resolve(artifactsDirectory, "mydrion-desktop-briefing.png")
    });
  } else if (name === "mobile" || name === "tablet") {
    await page.locator(".client-marquee").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: resolve(artifactsDirectory, `mydrion-${name}-clients.png`)
    });

    await page.locator("#briefing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: resolve(artifactsDirectory, `mydrion-${name}-briefing.png`)
    });
  }

  await page.close();
  return dimensions;
}

async function inspectHeroMotion() {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 }
  });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(100);

  const earlyState = await page.evaluate(() => {
    const title = document.querySelector(".hero__title-line");
    const mark = document.querySelector(".architecture-field__mark");
    const tracer = document.querySelector(
      ".architecture-field__tracers circle"
    );
    const sweep = document.querySelector(".architecture-field__sweep");

    return {
      titleOpacity: title ? Number(getComputedStyle(title).opacity) : 1,
      markOpacity: mark ? Number(getComputedStyle(mark).opacity) : 1,
      tracerAnimation: tracer
        ? getComputedStyle(tracer).animationName
        : "missing",
      sweepAnimation: sweep ? getComputedStyle(sweep).animationName : "missing"
    };
  });

  await page.waitForTimeout(360);
  await page.screenshot({
    path: resolve(artifactsDirectory, "mydrion-hero-entry.png")
  });
  await page.waitForTimeout(1300);

  const finalState = await page.evaluate(() => {
    const title = document.querySelector(".hero__title-line");
    const mark = document.querySelector(".architecture-field__mark");
    return {
      titleOpacity: title ? Number(getComputedStyle(title).opacity) : 0,
      markOpacity: mark ? Number(getComputedStyle(mark).opacity) : 0
    };
  });

  if (
    earlyState.titleOpacity >= finalState.titleOpacity ||
    earlyState.markOpacity >= finalState.markOpacity ||
    finalState.titleOpacity < 0.98 ||
    finalState.markOpacity < 0.98 ||
    earlyState.tracerAnimation !== "field-trace" ||
    earlyState.sweepAnimation !== "field-sweep"
  ) {
    failures.push(
      `hero-motion: sequência inválida ${JSON.stringify({ earlyState, finalState })}`
    );
  }

  await page.screenshot({
    path: resolve(artifactsDirectory, "mydrion-hero-settled.png")
  });
  await page.close();
}

const desktop = await inspectViewport("desktop", { width: 1440, height: 1000 });
const tablet = await inspectViewport("tablet", { width: 1024, height: 768 });
const mobile = await inspectViewport("mobile", { width: 390, height: 844 });
await inspectHeroMotion();

const reducedMotionPage = await browser.newPage({
  viewport: { width: 1440, height: 720 },
  reducedMotion: "reduce"
});
await reducedMotionPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
await reducedMotionPage.waitForTimeout(1500);
const reducedMotionHero = await reducedMotionPage.evaluate(() => ({
  bodyOverride: document.body.classList.contains("motion-override"),
  motionMode: document
    .querySelector('[data-testid="hero-architecture"]')
    ?.getAttribute("data-motion"),
  motionToggleCount: document.querySelectorAll(".hero__motion-toggle").length,
  tracerDisplay: getComputedStyle(
    document.querySelector(".architecture-field__tracers")
  ).display,
  tracerAnimation: getComputedStyle(
    document.querySelector(".architecture-field__tracers circle")
  ).animationName
}));

if (
  !reducedMotionHero.bodyOverride ||
  reducedMotionHero.motionMode !== "full" ||
  reducedMotionHero.motionToggleCount !== 0 ||
  reducedMotionHero.tracerDisplay === "none" ||
  reducedMotionHero.tracerAnimation !== "field-trace"
) {
  failures.push(
    `reduced-motion: motion direto invalido ${JSON.stringify(reducedMotionHero)}`
  );
}
await reducedMotionPage.screenshot({
  path: resolve(
    artifactsDirectory,
    "mydrion-reduced-motion-hero-direct.png"
  )
});
await reducedMotionPage.locator(".client-marquee").scrollIntoViewIfNeeded();
await reducedMotionPage.waitForTimeout(300);
const reducedMotionLogos = await reducedMotionPage.evaluate(() => {
  const viewport = document.querySelector(".client-marquee__viewport");
  const group = document.querySelector(
    '.client-marquee__group:not([aria-hidden="true"])'
  );

  return {
    pageOverflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    viewportOverflow: viewport
      ? getComputedStyle(viewport).overflowX
      : "missing",
    groupDisplay: group ? getComputedStyle(group).display : "missing",
    logosOutsideCells: Array.from(
      group?.querySelectorAll("li") ?? []
    ).filter((cell) => {
      const image = cell.querySelector("img");
      if (!image) return false;
      const cellBounds = cell.getBoundingClientRect();
      const imageBounds = image.getBoundingClientRect();
      return (
        imageBounds.left < cellBounds.left - 1 ||
        imageBounds.right > cellBounds.right + 1
      );
    }).length
  };
});

if (
  reducedMotionLogos.pageOverflow > 1 ||
  reducedMotionLogos.viewportOverflow !== "hidden" ||
  reducedMotionLogos.groupDisplay !== "grid" ||
  reducedMotionLogos.logosOutsideCells > 0
) {
  failures.push(
    `reduced-motion: carrossel estático inválido ${JSON.stringify(reducedMotionLogos)}`
  );
}
await reducedMotionPage.screenshot({
  path: resolve(artifactsDirectory, "mydrion-reduced-motion-clients.png")
});
await reducedMotionPage.close();

await browser.close();

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Visual smoke aprovado: desktop ${desktop.viewport}px, tablet ${tablet.viewport}px, mobile ${mobile.viewport}px.`
  );
}
