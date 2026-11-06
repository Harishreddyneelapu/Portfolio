export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const CONSENT_KEY = "analytics-consent";

type DataLayerWindow = Window & { dataLayer?: unknown[] };

function push(...args: unknown[]) {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(args);
}

/** Push a custom event for GTM triggers/tags to pick up. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (!GTM_ID || typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export function updateConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  // Consent Mode API: gtag-style push of an arguments-like array.
  push("consent", "update", {
    analytics_storage: v,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
