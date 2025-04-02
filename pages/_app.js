import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/styles/_fw.css";
import "@/public/styles/main.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_APP_GA_TRACKING_ID;

  useEffect(() => {
    if (GA_TRACKING_ID !== "") {
      const handleRouteChange = (url) => {
        window.gtag("config", GA_TRACKING_ID, {
          page_path: url,
        });
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events, GA_TRACKING_ID]);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESC} />
        <meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
        <meta name="google-adsense-account" content="ca-pub-6836460257655749" />
      </Head>
      {GA_TRACKING_ID !== "" && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
