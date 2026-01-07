"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import NewsletterForm from "../Forms/NewsletterForm";
import {  informationLinks } from "./FooterLinks";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import { contactInfo } from "./FooterContact";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,

  socialData,
}) {
 

  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          cta={footerCtaData.cta_link}
        />
      )}


<FooterSection>
<ContainerStyled maxWidth="xl" className="row" id="footer">
  {/* logo wrapper */}
  <div className="footer-wrapper">
    {/* <div className="certification-wrapper">
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        Certifications
      </Typography>
      <div className="certification-logos flex flex-wrap gap-8 align-center">
        {certifications.cards &&
          certifications.cards.map((item, index) => {
            return (
              <Image
                key={index}
                src={item.certification_image.url}
                alt={item.alt ? item.alt : "certification"}
                width={item.certification_image.width}
                height={item.certification_image.height}
              />
            );
          })}
      </div>
      <div className="newsletter-wrapper mt-40">
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ marginBottom: "8px" }}
        >
          Get tips & tricks every month
        </Typography>
        <NewsletterForm
          className="newsletter-form"
          formName="Newsletter Form"
          formType="newsletter-form"
          emailRoute={"/api/newsletter-hubspot"}
          emailTo="designer@treescene.co.nz"
          btnLabel="Subscribe"
        />
      </div>
    </div> */}
    {/* {services && services.length > 0 && 
    <div className="footer-useful-links links-container">
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        Services
      </Typography>
      <ul component="ul" sx={{ margin: 0, padding: 0 }}>
        {services.map((link, index) => {
          return (
            <li key={index}>
              <Link href={link.url} className="body2">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  } */}
    <div className="footer-useful-links links-container">
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        Information
      </Typography>
      <ul component="ul" sx={{ margin: 0, padding: 0 }}>
        {informationLinks.map((link, index) => {
          return (
            <li key={index}>
              <Link href={link.url} className="body2">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="contact-wrapper">
      <div className="contact-section">
        <ContactInfo contactInfo={contactInfo} />
      </div>
{/* 
      <div className="social-wrapper">
        <Typography variant="h6" component="div">
          Follow Us
        </Typography>
        <div className="social-links mt-8">
          {socialData?.length > 0 &&
            socialData.map((social, index) => {
              return (
                <Link
                  key={index}
                  aria-label={social.social_media_name}
                  href={social.link}
                  target="_blank"
                >
                  <Image
                    src={social.social_media_icon.url}
                    alt={social.social_media_name}
                    width="32"
                    height="32"
                  />
                </Link>
              );
            })}
        </div>
      </div> */}
    </div>
  </div>
</ContainerStyled>
</FooterSection>

      {/* copyright container */}
      <Copyright />
    </>
  );
}
const FooterSection = styled.section`
  padding: 40px 0;
  background: var(--light-surface-container-low);
  @media (max-width: 900px) {
    padding: 32px 0;
  }
`;
const ContainerStyled = styled(Container)`
  .footer-wrapper {
    display: grid;
    gap: 40px;
    justify-content: center;
    grid-template-columns: 250px 250px;
    @media (max-width: 1366px) {
      gap: 24px;
    }

  

    @media (max-width: 500px) {
      gap: 24px;
      grid-template-columns: 1fr;
    }
    .links-container {
      ul {
        list-style: none !important;
        a {
          display: block;
          margin: 0;
          padding: 6px 0;
          &:hover {
            color: var(--light-primary);
          }
        }
      }
    }
  }

  .contact-wrapper {
    /* @media (max-width: 900px) {
      grid-column: span 2;
    } */

    .social-wrapper {
      margin-top: 24px;
      .social-links {
        a {
          margin: 0 8px 0 0;
          &:hover {
            svg {
              path {
                fill: var(--dark-secondary);
              }
            }
          }
        }
      }
    }
  }
`;
