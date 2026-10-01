import type { CareNeed, MoodState } from "@/types/care";

export const careIntro = {
  eyebrow: "Your Safe Haven",
  greeting: "Hey.",
  question: "Rough day?",
  subtitle: "You don't have to explain anything.",
  prompt: "Just tell me what you need right now. You don't have to fix everything tonight.",
};

export const careNeedsList: CareNeed[] = [
  {
    id: "talk",
    label: "Talk to me",
    iconName: "MessageCircle",
    description: "Reassuring words and reminder that you are loved.",
  },
  {
    id: "hug",
    label: "I just want a hug",
    iconName: "Heart",
    description: "A soft, quiet embrace with no questions asked.",
  },
  {
    id: "breathe",
    label: "Help me breathe",
    iconName: "Wind",
    description: "A gentle 4-4-4 rhythm to slow down your racing mind.",
  },
  {
    id: "distract",
    label: "Give me a distraction",
    iconName: "Sparkles",
    description: "A light smile, cute thoughts, or exploring our memories.",
  },
  {
    id: "quiet",
    label: "Let me be quiet",
    iconName: "Moon",
    description: "Peaceful presence without any pressure to speak.",
  },
];

export const virtualHugData = {
  title: "Come here. 🤍",
  message:
    "Consider this your personal hug. Wrap your arms around yourself, close your eyes for ten seconds, and know that I am holding you right now. You don't have to carry the entire world all on your own. Stay here as long as you need.",
  signature: "Holding you tight,\n[YOUR NAME]",
};

export const moodStatesData: MoodState[] = [
  {
    id: "sad",
    label: "I'm sad",
    emoji: "😔",
    iconName: "Frown",
    shortDescription: "Feeling down or heavy-hearted.",
    promptTitle: "If you're feeling sad today...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Acknowledge her sadness gently, remind her that tears are okay, and tell her you are right beside her without trying to rush her feelings.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Describe what you would do if you were sitting next to her — holding her hand, putting on a warm blanket, and letting her lean on your shoulder.]",
    signature: "Always by your side,\n[YOUR NAME]",
  },
  {
    id: "overwhelmed",
    label: "I'm overwhelmed",
    emoji: "😵",
    iconName: "HelpCircle",
    shortDescription: "Too much going on at once.",
    promptTitle: "If everything feels like too much...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Remind her she doesn't have to solve every single problem tonight. Tell her to pause, take off the pressure, and focus on just one tiny breath at a time.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Tell her you believe in her resilience, but right now it's okay to put down the heavy backpack and rest.]",
    signature: "You've got this (and I've got you),\n[YOUR NAME]",
  },
  {
    id: "angry",
    label: "I'm frustrated / angry",
    emoji: "😤",
    iconName: "Flame",
    shortDescription: "Annoyed, upset, or boiling over.",
    promptTitle: "If you're frustrated or mad...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Validate that her anger or frustration is completely understandable. Offer a judgment-free zone where she can vent without unsolicited advice.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Remind her you are always on her team, ready to listen whenever she wants to let it all out, or just sit with her until the storm passes.]",
    signature: "In your corner, always,\n[YOUR NAME]",
  },
  {
    id: "lonely",
    label: "I feel lonely",
    emoji: "🥺",
    iconName: "UserMinus",
    shortDescription: "Needing to feel connected.",
    promptTitle: "If you're feeling alone right now...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Reassure her of your deep love and connection. Remind her that distance or busy schedules can never make her truly alone, because your heart is always with her.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Recall a cozy moment that shows how close you two are, and promise her you'll talk soon.]",
    signature: "Never truly apart,\n[YOUR NAME]",
  },
  {
    id: "exhausted",
    label: "I'm exhausted / drained",
    emoji: "😴",
    iconName: "BatteryLow",
    shortDescription: "Zero energy left in the tank.",
    promptTitle: "If your energy is completely empty...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Give her permission to do absolutely nothing. Remind her that resting is productive and that she has worked so hard.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Tell her to drink a sip of water, get under the warm covers, and close her eyes knowing she did enough today.]",
    signature: "Sweet dreams & gentle rest,\n[YOUR NAME]",
  },
  {
    id: "missing-you",
    label: "I miss you",
    emoji: "💭",
    iconName: "HeartCrack",
    shortDescription: "Longing to be together.",
    promptTitle: "When you miss me as much as I miss you...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Tell her how much you wish you could teleport right to her side. Remind her of the next time you'll see each other.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Describe how much she means to you and how counting down the days is always worth it.]",
    signature: "Missing you every second,\n[YOUR NAME]",
  },
  {
    id: "dont-know",
    label: "I don't know what's wrong",
    emoji: "🤷",
    iconName: "Sparkles",
    shortDescription: "Just an off day with no clear reason.",
    promptTitle: "When you just feel 'off' and can't explain it...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: Remind her that feelings don't always need a logical explanation. It's okay to just feel off, and you love her through every mood.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Tell her you're here to hold space without trying to diagnose or fix it.]",
    signature: "Here with you no matter what,\n[YOUR NAME]",
  },
  {
    id: "need-hug",
    label: "I just need comfort",
    emoji: "🤍",
    iconName: "Heart",
    shortDescription: "A gentle hug and quiet safety.",
    promptTitle: "If all you need is a warm embrace...",
    supportMessage:
      "[WRITE YOUR SUPPORT MESSAGE HERE: A soft, warm reminder of your unconditional love and support.]",
    comfortMessage:
      "[WRITE YOUR INTIMATE COMFORT NOTE HERE: Pure warmth and reassurance that everything will be okay.]",
    signature: "Wrapped in my love,\n[YOUR NAME]",
  },
];

export const distractionItems = [
  {
    id: "thought-1",
    title: "A gentle reminder",
    content: "No matter how messy today felt, the sun will rise tomorrow and you will have a clean slate.",
  },
  {
    id: "thought-2",
    title: "A fact about us",
    content: "You are my favorite notification, my favorite laugh to hear, and my favorite person to talk to.",
  },
  {
    id: "thought-3",
    title: "A tiny challenge",
    content: "Take a sip of water, un-clench your jaw, drop your shoulders from your ears, and take one deep breath.",
  },
];
