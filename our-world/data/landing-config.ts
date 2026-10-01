export type LandingConfig = {
  intro: {
    badge: string;
    greeting: string;
    subtitle: string;
    cta: string;
    warning: string;
  };
  hero: {
    tagline: string;
    eyebrow: string;
    headline: string;
    quote: string;
    scrollCue: string;
    image: {
      src?: string;
      alt: string;
      caption?: string;
    };
    overviewTitle: string;
    overviewSubtitle: string;
  };
};

export const landingConfig: LandingConfig = {
  intro: {
    badge: "a little world for someone special",
    greeting: "Hey, you.",
    subtitle: "I made something just for you.",
    cta: "ENTER OUR WORLD",
    warning: "Warning: contains an unreasonable amount of love.",
  },
  hero: {
    tagline: "OUR WORLD",
    eyebrow: "Out of all the people in the world...",
    headline: "I somehow got you.",
    quote:
      "And I still think that's one of the luckiest things that ever happened to me.",
    scrollCue: "Scroll to continue",
    image: {
      src: "", // Replace with couple photo URL when available, e.g. "/images/hero-photo.jpg"
      alt: "A warm sunset view together looking out over the horizon",
      caption: "Our favorite view ♡",
    },
    overviewTitle: "Explore Our World",
    overviewSubtitle:
      "Every chapter, every memory, and every little secret crafted with love.",
  },
};
