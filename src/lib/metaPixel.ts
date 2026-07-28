type MetaEventName = "PageView" | "Contact" | "Lead" | "ViewContent";
type MetaEventParameters = Record<string, string | number | boolean>;

type MetaPixelFunction = ((
  command: "init" | "track" | "trackCustom",
  eventOrPixelId: string,
  parameters?: MetaEventParameters
) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  queue?: unknown[][];
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    __mydrionMetaPixelId?: string;
  }
}

export const DEFAULT_META_PIXEL_ID = "1175331711422463";

function createPixelQueue(): MetaPixelFunction {
  const pixel = ((...args: Parameters<MetaPixelFunction>) => {
    if (pixel.callMethod) {
      pixel.callMethod(...args);
      return;
    }

    pixel.queue?.push(args);
  }) as MetaPixelFunction;

  pixel.loaded = true;
  pixel.version = "2.0";
  pixel.queue = [];
  return pixel;
}

export function initMetaPixel(
  pixelId = import.meta.env.VITE_META_PIXEL_ID || DEFAULT_META_PIXEL_ID
) {
  const cleanPixelId = pixelId.trim();

  if (!cleanPixelId || typeof window === "undefined") return false;
  if (window.__mydrionMetaPixelId === cleanPixelId) return true;

  let shouldLoadScript = false;
  if (!window.fbq) {
    const pixel = createPixelQueue();
    window.fbq = pixel;
    window._fbq = pixel;
    shouldLoadScript = true;
  }

  if (
    shouldLoadScript &&
    typeof document !== "undefined" &&
    !document.querySelector('script[data-mydrion-meta-pixel="true"]')
  ) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.mydrionMetaPixel = "true";
    document.head.appendChild(script);
  }

  window.fbq("init", cleanPixelId);
  window.fbq("track", "PageView");
  window.__mydrionMetaPixelId = cleanPixelId;
  return true;
}

export function trackMetaEvent(
  eventName: MetaEventName,
  parameters?: MetaEventParameters
) {
  window.fbq?.("track", eventName, parameters);
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: MetaEventParameters
) {
  window.fbq?.("trackCustom", eventName, parameters);
}
