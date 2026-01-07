"use client";
import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection";
import RowSection from "./Sections/RowSection";
import ServicesSection from "./Sections/ServicesSection";
import ProcessSection from "./Sections/ProcessSection";
import ProjectsSection from "./Sections/ProjectsSection";
import ServiceTabs from "./Sections/ServiceTabs";
import Packages from "./Sections/Packages";
import FaqAccordionSection from "./Sections/FaqAccordionSection";
import ServiceChecklist from "./Sections/ServiceChecklist";
import FormSection from "./Sections/FormSection";
import TestimonialSection from "./Sections/TestimonialSection";
import OurWorkSection from "./Sections/OurWorkSection";
import GradientTabs from "./Sections/GradientTabs";
import DealsSection from "./Sections/DealsSection";
export default function Layout({ sections, projectsData }) {
console.log(sections)
  if (!sections) return null;
  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "form_section") {
      return (
        <FormSection 
        key={index}
        title={section.title}
        description={section.description} 
        usp={section}
        graphic={section.graphic}
        />
      )
    }
    // if(section.acf_fc_layout === "deals_"){
    //   return <DealsSection key={index} 
    //   title={section.title} 
    //   graphicsArray={section.deal_graphics} 
    //   link={"/#quote-form"} />
    // } 
 
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row" || section.acf_fc_layout === "row_layout" ) {
      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.card}
          sectionCtaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <ProcessSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }

    if (section.acf_fc_layout === "projects") {
      return (
        <ProjectsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.select_projects}
          projectsData={projectsData}
        />
      );
    }

    if (section.acf_fc_layout === "services_tab") {
      return (
        <ServiceTabs
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "tabs_section") {
      return    <GradientTabs   key={index}
      title={section.section_title}
      description={section.section_description}
      cards={section.tabs}/>
    }
    
    if (section.acf_fc_layout === "packages") {
      return (
        <Packages
          key={index}
          serviceName={section.service_name}
          title={section.title}
          packagesArray={section.package}
          termsAndConditions={section.terms_conditions}
        />
      );
    }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "service_checklist") {
      return (
        <ServiceChecklist
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
   
    if (section.acf_fc_layout === "testimonials") {
        if(section.testimonials_source === 'facebook'){ 
            return <TestimonialSection key={index} dataArr={section.facebook_reviews} title={section.title} description={section.description} /> 
        }
    }
    if (section.acf_fc_layout === "our_work") {
        return <OurWorkSection key={index} title={section.title} description={section.description} beforeAfterGalleryArr={section.before_after_gallery}/> 
  }
  });

  return <div>{sectionsJSX} </div>;
}
