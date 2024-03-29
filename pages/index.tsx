import React, {useState} from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";



// components
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorTitle, QuoteGeneratorSubtitle, GenerateQuoteButton, GenerateQuoteButtonText } from "@/components/QuoteGenerator/QuoteGeneratorElements";

// assets
import LeftCloud from '../assets/cloud-and-thunder.png';
import RightCloud from '../assets/cloudy-weather.png';


export default function Home() {
  const [numQuotes, setNumQuotes] = useState<Number | null>(0);
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

        {/* Background images */}
        <BackgroundImage2
          src={RightCloud}
          height="300"
          alt="cloud-background1"
        />
      </GradientBackgroundCon>

      {/* Quote Generator Modal */}

      {/* Quote Generator */ }
      <QuoteGeneratorCon>
        <QuoteGeneratorInnerCon>
          <QuoteGeneratorTitle>
            Daily Inspiration Generator
          </QuoteGeneratorTitle>
          <QuoteGeneratorSubtitle>
            Looking for a splash of inspiration?
            Generate a quote card with a random
            inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank">ZenQuotes Api</FooterLink>
            <GenerateQuoteButton>
              <GenerateQuoteButtonText onClick={null}>
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>
          </QuoteGeneratorSubtitle>
        </QuoteGeneratorInnerCon>
      </QuoteGeneratorCon>


      

      {/* Footer */}
      <FooterCon>
        <>
          Quotes generated: {numQuotes}
          <br/>
          Developed by <FooterLink href="https://github.com/dhieu24/quote-generator">@Hieu Dang</FooterLink>
        </>
      </FooterCon>
      
    </>
  );
}
