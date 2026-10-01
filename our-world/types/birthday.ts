export type BirthdayStep =
  | "intro"
  | "reveal"
  | "message"
  | "gifts"
  | "scratch"
  | "cake"
  | "surprise"
  | "letter"
  | "ending";

export type BirthdayGiftType =
  | "memory"
  | "song"
  | "message"
  | "video"
  | "mini_surprise"
  | "secret";

export type BirthdayGift = {
  id: string;
  type: BirthdayGiftType;
  title: string;
  boxColor?: "rose" | "gold" | "burgundy" | "champagne";
  description?: string;
  // For 'song'
  trackId?: string;
  songTitle?: string;
  songArtist?: string;
  audioUrl?: string;
  // For 'memory'
  memoryId?: string;
  memoryTitle?: string;
  memoryCaption?: string;
  memoryImage?: string;
  // For 'message'
  message?: string;
  // For 'mini_surprise'
  miniGameType?: "find_heart" | "tap_stars" | "fortune";
  miniGamePrompt?: string;
  miniGameReward?: string;
  videoUrl?: string;
  // For 'secret'
  secretNote?: string;
};

export type BirthdayWish = {
  id: string;
  title: string;
  message: string;
  iconName?: "Heart" | "Sparkles" | "Sun" | "Star" | "Smile";
};

export type BirthdaySurprise = {
  title: string;
  videoUrl?: string;
  videoPoster?: string;
  videoCaption?: string;
  message?: string;
  image?: string;
  imageAlt?: string;
  audioUrl?: string;
};

export type BirthdayData = {
  name: string;
  birthdayDate?: string;
  opening: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    prompt: string;
    buttonText: string;
  };
  birthdayReveal: {
    greeting: string;
    subtitle: string;
    tagline: string;
  };
  mainMessage: {
    title: string;
    paragraphs: string[];
    signature: string;
  };
  gifts: BirthdayGift[];
  scratchCard: {
    title: string;
    subtitle: string;
    prompt: string;
    revealLabel: string;
    rewardTitle: string;
    rewardMessage: string;
    rewardSubtext?: string;
  };
  wishes?: BirthdayWish[];
  reasons: string[];
  reasonsFooterNote: string;
  cake: {
    title: string;
    subtitle: string;
    makeAWishPrompt: string;
    wishedMessage: string;
    wishedSubtext: string;
  };
  surprise: BirthdaySurprise;
  letter: {
    greeting: string;
    date?: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  ending: {
    title: string;
    subtitle: string;
    note: string;
    signature: string;
  };
};
