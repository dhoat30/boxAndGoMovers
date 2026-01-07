import React from "react";
import styled from "@emotion/styled";
import LongArrowIcon from "../Icons/LongArrowIcon";
export default function CarouselArrows({ next, previous, className }) {
  return (
    <Container className={`${className} flex justify-end  pb-8`}>
      <div className="wrapper flex gap-2 flex-initial ">
        <div className="arrow-wrapper " onClick={previous}>
          <LongArrowIcon />
        </div>
        <div className="arrow-wrapper " onClick={next}>
          <LongArrowIcon className="right-arrow" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex; 
  justify-content: flex-end;
  .wrapper{ 
    display: flex; 
    gap: 8px; 
  }
  .arrow-wrapper {
    cursor: pointer;
   svg{ 
    path{ 
      fill: var(--light-primary) !important;

    }
   }
    &:hover {
      svg {
        path {
          fill: var(--light-surface-tint) !important;
        }
      }
    }
  }
  .right-arrow {
    transform: rotate(180deg);
  }
`;
