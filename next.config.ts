import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the site as plain static files (the `out` folder) so Cloudflare can
  // serve it directly. Server features like the Stripe webhook will live in
  // Supabase Edge Functions instead.
  output: "export",
};

export default nextConfig;
