import curly from "@/assets/models/model-curly.png";
import straight from "@/assets/models/model-straight.png";
import braids from "@/assets/models/model-braids.png";
import bob from "@/assets/models/model-bob.png";
import wolfcut from "@/assets/models/model-wolfcut.png";
import pixie from "@/assets/models/model-pixie.png";
import curtain from "@/assets/models/model-curtain.png";
import butterfly from "@/assets/models/model-butterfly.png";
import wavy from "@/assets/models/model-wavy.png";
import lob from "@/assets/models/model-lob.png";

export type Length = "short" | "medium" | "long";
export type Texture = "straight" | "wavy" | "curly" | "coily";
export type Mood = "minimal" | "elegant" | "bold" | "trendy" | "soft" | "edgy";
export type Upkeep = "low" | "medium" | "high";
export type Occasion = "everyday" | "college" | "professional" | "party" | "event";

export interface Hairstyle {
  id: string;
  name: string;
  image: string;
  alt: string;
  category: string;
  length: Length;
  textures: Texture[];
  moods: Mood[];
  upkeep: Upkeep;
  occasions: Occasion[];
  note: string;
}

export const hairstyles: Hairstyle[] = [
  {
    id: "long-curls",
    name: "Cascading Curls",
    image: curly,
    alt: "Model with very long voluminous curly hair",
    category: "Curly",
    length: "long",
    textures: ["curly", "wavy"],
    moods: ["bold", "elegant"],
    upkeep: "high",
    occasions: ["party", "event"],
    note: "Volume that photographs like couture. Diffuse, don't brush.",
  },
  {
    id: "long-straight",
    name: "Liquid Straight",
    image: straight,
    alt: "Model with sleek long straight hair",
    category: "Long Straight",
    length: "long",
    textures: ["straight"],
    moods: ["minimal", "elegant"],
    upkeep: "medium",
    occasions: ["professional", "everyday"],
    note: "A glass finish. Quiet luxury for straight hair types.",
  },
  {
    id: "braids",
    name: "Sculpted Braids",
    image: braids,
    alt: "Model with long intricate braids",
    category: "Braids",
    length: "long",
    textures: ["coily", "curly"],
    moods: ["bold", "trendy"],
    upkeep: "low",
    occasions: ["everyday", "event", "college"],
    note: "Weeks of protection with an architectural silhouette.",
  },
  {
    id: "bob",
    name: "The French Bob",
    image: bob,
    alt: "Model with a chin length bob and fringe",
    category: "Bob",
    length: "short",
    textures: ["straight", "wavy"],
    moods: ["minimal", "trendy", "elegant"],
    upkeep: "medium",
    occasions: ["professional", "everyday", "party"],
    note: "A jawline in italics. Best with a blunt line.",
  },
  {
    id: "wolf",
    name: "Wolf Cut",
    image: wolfcut,
    alt: "Model with a shaggy layered wolf cut",
    category: "Wolf Cut",
    length: "medium",
    textures: ["wavy", "straight"],
    moods: ["edgy", "trendy", "bold"],
    upkeep: "low",
    occasions: ["college", "party", "everyday"],
    note: "Undone on purpose. Air-dry and let it misbehave.",
  },
  {
    id: "pixie",
    name: "Couture Pixie",
    image: pixie,
    alt: "Model with a cropped pixie haircut",
    category: "Pixie",
    length: "short",
    textures: ["straight", "wavy"],
    moods: ["edgy", "minimal", "bold"],
    upkeep: "high",
    occasions: ["professional", "event"],
    note: "All bone structure, no distraction.",
  },
  {
    id: "curtain",
    name: "Curtain Bangs",
    image: curtain,
    alt: "Model with curtain bangs and face framing layers",
    category: "Curtain Bangs",
    length: "medium",
    textures: ["straight", "wavy"],
    moods: ["soft", "trendy", "elegant"],
    upkeep: "medium",
    occasions: ["everyday", "college", "professional"],
    note: "The softest way to change everything.",
  },
  {
    id: "butterfly",
    name: "Butterfly Layers",
    image: butterfly,
    alt: "Model with voluminous butterfly cut layers",
    category: "Butterfly Cut",
    length: "medium",
    textures: ["wavy", "straight", "curly"],
    moods: ["trendy", "soft", "bold"],
    upkeep: "medium",
    occasions: ["party", "college", "event"],
    note: "Short layers up top, length kept below. Instant movement.",
  },
  {
    id: "wavy",
    name: "Editorial Waves",
    image: wavy,
    alt: "Model with voluminous shoulder length waves",
    category: "Wavy",
    length: "medium",
    textures: ["wavy", "curly"],
    moods: ["elegant", "soft"],
    upkeep: "medium",
    occasions: ["event", "professional", "party"],
    note: "Old-Hollywood bend, modern matte finish.",
  },
  {
    id: "lob",
    name: "Layered Lob",
    image: lob,
    alt: "Model with a long layered lob haircut",
    category: "Lob",
    length: "medium",
    textures: ["straight", "wavy"],
    moods: ["minimal", "soft", "elegant"],
    upkeep: "low",
    occasions: ["everyday", "professional", "college"],
    note: "The most forgiving cut in the book.",
  },
];

export const categories = [
  "All",
  "Bob",
  "Lob",
  "Wolf Cut",
  "Butterfly Cut",
  "Pixie",
  "Curtain Bangs",
  "Long Straight",
  "Curly",
  "Wavy",
  "Braids",
];

export const byId = (id: string) => hairstyles.find((h) => h.id === id);
