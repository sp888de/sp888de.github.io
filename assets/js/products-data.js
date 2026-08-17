// =========================================================
// GUNSTAR — products-data.js
// Single source of truth for every photo/video in the gallery
// and its product page. Add a new object here whenever you
// add a new visual — no other file needs to change.
//
// Fields:
//   id          unique string, matches ?item=<id> in the URL
//   tag         archive number shown on the media ("N°01")
//   name        product/piece name
//   category    used by the gallery filters + shown as eyebrow
//   media       array of { type: "photo"|"video", src } — the
//               FIRST entry is used as the gallery thumbnail and
//               as the default view on the product page. Add more
//               entries to get extra thumbnails on the product page,
//               like nobody.solutions does.
//   description short paragraph for the product page
//   details     array of [label, value] pairs for the "Details" tab
//   delivery    text for the "Delivery" tab
//   terms       text for the "Terms" tab
// =========================================================

const GUNSTAR_PRODUCTS = [
  {
    id: "01",
    tag: "N°0000",
    name: "INTRODUCTION",
    category: "None",
    media: [
      { src: "assets/img/etoile_blanche.png" }
    ],
    description: "Congratulations. Curiosity brought you into the archive. Three divisions operate inside GUNSTAR: Mercenary, Business man and Hacker. Each division controls a classified clothing series and a binary protocol: Mercenary => 101, Business man => 110, Hacker => 100. Stay alert. Be awake.",
    details: [
      ["Category", "Knowledge"],
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "02",
    tag: "N°1011",
    name: "SNIPER",
    category: "Mercenary",
    media: [
      { type: "photo", src: "assets/img/P7291258.jpg" },{ type: "photo", src: "assets/img/P7291260.jpg" }, { type: "photo", src: "assets/img/P7291155.jpg" }
    ],
    description: "A field asset from the Mercenary division, engineered around precision, distance and controlled impact.",
    details: [
      ["Category", "Mercenary"],
      ["Format", "100% cotton"],
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "03",
    tag: "N°1012",
    name: "Mechagirl",
    category: "Mercenary",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "A second classified entry from the Mercenary division. Same command structure, different operative profile.",
    details: [
      ["Category", "Mercenary"],
      ["Format", "Video"],
      ["Reference", "N°03"]
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "04",
    tag: "N°1101",
    name: "YEAT",
    category: "Business man",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "An asset from the Business man division: controlled presence, private access and silent leverage.",
    details: [
      ["Category", "Business man"],
      ["Format", "Video"],
      ["Reference", "N°04"]
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "05",
    tag: "N°05",
    name: "1102",
    category: "Business man",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "The second Business man file. Capital, influence and discretion encoded into the same visual system.",
    details: [
      ["Category", "Business man"],
      ["Format", "Video"],
      ["Reference", "N°05"]
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "06",
    tag: "N°06",
    name: "1001",
    category: "Hacker",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "The first recovered file from the Hacker division: low light, corrupted signals and unauthorized access.",
    details: [
      ["Category", "Hacker"],
      ["Format", "Video"],
      ["Reference", "N°06"]
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  }
];
