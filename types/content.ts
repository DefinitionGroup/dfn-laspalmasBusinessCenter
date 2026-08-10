import type { PortableTextBlock as PortableTextValueBlock } from "@portabletext/types";

export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export type LinkField = {
  label: string;
  href: string;
};

export type SanityImage =
  | string
  | {
      asset?: { _ref?: string; _type?: string };
      crop?: Record<string, number>;
      hotspot?: Record<string, number>;
    };

export type SanityVideo =
  | string
  | {
      asset?: {
        _ref?: string;
        _type?: string;
        url?: string;
        mimeType?: string;
      };
    };

export type RichText = PortableTextValueBlock[] | string;

type BaseBlock = {
  _key: string;
  _type: string;
};

export type HeroBlock = BaseBlock & {
  _type: "heroBlock";
  brand?: string;
  headline: string;
  summary?: string;
  image?: SanityImage;
  video?: SanityVideo;
  imageAlt: string;
  primaryCta?: LinkField;
  secondaryCta?: LinkField;
};

export type IntroBlock = BaseBlock & {
  _type: "introBlock";
  eyebrow?: string;
  headline: string;
  body?: RichText;
};

export type AnimatedHeadlineBlock = BaseBlock & {
  _type: "animatedHeadlineBlock";
  eyebrow?: string;
  headline: string;
  level?: "h1" | "h2";
};

export type PortableTextBlock = BaseBlock & {
  _type: "portableTextBlock";
  body: RichText;
};

export type ContactFormBlock = BaseBlock & {
  _type: "contactFormBlock";
  eyebrow?: string;
  headline: string;
  intro?: string;
  nameLabel?: string;
  companyLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  interestLabel?: string;
  interestOptions?: string[];
  messageLabel?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  errorMessage?: string;
  privacyNotice?: string;
};

export type SpaceSummary = {
  _id: string;
  title: string;
  slug: string;
  kind: "privateOffice" | "meetingRoom" | "coworking" | "virtualOffice";
  summary?: string;
  image?: SanityImage;
  imageAlt?: string;
};

export type SpaceListBlock = BaseBlock & {
  _type: "spaceListBlock";
  eyebrow?: string;
  headline: string;
  intro?: string;
  spaces: SpaceSummary[];
};

export type FeatureListBlock = BaseBlock & {
  _type: "featureListBlock";
  eyebrow?: string;
  headline: string;
  intro?: string;
  items: Array<{ _key: string; title: string; text?: string }>;
};

export type SplitContentBlock = BaseBlock & {
  _type: "splitContentBlock";
  eyebrow?: string;
  headline: string;
  body?: RichText;
  image: SanityImage;
  imageAlt: string;
  reverse?: boolean;
  tone?: "paper" | "sand" | "ink";
  cta?: LinkField;
};

export type GalleryBlock = BaseBlock & {
  _type: "galleryBlock";
  eyebrow?: string;
  headline: string;
  images: Array<{
    _key: string;
    image: SanityImage;
    alt: string;
    caption?: string;
  }>;
};

export type GoogleMapBlock = BaseBlock & {
  _type: "googleMapBlock";
  eyebrow?: string;
  headline: string;
  address: string;
  googleMapsQuery?: string;
  zoom?: number;
  previewImage?: SanityImage;
  imageAlt: string;
  activationLabel?: string;
  privacyNotice?: string;
  directionsLabel?: string;
};

export type TestimonialSummary = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

export type TestimonialBlock = BaseBlock & {
  _type: "testimonialBlock";
  eyebrow?: string;
  headline?: string;
  testimonials: TestimonialSummary[];
};

export type LocationBlock = BaseBlock & {
  _type: "locationBlock";
  eyebrow?: string;
  headline: string;
  body?: string;
  address: string;
  mapUrl?: string;
  details?: Array<{ _key: string; label: string; value: string }>;
};

export type CtaBlock = BaseBlock & {
  _type: "ctaBlock";
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryCta: LinkField;
  secondaryCta?: LinkField;
};

export type PageBuilderBlock =
  | HeroBlock
  | IntroBlock
  | AnimatedHeadlineBlock
  | PortableTextBlock
  | ContactFormBlock
  | SpaceListBlock
  | FeatureListBlock
  | SplitContentBlock
  | GalleryBlock
  | GoogleMapBlock
  | TestimonialBlock
  | LocationBlock
  | CtaBlock;

export type PageDocument = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  language: Locale;
  translationKey?: string;
  isHomepage?: boolean;
  navbarVariant?: "light" | "dark";
  metadata?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  content: PageBuilderBlock[];
};

export type PageTranslation = Pick<
  PageDocument,
  "_id" | "_updatedAt" | "title" | "slug" | "language" | "translationKey" | "isHomepage"
>;

export type MenuDocument = {
  _id: string;
  language: Locale;
  items: Array<{ _key: string; label: string; href: string }>;
  cta?: LinkField;
};

export type SiteSettings = {
  _id: string;
  brandName: string;
  shortName: string;
  description: string;
  address: string;
  phone: string[];
  email: string[];
  receptionHours?: string;
  accessHours?: string;
  officeOpeningTime?: string;
  officeClosingTime?: string;
  defaultMetadata?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
};

export type SiteShellData = {
  settings: SiteSettings;
  menu: MenuDocument;
  translationPages: PageTranslation[];
};
