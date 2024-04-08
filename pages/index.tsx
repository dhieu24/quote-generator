import React, {useEffect, useState} from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

// components
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorTitle, QuoteGeneratorSubtitle, GenerateQuoteButton, GenerateQuoteButtonText } from "@/components/QuoteGenerator/QuoteGeneratorElements";

// assets
import LeftCloud from '../assets/cloud-and-thunder.png';
import RightCloud from '../assets/cloudy-weather.png';
import { GraphQLResult, generateClient } from 'aws-amplify/api';
import { quotesQueryName } from "@/src/graphql/queries";

const client = generateClient();

// interface for dynamodb object
interface UpdateQuoteInfoData{
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}


// type guard for fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData];
  }
}>{
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}


export default function Home() {
  const [numQuotes, setNumQuotes] = useState<Number | null>(0);
  // function to fetch dynamodb object (quotes generated)
  const updateQuoteInfo = async () => {
    try{
      const response = await client.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: 'iam',
        variables: {
          queryName: "LIVE"
        }
      })

      if(!isGraphQLResultForquotesQueryName(response)){
        throw new Error('Unexpected response from client.graphql')
      }

      if(!response.data){
        throw new Error('Response data is undefined')
      }

      const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated
      setNumQuotes(receivedNumberOfQuotes)
      
    }catch(error){
      console.log('error getting quote data ' + error)
    }
  }

  useEffect(() => {
    updateQuoteInfo()
  }, [])

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
              <GenerateQuoteButtonText 
              // onClick={null}
              >
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
