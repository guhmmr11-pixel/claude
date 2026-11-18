import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Estável desde o Next.js 15.5. Usado pelas rotas legadas (tipo `Route`).
  typedRoutes: true,
  poweredByHeader: false
};

export default nextConfig;
