import React from 'react'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Gallery from '../../Gallery/Gallery'
export default function OurWorkSection({title, description,beforeAfterGalleryArr }) {
  return (
    <Section className='mt-16' id="our-work">
        <Container maxWidth="xl">
        <Container className="title-wrapper" maxWidth="md">
    <Typography variant="h2" component="h2" className="title" align="center">{title}</Typography>
    <Typography variant="body1" component="div" className="descripton mt-8" align="center">{description}</Typography>
    </Container>
        <div className="gallery-wrapper">
            <Gallery galleryData={beforeAfterGalleryArr}/>
        </div>
</Container>
        </Section>
  )
}

const Section = styled.section`
  scroll-margin-top: 60px;
padding-top: 40px; 
padding-bottom: 40px;
background-color: var(--light-surface-container-lowest);
.title-wrapper{ 
    padding: 0; 
}
.grid-wrapper{ 
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
  
    @media(max-width: 400px){ 
    }
}
`