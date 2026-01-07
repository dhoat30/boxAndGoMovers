
import HeroContent from "./HeroContent";
import styles from './Hero.module.css'

import Contact from '@/components/Pages/Contact/Contact';
import ContactInfo from "../../Footer/ContactInfo";
export default async function ContactHero({ data, heroUSP, contactInfoData }) {
    if (!data ) return null
    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
        image: data.image,
        ctaArray: data.buttons,
    };

    return (
        <>
            <section className={`${styles.contactHeroSection}`}>
                <div className={`${styles.container} max-width-xl`}>
                    <div>
                        <HeroContent title={heroData.title} subtitle={heroData.subtitle} description={heroData.description} ctaArray={heroData.ctaArray} heroUSP={heroUSP} />

                        <ContactInfo className="mt-40" contactInfo={contactInfoData} />
                    </div>
                    <Contact />

                </div>
            </section>


        </>

    )
}