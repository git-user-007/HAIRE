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

export interface CollageFigure {
  id: string;
  src: string;
  alt: string;
  /** side the cutout flies in from */
  side: "left" | "right";
  /** final position, % of viewport */
  left: number;
  top: number;
  /** final width, vw-ish (rem via style) */
  width: number;
  rotate: number;
  /** stacking depth, also drives parallax strength */
  depth: number;
  delay: number;
  /** hidden on small screens to keep it light */
  mobile: boolean;
  opacity?: number;
}

export const collageFigures: CollageFigure[] = [
  {
    id: "curly",
    src: curly,
    alt: "Model with long cascading curls",
    side: "left",
    left: 2,
    top: 26,
    width: 26,
    rotate: -5,
    depth: 3,
    delay: 0,
    mobile: true,
  },
  {
    id: "pixie",
    src: pixie,
    alt: "Model with a couture pixie cut",
    side: "right",
    left: 74,
    top: 30,
    width: 25,
    rotate: 4,
    depth: 3,
    delay: 0.15,
    mobile: true,
  },
  {
    id: "braids",
    src: braids,
    alt: "Model with sculpted long braids",
    side: "left",
    left: 16,
    top: 8,
    width: 19,
    rotate: 3,
    depth: 2,
    delay: 0.45,
    mobile: false,
  },
  {
    id: "wolfcut",
    src: wolfcut,
    alt: "Model with a shaggy wolf cut",
    side: "right",
    left: 63,
    top: 6,
    width: 20,
    rotate: -3,
    depth: 2,
    delay: 0.6,
    mobile: false,
  },
  {
    id: "bob",
    src: bob,
    alt: "Model with a French bob",
    side: "left",
    left: -4,
    top: 58,
    width: 22,
    rotate: 6,
    depth: 4,
    delay: 0.9,
    mobile: true,
  },
  {
    id: "butterfly",
    src: butterfly,
    alt: "Model with butterfly cut layers",
    side: "right",
    left: 80,
    top: 60,
    width: 23,
    rotate: -6,
    depth: 4,
    delay: 1.05,
    mobile: true,
  },
  {
    id: "straight",
    src: straight,
    alt: "Model with liquid straight hair",
    side: "left",
    left: 27,
    top: 48,
    width: 16,
    rotate: -2,
    depth: 1,
    delay: 1.35,
    mobile: false,
    opacity: 0.92,
  },
  {
    id: "wavy",
    src: wavy,
    alt: "Model with editorial waves",
    side: "right",
    left: 56,
    top: 46,
    width: 16,
    rotate: 2,
    depth: 1,
    delay: 1.5,
    mobile: false,
    opacity: 0.92,
  },
  {
    id: "curtain",
    src: curtain,
    alt: "Model with curtain bangs",
    side: "left",
    left: 33,
    top: 4,
    width: 14,
    rotate: 2,
    depth: 1,
    delay: 1.8,
    mobile: false,
    opacity: 0.85,
  },
  {
    id: "lob",
    src: lob,
    alt: "Model with a layered lob",
    side: "right",
    left: 52,
    top: 2,
    width: 14,
    rotate: -2,
    depth: 1,
    delay: 1.95,
    mobile: false,
    opacity: 0.85,
  },
];
