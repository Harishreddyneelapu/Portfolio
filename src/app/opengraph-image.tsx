import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0a0a0a 100%)",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 30, opacity: 0.9, marginTop: 16 }}>
          Front-End Developer · React · Next.js · TypeScript
        </div>
        <div style={{ fontSize: 22, opacity: 0.8, marginTop: 22, maxWidth: 920 }}>
          {profile.summary}
        </div>
      </div>
    ),
    size
  );
}

