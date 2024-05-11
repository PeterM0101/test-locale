// import { NextRequest, NextResponse } from 'next/server';
//
// const PUBLIC_FILE = /\.([a-zA-Z0-9]+$)/;
//
// export function middleware(req: NextRequest) {
//     // // We need to clean up the pathName as for some reason the vercel hosted
//     // // middleware gets the locale in the path.
//     // // This is not the case when the code runs locally.
//     // const cleanPathName = request.nextUrl.pathname.startsWith('/default')
//     //     ? request.nextUrl.pathname.replace('/default', '/').replace('//', '/')
//     //     : request.nextUrl.pathname;
//     //
//     // const shouldHandleLocale =
//     //     !PUBLIC_FILE.test(cleanPathName) &&
//     //     !cleanPathName.includes('/api/') &&
//     //     request.nextUrl.locale === 'default';
//     //
//     // return shouldHandleLocale
//     //     ? NextResponse.redirect(new URL(`/en${cleanPathName}`, request.url))
//     //     : undefined;
//     // Static
//     if (
//         req.nextUrl.pathname.startsWith("/_next") ||
//         PUBLIC_FILE.test(req.nextUrl.pathname)
//     ) {
//         return;
//     }
//
//     // API
//     if (
//         req.nextUrl.pathname.includes("/api/")
//         // ||
//         // req.nextUrl.pathname.includes(process.env.NEXT_PUBLIC_JSONAPI_PATH)
//     ) {
//         return;
//     }
//
//     if (req.nextUrl.locale === "default") {
//         const locale = "en-CY";
//         req.nextUrl.locale = locale;
//
//         return NextResponse.redirect(
//             new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
//         );
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./next-i18next.config";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const originalPathName = req.nextUrl.pathname;
  console.debug(
    `[SC] middleware locale=${req.nextUrl.locale} default_locale=${i18n.defaultLocale} url=${req.url}`
  );

  // [SC] middleware locale=en-CY url=http://localhost:3000/en-CY/jobs

  let locale = req.nextUrl.locale;
  let needsRedirect = false;
  if (req.nextUrl.locale === i18n.defaultLocale) {
    locale = req.cookies.get("NEXT_LOCALE")?.value || i18n.defaultRealLocale;
    // console.debug(`[SC] middleware new_locale=${locale} url=${req.url}`);
    req.nextUrl.locale = locale;
    req.cookies.set("NEXT_LOCALE", locale);
    needsRedirect = true;
  }

  // Static
  if (
    originalPathName.startsWith("/_next") ||
    PUBLIC_FILE.test(originalPathName)
  ) {
    return;
  }

  // API
  if (
    originalPathName.includes("/api/") ||
    originalPathName.includes(process.env.NEXT_PUBLIC_JSONAPI_PATH)
  ) {
    return;
  }

  // if (originalPathName === "/") {
  //   return;
  // }

  if (!needsRedirect) {
    return;
  }

  return NextResponse.redirect(
    new URL(`/${locale}${originalPathName}${req.nextUrl.search}`, req.url)
  );
}