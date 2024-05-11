import { Inter } from "next/font/google";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext} from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {t} = useTranslation("dashboard")
  const {locale} = useRouter()
  console.log('locale: ', locale)
  const router = useRouter()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button className={'border-2 rounded px-3 py-2 bg-red-300'} onClick={()=>{    void router.push(router.asPath, router.asPath, {
        locale: router.locale.includes('el') ? 'en-CY' : 'el-CY',
      });}}>{locale}</button>
      {t("1st step")}
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
