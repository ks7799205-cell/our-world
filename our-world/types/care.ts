export type MoodId =
  | "sad"
  | "overwhelmed"
  | "angry"
  | "lonely"
  | "exhausted"
  | "missing-you"
  | "dont-know"
  | "need-hug";

export type CareNeedId = "talk" | "hug" | "breathe" | "distract" | "quiet";

export type CareNeed = {
  id: CareNeedId;
  label: string;
  iconName: "MessageCircle" | "Heart" | "Wind" | "Sparkles" | "Moon";
  description: string;
};

export type MoodState = {
  id: MoodId;
  label: string; // e.g. "I'm sad"
  emoji: string;
  iconName: "Frown" | "HelpCircle" | "Flame" | "UserMinus" | "BatteryLow" | "HeartCrack" | "Sparkles" | "Heart";
  shortDescription: string;
  promptTitle: string; // e.g. "If you're feeling overwhelmed..."
  supportMessage: string;
  comfortMessage: string;
  signature?: string;
  image?: string;
  imageAlt?: string;
};
