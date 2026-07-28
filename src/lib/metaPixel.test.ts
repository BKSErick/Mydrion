import {
  DEFAULT_META_PIXEL_ID,
  initMetaPixel,
  trackMetaEvent
} from "./metaPixel";

describe("Meta Pixel integration", () => {
  afterEach(() => {
    delete window.fbq;
    delete window._fbq;
    delete window.__mydrionMetaPixelId;
    document
      .querySelectorAll('script[data-mydrion-meta-pixel="true"]')
      .forEach((script) => script.remove());
  });

  it("does not initialize without a configured pixel id", () => {
    expect(initMetaPixel("")).toBe(false);
    expect(window.fbq).toBeUndefined();
  });

  it("uses the confirmed Mydrion pixel in production by default", () => {
    expect(DEFAULT_META_PIXEL_ID).toBe("1175331711422463");
    expect(initMetaPixel(DEFAULT_META_PIXEL_ID)).toBe(true);
    expect(window.__mydrionMetaPixelId).toBe("1175331711422463");
  });

  it("forwards events when the pixel API is available", () => {
    const fbq = vi.fn();
    window.fbq = fbq;

    trackMetaEvent("Contact", { source: "hero" });

    expect(fbq).toHaveBeenCalledWith("track", "Contact", {
      source: "hero"
    });
  });

  it("initializes PageView only once for the configured id", () => {
    expect(initMetaPixel("123456789")).toBe(true);
    const queueLength = window.fbq?.queue?.length;

    expect(queueLength).toBe(2);
    expect(initMetaPixel("123456789")).toBe(true);
    expect(window.fbq?.queue).toHaveLength(2);
    expect(
      document.querySelectorAll('script[data-mydrion-meta-pixel="true"]')
    ).toHaveLength(1);
  });
});
