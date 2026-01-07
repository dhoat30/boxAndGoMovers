"use client";
import * as React from "react";
import styled from "@emotion/styled";
import BeforeAfterMasonry from "../BeforeAfterSlider/BeforeAfterMasonry";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function Gallery({ galleryData }) {
  const [value, setValue] = React.useState(0);
  if (!galleryData) return null;
  // Extract unique tags for the tabs, and add a "Show All" option
  const uniqueTags = [
    { value: "all", label: "All" },
    ...Array.from(
      new Set(galleryData.map((item) => item.tag.value)) // Get unique tag values
    ).map((tagValue) => {
      const tag = galleryData.find((item) => item.tag.value === tagValue)?.tag; // Find the first matching tag object
      return tag;
    }),
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter gallery items based on selected tab
  const filteredGalleryData =
    value === 0
      ? galleryData // Show all items if "All" tab is selected
      : galleryData.filter(
          (item) => item.tag.value === uniqueTags[value].value
        );

  return (
    <Section >
      {/* Tabs for filtering */}
      {/* <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
        textColor="secondary"
        indicatorColor="secondary"
        className="tabs-wrapper"
      >
        {uniqueTags.map((tag, index) => (
          <Tab key={index} label={tag.label} />
        ))}
      </Tabs> */}

      {/* Filtered gallery grid */}
      <div className="masonry-wrapper">
        {filteredGalleryData.map((item, index) => (
          <div key={index} className="image-container">
            <BeforeAfterMasonry
              priority={index === 0}
              showTitle={false}
              data={{
                beforeImage: item.before_image,
                afterImage: item.after_image,
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 16px;
  @media (max-width: 600px) {
    padding: 0 ;
  }
  .tabs-wrapper {
    .MuiTabs-flexContainer {
    }

    button {
      border-bottom: 1px solid var(--light-outline-variant);
    }
  }
  .masonry-wrapper {
    column-count: 3;
    column-gap: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
    @media (max-width: 900px) {
      column-count: 2;
    }
    @media (max-width: 600px) {
      column-count: 1;
    }
  }
  .image-container {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--light-outline-variant);
    margin-bottom: 24px; /* Adds the row gap */
    break-inside: avoid; /* Ensures no images break in the column layout */
  }
`;
