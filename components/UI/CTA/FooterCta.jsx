import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

export default function FooterCta({ title, description, cta }) {
  return (
    <Section component="section">
      <Container maxWidth="lg">
        <div className="wrapper">
          <div className="content-wrapper">
            <Typography
              component="h2"
              variant="h1"
              sx={{ fontWeight: 700 }}
              align="center"
              color="white"
              className="title"
            >
              {title}
            </Typography>
            <Typography
              component="p"
              variant="h5"
              align="center"
              color="white"
              className="description mt-16"
            >
              {description}
            </Typography>
            <div className="button-wrapper">
              <Link href={cta.url}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    background: "white",
                    color: "var(--dark-on-primary)",
                    "&:hover": {
                      background: "#eaeaea",
                    },
                  }}
                >
                  {cta.title}
                </Button>
              </Link>

              {/* <Link href="/get-a-quote">
              <Button
                size="large"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  color: "white",
                  "&:hover": {
                    border: "1px solid #eaeaea",
                  },
                }}
              >
                {cta.label}
              </Button>
            </Link> */}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
const Section = styled(Box)`
background: var(--light-surface-container-lowest); 
  padding: 56px 0;
  @media (max-width: 900px) {
    padding: 24px 0;
  }
  .wrapper {
    padding: 120px 0;
    background: linear-gradient(97deg, #097eb0 2.05%, #002e72 98.81%);
    border-radius: 32px;
    @media (max-width: 900px) {
      padding: 56px 16px;
    }
    .content-wrapper {
      max-width: 900px;
      margin: 0 auto;
    }
    .title {
      font-weight: 600;
    }
    .button-wrapper {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
      flex-wrap: wrap;
    }
  }
`;
