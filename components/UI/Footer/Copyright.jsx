import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

export default function Copyright() {
  return (
    <PaperStyle>
      <Container maxWidth="xl" className="content-wrapper">
        <div className="copyright-wrapper">
          
          <a href="https://webduel.co.nz" rel="nofollow" target="_blank">
            <Typography variant="body1" component="span" className="center-align">
              Designed & Developed by web<strong>duel</strong>
            </Typography>
          </a>
        </div>
    
      </Container>
    </PaperStyle>
  );
}
const PaperStyle = styled.div`
  padding: 8px 0;
  background: var(--light-primary-container);
  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
    @media (max-width: 750px) {
      gap: 8px;
    }
    span {
      display: block;
      width: 100%;
      color: var(--dark-on-surface);
      font-weight: 300;
      text-align: center;
    }
    .copyright-wrapper {
      display: flex;
      flex-wrap: wrap;
      a {
        &:hover {
          text-decoration: underline;
          color: white;
        }
       
      }
    }
    .policy-links {
      display: flex;
      flex-wrap: wrap;
      a {
        &::after {
          content: "|";
          margin: 0 8px;
          color: var(--dark-on-surface);
        }
        /* not the last element  */
        &:last-child {
          &::after {
            content: "";
          }
        }
      }
    }
  }
`;
