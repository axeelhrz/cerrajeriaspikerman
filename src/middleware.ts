import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const legacySectionRedirects: Record<string, string> = {
  "/servicios": "#servicios",
  "/cerraduras": "#cerraduras",
  "/control-de-accesos": "#control-de-accesos",
  "/controldeaccesos": "#control-de-accesos",
  "/puertas-blindex": "#puertas-blindex",
  "/puertasblindex": "#puertas-blindex",
  "/cotizar": "#cotizar",
  "/contacto": "#contacto",
};

function stripLocale(pathname: string) {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathWithoutLocale = stripLocale(pathname);

  for (const [from, anchor] of Object.entries(legacySectionRedirects)) {
    if (pathWithoutLocale === from || pathWithoutLocale.startsWith(`${from}/`)) {
      const localePrefix = pathname.replace(pathWithoutLocale, "").replace(/\/$/, "") || "";
      const url = request.nextUrl.clone();
      url.pathname = localePrefix || "/";
      url.hash = anchor.replace("#", "");
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
