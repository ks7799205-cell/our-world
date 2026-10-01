import type { Track, TrackCategory } from "@/types/music";

export const soundtrackCategories: TrackCategory[] = [
  "ALL",
  "THE BEGINNING",
  "LATE NIGHTS",
  "ROAD TRIPS",
  "HAPPY DAYS",
  "OUR SONG",
  "FUTURE",
];

export const soundtrackIntro = {
  eyebrow: "The Music of Us",
  title: "OUR SOUNDTRACK",
  quote: "Some songs are just songs. Somehow, these became ours.",
  subquote: "Press play when you're ready to listen.",
};

export const soundtrackOutro = {
  prompt: "Music makes memories last forever. Let's keep exploring.",
  ctaText: "BAD DAYS & COMFORT CARE",
  ctaHref: "/care",
};

export const soundtrackData: Track[] = [
  {
    id: "track-01",
    trackNumber: "01",
    title: "Our Song",
    artist: "Artist Name / Placeholder",
    description: "The song that always feels like ours, no matter where or when it plays.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Describe when you both first heard it together, or why the melody captures how you feel about her.]",
    audioSrc: "", // e.g. "/audio/our-song.mp3"
    coverImage: "", // e.g. "/images/music/our-song.jpg"
    coverAlt: "Our Song cover art",
    category: "OUR SONG",
    duration: "3:45",
    durationSeconds: 225,
    featured: true,
  },
  {
    id: "track-02",
    trackNumber: "02",
    title: "The Beginning",
    artist: "Artist Name / Placeholder",
    description: "The soundtrack to the days when we were just starting to fall for each other.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Describe the early nervousness, late night texts, and the exciting beginning of us.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "The Beginning track cover",
    category: "THE BEGINNING",
    duration: "4:12",
    durationSeconds: 252,
  },
  {
    id: "track-03",
    trackNumber: "03",
    title: "Late Night Drive",
    artist: "Artist Name / Placeholder",
    description: "Quiet streets, city lights passing by, and your hand in mine.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Describe a specific nighttime drive, talking about life and singing along.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "Late Night Drive track cover",
    category: "LATE NIGHTS",
    duration: "3:28",
    durationSeconds: 208,
  },
  {
    id: "track-04",
    trackNumber: "04",
    title: "Windows Down & Singing Loud",
    artist: "Artist Name / Placeholder",
    description: "Carefree road trip vibes where we both pretend we can hit the high notes.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Mention a fun trip, the open road, and how laughing with her made the journey fly by.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "Road trip track cover",
    category: "ROAD TRIPS",
    duration: "3:54",
    durationSeconds: 234,
  },
  {
    id: "track-05",
    trackNumber: "05",
    title: "Pure Sunshine",
    artist: "Artist Name / Placeholder",
    description: "An upbeat, happy melody that matches your radiant smile.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Describe how her positive energy and bright smile lift your mood instantly.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "Happy Days track cover",
    category: "HAPPY DAYS",
    duration: "3:15",
    durationSeconds: 195,
  },
  {
    id: "track-06",
    trackNumber: "06",
    title: "Slow Dance in the Kitchen",
    artist: "Artist Name / Placeholder",
    description: "A tender, gentle acoustic song for quiet unhurried moments together.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Describe a gentle quiet moment, resting your head on her shoulder and feeling completely at peace.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "Acoustic slow dance cover",
    category: "LATE NIGHTS",
    duration: "4:30",
    durationSeconds: 270,
  },
  {
    id: "track-07",
    trackNumber: "07",
    title: "To Every Tomorrow",
    artist: "Artist Name / Placeholder",
    description: "A song dedicated to all the adventures and milestones ahead of us.",
    reason:
      "[WRITE WHY THIS SONG REMINDS YOU OF HER: Express your excitement for future trips, shared dreams, and growing older together.]",
    audioSrc: "",
    coverImage: "",
    coverAlt: "Future track cover",
    category: "FUTURE",
    duration: "3:58",
    durationSeconds: 238,
  },
];
