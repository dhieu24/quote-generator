import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

// components
import { BackgroundImage1, BackgroundImage2, GradientBackgroundCon } from "@/components/QuoteGenerator/QuoteGeneratorElements";

// assets
import LeftCloud from '../assets/cloud-and-thunder.png';
import RightCloud from '../assets/cloudy-weather.png';


export default function Home() {
  return (
    <>
      <Head>
        <title>Inspirational Code Generator</title>
        <meta name="description" content="Generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Background */}
      <GradientBackgroundCon>
        <BackgroundImage1
          src={LeftCloud}
          height="300"
          alt="cloud-background1"
        />

        <BackgroundImage2
          src={RightCloud}
          height="300"
          alt="cloud-background1"
        />
      </GradientBackgroundCon>
      
    </>
  );
}
