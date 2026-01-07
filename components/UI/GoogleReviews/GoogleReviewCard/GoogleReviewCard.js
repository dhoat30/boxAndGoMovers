import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../../Icons/GoogleIcon";

export default function GoogleReviewCard({ name, description, customerPic, className, showFacebookLogo, characterLimit = 180 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1rem" }} />
  ));

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Limit description to 200 characters if not expanded
  const shortDescription =
    description.length > characterLimit
      ? description.slice(0, characterLimit) + "..."
      : description;
let sourceLogo = showFacebookLogo ? <Image src="/facebook-reviews.png" alt="facebook page" width={96} height={24}/> :   <GoogleIcon />;
  return (
    <Div className={className}>
      <div className="profile-wrapper">
        <Image
          src={customerPic}
          alt={`${name} profile picture`}
          width="40"
          height="40"
        />
        <div className="name-wrapper">
          <Typography variant="subtitle1" component="h3">
            {name}
          </Typography>
          {starsJSX}
        </div>
      </div>
      <div className="description-wrapper mt-16 mb-16">
        <Typography variant="body1" component="p">
          {isExpanded ? description : shortDescription}
        </Typography>
        {description.length > characterLimit && (
          <button onClick={toggleExpand} className="read-more-button">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
        {sourceLogo}
    </Div>
  );
}

const Div = styled.div`
  background: var(--light-surface-container-lowest);
  padding: 16px;
  border: 1px solid var(--dark-outline-variant);

  .profile-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    img{
      border-radius: 50%;
    }
  }

  .description-wrapper {
    position: relative;
    p {
      margin-bottom: 8px;
    }
    .read-more-button {
      background: none;
      border: none;
      color: var(--light-primary);
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;
