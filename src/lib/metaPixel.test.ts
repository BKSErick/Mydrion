import { initMetaPixel, trackMetaEvent } from "./metaPixel";

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
