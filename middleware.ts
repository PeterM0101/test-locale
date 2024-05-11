import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.([a-zA-Z0-9]+$)/;

export function middleware(req: NextRequest) {
    // // We need to clean up the pathName as for some reason the vercel hosted
    // // middleware gets the locale in the path.
    // // This is not the case when the code runs locally.
    // const cleanPathName = request.nextUrl.pathname.startsWith('/default')
    //     ? request.nextUrl.pathname.replace('/default', '/').replace('//', '/')
    //     : request.nextUrl.pathname;
    //
    // const shouldHandleLocale =
    //     !PUBLIC_FILE.test(cleanPathName) &&
    //     !cleanPathName.includes('/api/') &&
    //     request.nextUrl.locale === 'default';
    //
    // return shouldHandleLocale
    //     ? NextResponse.redirect(new URL(`/en${cleanPathName}`, request.url))
    //     : undefined;
    // Static
    if (
        req.nextUrl.pathname.startsWith("/_next") ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return;
    }

    // API
    if (
        req.nextUrl.pathname.includes("/api/")
        // ||
        // req.nextUrl.pathname.includes(process.env.NEXT_PUBLIC_JSONAPI_PATH)
    ) {
        return;
    }

    if (req.nextUrl.locale === "default") {
        console.log('Fuck')
        const locale = "en-CY";
        req.nextUrl.locale = locale;

        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        );
    }
}