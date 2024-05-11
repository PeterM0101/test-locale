import {useTranslation} from "next-i18next";
import {GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const About = () => {
    const {t} = useTranslation('dashboard')
    return (<div><p>About page</p><p>{t("1st step")}</p></div>)
}

export const getStaticProps: GetStaticProps = async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
    const localeData = {
        locale: context.locale.split("-").shift(),
        defaultLocale: context.defaultLocale.split("-").shift(),
    };
    return {
        props: {
            ...(await serverSideTranslations(localeData.locale, [
                "common",
                "dashboard",
            ])),
        }
    };
}

export default About;