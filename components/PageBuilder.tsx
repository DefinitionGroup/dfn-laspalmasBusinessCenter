import CtaBlock from "@/components/blocks/CtaBlock";
import AnimatedHeadlineBlock from "@/components/blocks/AnimatedHeadlineBlock";
import ContactFormBlock from "@/components/blocks/ContactFormBlock";
import FeatureListBlock from "@/components/blocks/FeatureListBlock";
import GalleryBlock from "@/components/blocks/GalleryBlock";
import GoogleMapBlock from "@/components/blocks/GoogleMapBlock";
import HeroBlock from "@/components/blocks/HeroBlock";
import IntroBlock from "@/components/blocks/IntroBlock";
import LocationBlock from "@/components/blocks/LocationBlock";
import PortableTextBlock from "@/components/blocks/PortableTextBlock";
import SpaceListBlock from "@/components/blocks/SpaceListBlock";
import SplitContentBlock from "@/components/blocks/SplitContentBlock";
import TestimonialBlock from "@/components/blocks/TestimonialBlock";
import type { Locale, PageBuilderBlock } from "@/types/content";

export default function PageBuilder({ content, locale }: { content: PageBuilderBlock[]; locale: Locale }) {
  if (!content?.length) return null;

  const alreadyHasH1 = content.some(
    (block) => block._type === "heroBlock" || (block._type === "animatedHeadlineBlock" && block.level === "h1"),
  );
  let promotedPortableTextHeading = false;

  return content.map((block) => {
    switch (block._type) {
      case "heroBlock":
        return <HeroBlock key={block._key} block={block} />;
      case "introBlock":
        return <IntroBlock key={block._key} block={block} />;
      case "animatedHeadlineBlock":
        return <AnimatedHeadlineBlock key={block._key} block={block} />;
      case "portableTextBlock":
        const promoteFirstHeading = !alreadyHasH1 && !promotedPortableTextHeading;
        promotedPortableTextHeading ||= promoteFirstHeading;
        return <PortableTextBlock key={block._key} block={block} promoteFirstHeading={promoteFirstHeading} />;
      case "contactFormBlock":
        return <ContactFormBlock key={block._key} block={block} locale={locale} />;
      case "spaceListBlock":
        return <SpaceListBlock key={block._key} block={block} locale={locale} />;
      case "featureListBlock":
        return <FeatureListBlock key={block._key} block={block} />;
      case "splitContentBlock":
        return <SplitContentBlock key={block._key} block={block} />;
      case "galleryBlock":
        return <GalleryBlock key={block._key} block={block} />;
      case "googleMapBlock":
        return <GoogleMapBlock key={block._key} block={block} />;
      case "testimonialBlock":
        return <TestimonialBlock key={block._key} block={block} />;
      case "locationBlock":
        return <LocationBlock key={block._key} block={block} />;
      case "ctaBlock":
        return <CtaBlock key={block._key} block={block} />;
      default:
        return null;
    }
  });
}
