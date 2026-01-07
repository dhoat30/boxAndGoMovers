'use client';

import { useRef } from "react";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
// import Slider from "react-slick";
// import CarouselArrows from "../CarouselArrows/CarouselArrows";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";

var settings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  centerMode: true,
  centerPadding: "40px",
  draggable: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function GoogleReviewsCarousel({data}) {
  if (!data || data.length === 0) return null;
    console.log("google reviews", data)

  // slider arrow functionality
  const sliderRef = useRef(null);


  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  // filter review comment 
  const filteredReviewData = data.filter((item) => {
    return item.rating === 5 && typeof item.snippet === "string" && (item.review_id === "Ci9DQUlRQUNvZENodHljRjlvT2xKVmMyVkpWRWt4UjJGM1MwUjFORUpNV0ZGSWIzYxAB" || item.review_id === "Ci9DQUlRQUNvZENodHljRjlvT2kxU05rOUxjM3BMTVVsVVptd3ljMTlyWVhCeFkyYxAB" || item.review_id==="Ci9DQUlRQUNvZENodHljRjlvT2twRlpqVkRTaTFEU2pkWVNFWlZObEl5U1dSMFNsRRAB" );
  });


  const testimonialCardsJSX = filteredReviewData.map(
    (item, index) => {
      if (index > 10) return null;
      return (
        <GoogleReviewCard
          key={index}
          name={item.user.name}
          description={item.snippet}
          customerPic={item.user.thumbnail}
          characterLimit={80}
        />
      );
    }
  );

  return (
    <Section id="reviews">
      <Container maxWidth="xl">
      <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
          Google Reviews
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description mt-16"
            align="center"
          >
Explore authentic customer feedback and see why people trust us. Each review reflects the quality and dedication we bring to every service we provide.        </Typography>


        </div>
        <div className="carousel-wrapper mt-32 gap-16">
       
          {testimonialCardsJSX}
       
      </div>
      </Container>
     
      <Container maxWidth="xl" className="cta-wrapper mt-40">
        <Link href={"https://g.page/r/Ce_ha-DH5uM6EAE/review"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
           Leave a Review 
          </Button>
        </Link>
 
      </Container>
    </Section>
  );
}

const Section = styled.section`
background:var(--light-surface-container-low);
  border-top: 1px solid var(--light-outline-variant);
  border-bottom: 1px solid var(--light-outline-variant);
  padding: 80px 0;
  @media (max-width: 600px) {
    padding: 40px 0;
  }
  .title-row{ 
    max-width: 900px; 
    margin: 0 auto; 
  }
  .arrows-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .carousel-wrapper {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 900px ){ 
      grid-template-columns: 1fr 1fr;
      
    }
      @media (max-width: 600px ){ 
      grid-template-columns: 1fr ;
      
    }
  }
  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap; 
  }
`;
