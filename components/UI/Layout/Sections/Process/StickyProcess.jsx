import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from "@mui/material/styles";

// Custom hook to handle scroll and opacity
const useScrollAndOpacity = (ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"], // Adjust this if needed for better results
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.7]);

  // Logging scroll progress for debugging
  return { opacity };
};

export default function StickyProcess({ title, description, cards }) {
  const [linkActive, setLinkActive] = useState({ activeIndex: 0 });

  // Create a ref array for the content sections
  const contentRefs = useRef([]);
  contentRefs.current = cards.map(
    (_, i) => contentRefs.current[i] ?? React.createRef()
  );

  if (!cards) return null;

  // We now return a custom component that contains hooks for each card
  const items = cards.map((item, index) => (
    <ScrollAndOpacityWrapper
      key={index}
      index={index}
      item={item}
      setLinkActive={setLinkActive}
      activeIndex={linkActive.activeIndex}
      ref={contentRefs.current[index]}
    />
  ));

  const content = cards.map((item, index) => (
    <motion.div
      className="step-wrapper content"
      ref={contentRefs.current[index]}
      key={index + 10}
      id={item.title.replace(/\s/g, "-").toLowerCase()}
    >
      <div>
        <Typography variant="h5" component="h2" className="title">
          {item.title}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="description"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></Typography>
      </div>
    </motion.div>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Section as={motion.section}>
        <Container maxWidth="lg" className="container">
          <div className="title-wrapper">
            <Typography variant="h3" component="h2" className="title">
              {title}
            </Typography>
            <div
              className="description body1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="steps-wrapper mt-24">
            <div className="links-wrapper">{items}</div>
            <div className="content-wrapper">{content}</div>
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

const ScrollAndOpacityWrapper = React.forwardRef(
  ({ item, index, setLinkActive, activeIndex }, ref) => {
    const { opacity } = useScrollAndOpacity(ref); // Using the custom hook

    return (
      <Link
        className="step-wrapper link-wrapper"
        href={`#${item.title.replace(/\s/g, "-").toLowerCase()}`}
        onClick={() => setLinkActive({ activeIndex: index })}
      >
        <motion.div
          className="title"
          style={{
            opacity: opacity,
            zIndex: index + 1,
          }}
        >
          <div className="step-title-number-wrapper">
            <div className="step-number">{index + 1}</div>
            <Typography
              variant="subtitle1"
              component="h3"
              color="var(--dark-on-secondary-container)"
            >
              {item.title}
            </Typography>
          </div>
          <div className="border"></div>
        </motion.div>
      </Link>
    );
  }
);

// Add display name for debugging
ScrollAndOpacityWrapper.displayName = "ScrollAndOpacityWrapper";

const Section = styled.section`
  background: var(--light-secondary-container);
  padding: 40px 0;
  margin-top: 8px;
  .title-wrapper {
    display: grid;
    grid-template-columns: auto 600px;
    gap: 40px;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
    .description {
      font-size: 1.4rem !important;
      color: var(--dark-on-surface-variant);

      p {
        font-size: 1.4rem !important;
        color: var(--dark-on-surface-variant);
      }
      strong {
        font-size: 1.4rem !important;

        color: var(--dark-on-surface-variant);
      }
      @media (max-width: 900px) {
        font-size: 1.2rem !important;
        p {
          font-size: 1.2rem !important;
        }
      }
    }
  }

  .steps-wrapper {
    display: grid;
    gap: 40px;
    grid-template-columns: auto 600px;
    align-items: start;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 56px 0;
    }
    .links-wrapper {
      position: sticky;
      top: 100px;
      .active {
        opacity: 1;
      }
      .link-wrapper {
        display: block;
        margin: 24px 0;
        @media (max-width: 1000px) {
          margin: 16px 0;
        }
        .title {
          .step-title-number-wrapper {
            display: grid;
            grid-template-columns: 32px auto;
            align-items: center;
            gap: 24px;
            @media (max-width: 500px) {
              grid-template-columns: 50px auto;
              gap: 16px;
            }
            h3{ 
              color: var(--dark-on-surface-variant);
            }
            .step-number {
              background: var(--dark-on-surface);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
              font-weight: 700;
              justify-content: center;
              align-items: center;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              color: var(--dark-on-secondary-container);
              @media (max-width: 500px) {
                width: 50px;
                height: 50px;
                font-size: 1.8rem;
              }
            }
          }
        }
        .border {
          margin-top: 8px;
          border-top: 2px solid var(--dark-secondary-container);
          height: 1px;
          @media (max-width: 600px) {
            margin-top: 16px;
          }
        }
      }
    }

    .content-wrapper {
      .content {
        height: 100vh;
        padding-top: 150px;

        margin-top: 40px;
        .title {
          margin-bottom: 16px;
        }
        .description {
          
          p {
            color: var(--dark-on-surface-variant);
            font-size: 1rem;
            font-weight: 400 !important;
            line-height: 1.5rem;
            margin-top: 16px;
          }
          li {
            margin-top: 4px;
          }
        }
      }
    }
    .step-wrapper {
    }
    .content {
      color: var(--white);
    }
    h2 {
    }
  }
`;
