import Head from "next/head";
import Link from "next/link";
import { Weather } from "../components/Weather";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Weather />
    </>
  );
};

export default Home;
