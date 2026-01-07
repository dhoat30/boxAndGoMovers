import React from 'react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from 'next/link'
import Image from 'next/image'
export default function DealsSection({title, graphicsArray, link  }) {
  return (
    <Section id="deals">  
        <Container maxWidth="xl">
        <Typography variant="h2" component="h2" className="title center-align" align="center">{title}</Typography>
        <div className="graphics-wrapper mt-24 grid gap-16">
            {graphicsArray.map((item, index) => {
                return (
                    <Link key={index} href={link ? link : '#'} className="graphic-link" aria-label='graphic-link'>
                    <div  className="image-wrapper" style={{paddingBottom : item.image.height / item.image.width * 100 + '%'}}>
                        <Image src={item.image.url} alt={item.image.alt ? item.image.alt : `graphic-${index + 1}`} fill  quality={100}/>               
                
                 
                </div>
                  </Link>)
            })} 
        </div>
        </Container> 
    </Section>
  )
}

const Section = styled.section`
padding: 24px 0;

.graphics-wrapper{ 
    grid-template-columns: 1fr 1fr 1fr; 
    @media (max-width: 700px){ 
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px){ 
        grid-template-columns:  1fr;
    }
}
`