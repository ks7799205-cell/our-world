export type TrackCategory =
  | "ALL"
  | "THE BEGINNING"
  | "LATE NIGHTS"
  | "ROAD TRIPS"
  | "HAPPY DAYS"
  | "OUR SONG"
  | "FUTURE";

export type Track = {
  id: string;
  trackNumber: string; // e.g. "01", "02"
  title: string;
  artist?: string;
  description?: string;
  reason?: string; // "Why this song matters to us..."
  audioSrc?: string; // e.g. "/audio/track-01.mp3"
  coverImage?: string; // e.g. "/images/music/track-01.jpg"
  coverAlt?: string;
  category: Exclude<TrackCategory, "ALL">;
  duration?: string; // formatted e.g. "3:42"
  durationSeconds?: number; // approximate duration in seconds
  featured?: boolean;
};
