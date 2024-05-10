import { Inter } from "next/font/google";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetStaticProps} from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {t} = useTranslation("common")
  const {locale} = useRouter()
  console.log('locale: ', locale)
  const router = useRouter()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button onClick={()=>{    void router.push(router.asPath, router.asPath, {
        locale: router.locale === 'el' ? 'en' : 'el',
      });}}>{locale}</button>
      {t("Hello World!")}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}
