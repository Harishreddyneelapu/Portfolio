export function getSiteUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  try {
    return new URL(explicit || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

