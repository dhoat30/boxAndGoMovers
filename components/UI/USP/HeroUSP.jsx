'use client'
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function HeroUSP({ data, className }) {
  if (!data) return;
  return (
    <Div className={`${className} hero-usp-wrapper`}>
      <div className="text-usp-wrapper mt-16">
        {data.text_usp.map((item, index) => {
          return (
            <Typography
              variant="subtitle1"
              component="div"
              className="text-usp"
              key={index}
              color="#232e85"
            >
              <CheckCircleIcon />
              <span> {item.value}</span>
            </Typography>
          );
        })}
      </div>
      <div className="image-usp-wrapper">
        {data.image_usp &&
          data.image_usp.map((item, index) => {
            return (
              <div  key={index} className="image-wrapper" style={{paddingBottom: `${(item.image.height/ item.image.width)*100}%`}}>
              <Image
               
                src={item.image.url}
                alt={item.image.alt}
                fill
              />
              </div>
            );
          })}
          
      </div>
    </Div>
  );
}

const Div = styled.div`

  .text-usp-wrapper {

  }
  .image-usp-wrapper {
    margin-top: 16px;
    display: grid; 
    grid-template-columns: 250px 250px;
    @media(max-width: 600px){ 
      grid-template-columns: 250px ;
    }
  }
  .text-usp-wrapper,
  .image-usp-wrapper {
 
    .text-usp {
      margin-bottom: 8px; 
      display: flex;
      gap: 4px;
    }
  }
`;
