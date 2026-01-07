import styled from "@emotion/styled";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ScrollableTabs from "../../Tabs/ScrollableTabs";
export default function GradientTabs({ title, subtitle, description, cards }) {
  return (
    <Section className="mt-8" id="our-services">
      <Container maxWidth="xl" className="container">
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}
        <div className="wrapper">
          <div className="apple-intelligence-glow"></div>
          <div className="apple-intelligence-glow apple-intelligence-glow-2"></div>
          <div className="title-row">
            <Typography
              variant="h2"
              component="h2"
              className="title"
              align="center"
              color="var(--light-on-surface)"
            >
              {title}
            </Typography>

            <div
              className="description center-align h4 mt-8"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div className="tabs mt-24">
            <ScrollableTabs tabsData={cards} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-low);
  padding: 40px 0;
 
  @media (max-width: 450px){ 
    background: var(--light-surface-container-low);


    }
.container { 

}
  .apple-intelligence-glow {
    position: absolute;
    z-index: 0;
    inset: 0;
    border: 0;
    filter: blur(1px);
    @media (min-width: 450px){ 
      filter: blur(1px);
    }
    &::after {
      @media (min-width: 450px){ 
        content: "";
      pointer-events: none;
      position: absolute;
      inset: 0;
      background: var(--igradient) 50% / var(--bg-size) var(--bg-size);
      width: 100%;
      height: 100%;
      border-radius: 28px;
      border: 3px solid rgba(0, 0, 0, 0);
      mask: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0)),
        linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 100%));
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
      
    }
  }
  .apple-intelligence-glow-2 {
    filter: blur(7px);
    @media (min-width: 450px){ 
      filter: blur(7px);
    }
  }
  .apple-intelligence-glow-2::after {
    @media (min-width: 450px){ 
      border: 8px solid rgba(0, 0, 0, 0);
    }
  }
  .wrapper {
    padding: 80px 40px;
    background: var(--light-surface-container-lowest);
    max-width: 1300px;
    border-radius: 24px;
    margin: 0 auto;
    position: relative;
    
    @media (max-width: 900px) {
      padding: 40px 16px;

    }
    @media (max-width: 450px){ 
      padding: 0;
      background: none;

    }
    .title-row {
      max-width: 1000px;
      margin: 0 auto;
      .title {
      }
      .subtitle {
      }
      .description {
        margin-top: 16px;
        color: var(--light-on-surface-variant);
      }
    }
    .tabs {
      max-width: 1000px;
      margin: 40px auto 0 auto;
    }
    .cards {
      margin-top: 80px;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
      @media (max-width: 900px) {
        display: flex;
        gap: 32px;
        flex-direction: column;
      }
    }
  }
`;
