import { type AppType } from "next/app";
import Head from "next/head";
import { Barlow, Barlow_Condensed, Pacifico, Poppins } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
});

const pacifico = Pacifico({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-pacifico",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`${barlow.variable} ${barlowCondensed.variable} ${pacifico.variable} ${poppins.variable} font-sans`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
