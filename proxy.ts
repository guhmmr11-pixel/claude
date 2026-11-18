import { NextResponse, type NextRequest } from "next/server";

/**
 * Escopo de rotas da implantação.
 *
 * O repositório ainda contém o app legado de Business English (páginas
 * /learn, /chat, /news-lab, /speaking, /dictionary, /review e as APIs
 * /api/news, /api/speaking, /api/teacher). O código continua no projeto,
 * mas a implantação institucional da Sinal Digital responde 404 para essas
 * rotas.
 *
 * Para reativar o legado num ambiente separado, defina
 * ENABLE_LEGACY_APP=true nas variáveis desse ambiente. Antes disso, revise
 * controle de acesso e limites da rota /api/teacher, que chama um modelo de IA
 * quando OPENAI_API_KEY está configurada.
 */
export function proxy(request: NextRequest) {
  if (process.env.ENABLE_LEGACY_APP === "true") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Reescreve para um caminho inexistente: o Next.js renderiza app/not-found.tsx com status 404.
  return NextResponse.rewrite(new URL("/rota-indisponivel", request.url));
}

export const config = {
  matcher: [
    "/learn/:path*",
    "/chat/:path*",
    "/news-lab/:path*",
    "/speaking/:path*",
    "/dictionary/:path*",
    "/review/:path*",
    "/api/news/:path*",
    "/api/speaking/:path*",
    "/api/teacher/:path*"
  ]
};
