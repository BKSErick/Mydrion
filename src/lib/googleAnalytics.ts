type GtagParameters = Record<string, string | number | boolean>;

type GtagFunction = (
  command: "js" | "config" | "event",
  target: string | Date,
  parameters?: GtagParameters
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __mydrionGaId?: string;
  }
}

// Stream proprio do dominio mydrion.vercel.app. As demais paginas publicas
// (link-in-bio, LPs, diagnosticos) usam outro stream: G-JHG7W15L2H.
export const DEFAULT_GA_MEASUREMENT_ID = "G-01ME6SK6JD";

export function initGoogleAnalytics(
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID ||
    DEFAULT_GA_MEASUREMENT_ID
) {
  const cleanMeasurementId = measurementId.trim();

  if (!cleanMeasurementId || typeof window === "undefined") return false;
  if (window.__mydrionGaId === cleanMeasurementId) return true;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    // Forma canonica do snippet do Google: o gtag.js le o objeto `arguments`
    // empilhado no dataLayer, entao nao da para trocar por rest params/array.
    const gtagShim = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag = gtagShim as unknown as GtagFunction;
  }

  if (
    typeof document !== "undefined" &&
    !document.querySelector('script[data-mydrion-ga="true"]')
  ) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanMeasurementId}`;
    script.dataset.mydrionGa = "true";
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", cleanMeasurementId);
  window.__mydrionGaId = cleanMeasurementId;
  return true;
}

export function trackGaEvent(eventName: string, parameters?: GtagParameters) {
  window.gtag?.("event", eventName, parameters);
}
