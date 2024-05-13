import {ReactElement} from "react";
import Layout from "../layouts/layout";
import {GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Products = () => {
    // const {t} = useTranslation('dashboard')
    return (<div><p>Products page</p></div>)
}

export const getStaticProps: GetServerSideProps = async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
    const localeData = {
        locale: context.locale.split("-").shift(),
        defaultLocale: context.defaultLocale.split("-").shift(),
    };
    console.log('[MP] Products.getServerSideProps localeData.locale: ',localeData.locale)
    return {
        props: {
            ...(await serverSideTranslations(localeData.locale, [
                "common",
                "dashboard",
            ])),
        }
    };
}

Products.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Products;