"use client";

import * as React from "react";
import Script from "next/script";
import { CONSENT_KEY, GTM_ID, track, updateConsent } from "@/lib/analytics";

// Consent Mode v2: everything denied until the visitor accepts. A stored
// "granted" choice is applied before GTM loads.
const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

function useEventTracking() {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) track("contact_click", { method: "email" });
      else if (href.startsWith("tel:")) track("contact_click", { method: "phone" });
      else if (href.startsWith("#")) track("nav_click", { target: href.slice(1) });
      else if (/^https?:/.test(href)) {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          track("outbound_click", {
            destination: url.hostname,
            link_url: href,
            link_text: (a.textContent ?? "").trim().slice(0, 80),
          });
        }
      }
    };
    document.addEventListener("click", onClick);

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !seen.has(en.target.id)) {
            seen.add(en.target.id);
            track("section_view", { section: en.target.id });
          }
        }
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

    return () => {
      document.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, []);
}

function ConsentBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {}
    updateConsent(granted);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-4 bottom-4 z-60 mx-auto max-w-xl rounded-2xl border border-black/10 bg-white p-4 text-sm shadow-xl dark:border-white/15 dark:bg-zinc-950 sm:bottom-6"
    >
      <p className="text-zinc-700 dark:text-zinc-300">
        I use privacy-friendly analytics to see which parts of this site are
        useful. No analytics cookies are set unless you agree.{" "}
        <a className="underline underline-offset-4 hover:text-accent" href="/privacy">
          Privacy
        </a>
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-full border border-black/15 px-4 py-2 font-semibold transition hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export function Analytics() {
  useEventTracking();
  if (!GTM_ID) return null;
  return (
    <>
      <Script id="gtm-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <ConsentBanner />
    </>
  );
}

export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
