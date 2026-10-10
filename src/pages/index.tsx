import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import Hero from "../components/home/Hero";
import Network from "../components/home/Network";
import Mission from "../components/home/Mission";
import Pillars from "../components/home/Pillars";
import Projects from "../components/home/Projects";
import Quote from "../components/home/Quote";
import Advocacy from "../components/home/Advocacy";
import Europe from "../components/home/Europe";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>CTR — Vocea tinerilor din România</title>
        <meta
          name="description"
          content="Consiliul Tineretului din România reprezintă tinerii acolo unde se iau deciziile și transformă nevoile acestora în politici publice, programe și oportunități."
        />
      </Head>
      <Hero />
      <Network />
      <Mission />
      <Pillars />
      <Projects />
      <Quote />
      <Advocacy />
      <Europe />
    </MainLayout>
  );
};

export default Home;
