import React from 'react'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import GoogleReviewCard from '../../GoogleReviews/GoogleReviewCard/GoogleReviewCard'
import Typography from '@mui/material/Typography'
export default function TestimonialSection({dataArr, title, description}) {
    const testimonialCardsJSX = dataArr.map((item,index)=> { 
        return <GoogleReviewCard key={index} name={item.name} description={item.description} customerPic={item.profile_pic.url} showFacebookLogo={true}/> 
    })
  return (
   <Section className='mt-16' id="testimonial-section">
<Container maxWidth="lg">
    <Container className="title-wrapper" maxWidth="md">
    <Typography variant="h2" component="h2" className="title" align="center">{title}</Typography>
    <Typography variant="body1" component="div" className="descripton mt-8" align="center">{description}</Typography>
    </Container>

    <div className="grid-wrapper mt-16 gap-16">{testimonialCardsJSX}</div>
    </Container>
   </Section>
  )
}

const Section = styled.section`
padding-top: 40px; 
padding-bottom: 40px;
scroll-margin-top: 60px;

background-color: var(--light-surface-container-lowest);
.title-wrapper{ 
    padding: 0; 
}
.grid-wrapper{ 
    display: grid; 

    grid-template-columns: 1fr 1fr 1fr; 
    @media(max-width: 800px){ 
        grid-template-columns:   1fr 1fr; 

    }
    @media(max-width: 600px){ 
        grid-template-columns:   1fr; 

    }
}
`