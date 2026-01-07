'use client';

import { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";


export default function GoogleReviewGridLayout({data}) {

 // filter review comment 
 const filteredReviewData = data.filter((item) => {
  return item.rating === 5 && typeof item.snippet === "string";
});


  
  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
    
      return (
        <GoogleReviewCard
        key={index}
        name={item.user.name}
        description={item.snippet}
        customerPic={item.user.thumbnail}
          
        />
      );
    }
  );


  return (
    <Section>
      <Container maxWidth="xl">
        <div className="grid-wrapper mt-16">{testimonialCardsJSX}</div>
       
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--light-surface-container-lowest);

  padding: 4px  0 16px 0;
 
.grid-wrapper{ 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px; 
  justify-content: center; 
  @media(max-width: 400px){ 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  }
  /* override the googleReviewcard div's max width */
  >div{ 
    max-width: 100%; 
  }
}
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap; 
  }
`;
