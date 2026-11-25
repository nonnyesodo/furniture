/**
 * Lightweight vendor-agnostic Analytics Tracking Stub
 * Satisfies PRD Section 9: "Include a stub for tracking CTA clicks and form submissions (no vendor lock-in)."
 */

export type AnalyticsEvent =
  | { name: "cta_click"; properties: { label: string; location: string; targetHref?: string } }
  | { name: "showroom_form_submit"; properties: { interest?: string; hasPhone: boolean } }
  | { name: "gallery_lightbox_open"; properties: { imageId: string; imageTitle?: string } }
  | { name: "product_card_hover"; properties: { productId: string } }
  | { name: "newsletter_subscribe"; properties: { location: string } };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Dispatch custom DOM event for custom analytics listeners (GTM, Segment, Plausible, etc.)
  try {
    const customEvent = new CustomEvent("maison_analytics", {
      detail: event,
    });
    window.dispatchEvent(customEvent);

    // Development logging for inspection
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics Track] ${event.name}`, event.properties);
    }
  } catch (err) {
    // Fail silently in production
  }
}
