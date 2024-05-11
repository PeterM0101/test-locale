import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {appWithTranslation, UserConfig} from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App, {
  ...(nextI18NextConfig as UserConfig),

  localePath: (locale= 'en', namespace, missing) => {

    const path = `./public/locales/${locale}/${namespace}.json`;
    console.debug(
        `[SC] app.appWithTranslation locale=${locale}${" ".repeat(
            10 - locale.length
        )} path=${path}`, namespace
    );

    return path;
  },
})
