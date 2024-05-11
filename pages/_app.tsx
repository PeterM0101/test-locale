import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {appWithTranslation, UserConfig} from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";

function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(App, {
    ...(nextI18NextConfig as UserConfig),
    localePath: (locale, namespace) => `./public/locales/${locale.split("-").shift()?.toLowerCase()}/${namespace}.json`
})
