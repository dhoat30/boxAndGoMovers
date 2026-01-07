"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography";
import { lightTheme } from "@/utils/themeSettings";
import HeroImage from "@/components/UI/Hero/OptimizedHero/HeroImage";
import Video from "@/components/UI/Video/Video";
import USP from "@/components/UI/USP/USP";
import GetQuoteForm from "@/components/UI/Forms/GetQuoteForm";
import HeroUSP from "@/components/UI/USP/HeroUSP";
import Image from "next/image";
import BeforeAfter from "@/components/UI/BeforeAfterSlider/BeforeAfter";
// const WebsitePriceCalculatorForm = dynamic(() =>
//   import("@/components/UI/Forms/WebsitePriceCalculatorForm")
// );

export default function GetQuotePage({ data, websitePackageOffer, heroUSP }) {
  let graphicComponent = null;
  // if (data.acf.hero_section.show_video) {
  //   if (data.acf.hero_section?.video_options === "enter_youtube_id") {
  //     if (data.acf.hero_section.youtube_id) {
  //       graphicComponent = (
  //         <Video
  //           videoID={data.acf.hero_section.youtube_id}
  //           placeholderImage={data.acf.hero_section.image}
  //           showCompressedImage={true}
  //         />
  //       );
  //     }
  //   }
  // } else {
  //   graphicComponent = <HeroImage image={data.acf.hero_section.image} />;
  // }
  
  return (
    <ThemeProvider theme={lightTheme}>
      <Section>
        <Container maxWidth="lg" className="container">
          <div className="content-container">
            <Typography variant="h4" component="h1" className="subtitle">
              {data.acf.hero_section.subtitle}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-8"
            >
              {data.acf.hero_section.description}
            </Typography>
            <HeroUSP data={heroUSP} /> 

            <div className="graphic-wrapper mt-24"> 
          <BeforeAfter data={{afterImage: data.acf.hero_section.afterImage, beforeImage: data.acf.hero_section.beforeImage}}/> 

            </div>
       
          </div>
          <div className="form-container">
            <GetQuoteForm
              className="row-max form-component"
              title={data.acf.hero_section.title}
            />
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}
const Section = styled.section`
  background: var(--light-surface-container-low);
  padding: 120px 0 40px 0;
  @media (max-width: 600px) {
    padding: 80px 0 24px 0;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--light-surface-container-low);
    gap: 16px;
    align-items: start;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
    @media (max-width: 600px) {
      padding: 0;
    }
    .subtitle { 
      font-weight: 600;
    }
    .form-container {
      border: 1px solid var(--light-outline-variant);
      background: var(--light-surface-container-lowest);
      //remove the top border radius
      border-radius: 12px;
      @media (min-width: 1000px) {
        position: sticky;
        top: 80px;
      }
    }
 
    .content-container {
    

      padding: 24px;
      background: var(--light-surface-container-lowest);
      border-radius: 12px;
      border: 1px solid var(--light-outline-variant);
      @media (max-width: 600px) {
        padding: 24px 16px;
      }
      .title {
        margin: 8px 0;
      }
      .image-wrapper {
        position: relative;
        width: 100%;
      }
      .MuiContainer-root {
        padding: 0 !important;
        margin-top: 16px;
      }
    }
  }
`;
