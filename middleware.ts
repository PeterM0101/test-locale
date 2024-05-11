import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.([a-zA-Z0-9]+$)/;

export function middleware(request: NextRequest) {
    // We need to clean up the pathName as for some reason the vercel hosted
    // middleware gets the locale in the path.
    // This is not the case when the code runs locally.
    const cleanPathName = request.nextUrl.pathname.startsWith('/default')
        ? request.nextUrl.pathname.replace('/default', '/').replace('//', '/')
        : request.nextUrl.pathname;

    const shouldHandleLocale =
        !PUBLIC_FILE.test(cleanPathName) &&
        !cleanPathName.includes('/api/') &&
        request.nextUrl.locale === 'default';

    return shouldHandleLocale
        ? NextResponse.redirect(new URL(`/en${cleanPathName}`, request.url))
        : undefined;
}