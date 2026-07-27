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

  if (dimensions.heading !== "CONSTRUÍMOS O QUE NÃO EXISTE PRONTO.") {
    failures.push(`${name}: hero divergente`);
  }

  await page.screenshot({
    path: resolve(artifactsDirectory, `mydrion-${name}.png`),
    fullPage
  });

  if (name === "desktop") {
    await page.locator("#projetos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({
      path: resolve(artifactsDirectory, "mydrion-desktop-projects.png")
    });
  }

  await page.close();
  return dimensions;
}

const desktop = await inspectViewport("desktop", { width: 1440, height: 1000 });
const mobile = await inspectViewport("mobile", { width: 390, height: 844 });

await browser.close();

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Visual smoke aprovado: desktop ${desktop.viewport}px, mobile ${mobile.viewport}px.`
  );
}
