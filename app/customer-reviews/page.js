export const revalidate = 2592000; // applies to both page and metadata

import Header from '@/components/UI/Header/Header'
import GetQuotePage from '@/components/Pages/GetQuotePage/GetQuotePage'
import {getSinglePostData, getGoogleReviews} from '@/utils/fetchData'
import Footer from '@/components/UI/Footer/Footer'
import Layout from '@/components/UI/Layout/Layout'
import GoogleReviewsCarousel from '@/components/UI/GoogleReviews/GoogleReviewsCarousel'
import GoogleReviewGridLayout from '@/components/UI/GoogleReviews/GoogleReviewGridLayout'
import BreadcrumbHero from '@/components/UI/Hero/BreadcrumbHero'



export async function generateMetadata(props, parent) {
    const params = await props.params;
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData( 'k-cleaning-solution', '/wp-json/wp/v2/cleaning-business')

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL(process.env.siteUrl),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: process.env.siteUrl,
                siteName: process.env.siteName,
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData?.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }
}

  export default async function PrimeCleanExperts() {
    const data = await getSinglePostData( 'k-cleaning-solution', '/wp-json/wp/v2/cleaning-business')
    const googleReviews = await getGoogleReviews()
    if(!data) return {notFound: true}
    const sections = data[0]?.acf?.layout

    return (
        <>
            <Header />
            <main>
                <BreadcrumbHero title={"Customer Reviews"} description={"Explore authentic customer feedback and see why people trust us. Each review reflects the quality and dedication we bring to every service we provide."} />
           <GoogleReviewGridLayout data={googleReviews} />

            <Layout sections={sections} />
                {/* <Layout sections={postData[0]?.acf?.sections} /> */}
                {/* <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} /> */}

            </main>
            <Footer showFooterCta={false} />
        </>
    )
}
