import styled from "@emotion/styled";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ScrollableTabs from "../../Tabs/ScrollableTabs";
export default function ServiceTabs({ title, subtitle, description, cards }) {
  return (
    <Section className="mt-8">
      <Container maxWidth="xl">
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}

        <div className="title-row">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
            color="var(--dark-on-surface)"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="description"
            align="center"
            color="var(--dark-on-surface-variant)"
          >
            {description}
          </Typography>
        </div>
        <div className="tabs mt-24">
          <ScrollableTabs tabsData={cards} />
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: var(--dark-secondary-container);
  padding: 80px 0;
  @media (max-width: 900px) {
    padding: 40px 0;
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
    }
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
`;
