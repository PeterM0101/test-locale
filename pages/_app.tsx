import "../styles/globals.css";
import type {AppProps} from "next/app";
import {appWithTranslation, UserConfig} from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return <>
        {getLayout(
            <Component {...pageProps} />
        )}
    </>;
}

export default appWithTranslation(App, {
    ...(nextI18NextConfig as UserConfig),
    localePath: (locale, namespace) => {
        // let basePath = '/locales'
        // if (typeof window === 'undefined') {
        //     require('path').resolve('./public/locales');
        //     basePath = './public/locales'
        // }
        // console.log("basePath: ", basePath)
        // const _path =
        // console.log("_path: ", _path)
        return `./public/locales/${locale.split("-").shift()?.toLowerCase()}/${namespace}.json`
    }
})
