import React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
export default function CenterAlignHeadings({ title, subtitle }) {
  return (
    <>
      <Div className="title-wrapper">
        <Typography
          variant="h6"
          component="h3"
          className="subtitle"
          align="center"
          color="primary"
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          className="title"
          align="center"
        >
          {title}
        </Typography>
      </Div>
    </>
  );
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .subtitle {
    margin-bottom: 16px;
    position: relative;
    display: inline-block;
    font-weight: 350 !important;
    width: fit-content;
    &::after {
      content: "";
      position: absolute;
      width: 64px;
      height: 1px;
      background: var(--light-primary);
      left: -74px;
      top: 50%;
      @media (max-width: 700px) {
        left: -70px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 64px;
      height: 1px;
      background: var(--light-primary);
      right: -74px;
      top: 50%;
      @media (max-width: 700px) {
        right: -70px;
      }
    }
  }
`;
