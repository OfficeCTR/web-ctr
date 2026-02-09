import { type AppType } from "next/app";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${spaceGrotesk.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
