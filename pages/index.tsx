import { Inter } from "next/font/google";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext} from "next";
import {ReactElement} from "react";
import Layout from "../layouts/layout";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const {t} = useTranslation("common")
  return (
    <main
      className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
    >
    <p>{t("Access to the Seek4U CV Bank")}</p>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
  const localeData = {
    locale: context.locale.split("-").shift(),
    defaultLocale: context.defaultLocale.split("-").shift(),
  };
  return {
    props: {
      ...(await serverSideTranslations(localeData.locale, [
        'common',
        'dashboard',
      ])),
      // Will be passed to the page component as props
    },
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
