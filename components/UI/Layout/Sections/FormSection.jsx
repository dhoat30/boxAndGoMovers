import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import HeroUSP from "../../USP/HeroUSP";
import Image from "next/image";
import BeforeAfter from "../../BeforeAfterSlider/BeforeAfter";
import GetQuoteForm from "@/components/UI/Forms/GetQuoteForm";
import Video from "@/components/UI/Video/Video";
import Link from "next/link";
export default function FormSection({ title, description, usp, graphic }) {
  let graphicComponent = null 
  if(graphic.graphic_type === "image"){ 
    const paddingBottom = graphic.image.height/graphic.image.width * 100
    graphicComponent = <div className="image-wrapper border-radius-12" style={{paddingBottom: `${paddingBottom}%`}}>
      <Image src={graphic.image.url} alt={graphic.image.alt} fill sizes="(max-width: 1000px) 100vw, 50vw"/>
    </div>
  }
  if(graphic.graphic_type === "before_after"){ 
    graphicComponent = <div className="border-radius-12 overflow-hidden"><BeforeAfter data={{beforeImage: graphic.before_after_image.before, afterImage: graphic.before_after_image.after}} /></div>
  }
  if(graphic.graphic_type === "video"){ 
    graphicComponent = <Video videoHosted={"self"} url={graphic.video.video.url} placeholderImage={graphic.video.placeholder_image} showCompressedImage={true} />
  }
  if(graphic.graphic_type === "youtube_video"){ 
    graphicComponent = <Video videoHosted={"youtube"} videoID={graphic.youtube_video.youtube_id} placeholderImage={graphic.youtube_video.placeholder_image} showCompressedImage={true} />
  }
  return (
    <Section>
      <Container maxWidth="lg" className="container">
        <div className="grid gap-24">
          <div className="content-wrapper "  >
            <Typography component={"h1"} variant={"h2"} className="title ">
              {title} 
            </Typography>
            <Typography component={"div"} variant={"body1"} className="description mt-16">
              {description} 
            </Typography>
          
            <HeroUSP data={usp} className="mb-16"/> 
              {graphicComponent}

          </div>
          <Paper className="form-wrapper  border-radius-12" variant="outlined">
            <GetQuoteForm hideTitle={true} 
            hubspotPortalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}
            hubspotFormId={process.env.NEXT_PUBLIC_HUBSPOT_QUOTE_FORM_ID}
            /> 
          </Paper>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`

padding-top: 120px; 
padding-bottom: 40px; 
@media(max-width: 600px){ 
  padding-top: 80px; 
}
.container{ 
  @media (max-width: 600px) {
      padding:0; 
  }
  .grid{ 
    display: grid; 
    grid-template-columns: 1fr 1fr;
    align-items: start;
    @media(max-width: 1000px){ 
      grid-template-columns: 1fr; 
    }
    .content-wrapper{ 
    padding: 0 16px; 
      title{ 
       
      }
    }
    .form-wrapper{ 
      padding: 8px 24px; 
      @media(max-width: 600px){ 
        padding: 8px 16px; 
      }
      @media(min-width: 1000px){ 
        position: sticky; 
        top: 100px;  
    }
    }
  }
}
`;
