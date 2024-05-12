import {useTranslation} from "next-i18next";
import {GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ReactElement} from "react";
import Layout from "../layouts/layout";

const About = () => {
    const {t} = useTranslation('dashboard')
    return (<div><p>About page</p><p>{t("30 days after starting date")}</p></div>)
}

export const getStaticProps: GetServerSideProps = async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
    const localeData = {
        locale: context.locale.split("-").shift(),
        defaultLocale: context.defaultLocale.split("-").shift(),
    };
    console.log('[MP] About.getServerSideProps localeData.locale: ',localeData.locale)
    return {
        props: {
            ...(await serverSideTranslations(localeData.locale, [
                "common",
                "dashboard",
            ])),
        }
    };
}

About.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default About;