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
    description: "Congratulation. If you are here it mean that you are curious and soon to be awake. You will find on this site 3 categories (Mercenary, Business man and Hacker. They each correspond to a category of clothe, each category is represented by a binary code : Mercenary => 101.. ; Business man => 110.. ; Hacker => 100.. Hope you will find more info. BE AWAKE.",
    details: [
      ["Category", "1010"],
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "02",
    tag: "N°1011",
    name: "SNIPER",
    category: "Business man",
    media: [
      { type: "photo", src: "assets/img/P7291258.jpg" },{ type: "photo", src: "assets/img/P7291260.jpg" }, { type: "photo", src: "assets/img/P7291155.jpg" }
    ],
    description: "Behind-the-scenes footage from the Business Man shoot, motion and attitude captured in one continuous take.",
    details: [
      ["Category", "Business man"],
      ["Format", "100% coton"],
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "03",
    tag: "N°1012",
    name: "Mechagirl",
    category: "Business man",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "A second angle on the Business Man story, same energy, different frame.",
    details: [
      ["Category", "Business man"],
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
    category: "Hacker",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "First cut from the Hacker series, low light, sharp lines, GUNSTAR's darker register.",
    details: [
      ["Category", "Hacker"],
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
    category: "Hacker",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "Second cut from the Hacker series, continuing the same visual language.",
    details: [
      ["Category", "Hacker"],
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
    category: "Mercenary",
    media: [
      { type: "video", src: "assets/video/gunstarhomepage_2.mp4" }
    ],
    description: "Closing shot of the Mercenary series, a last look before the drop.",
    details: [
      ["Category", "Mercenary"],
      ["Format", "Video"],
      ["Reference", "N°06"]
    ],
    delivery: "Digital piece — no physical shipping required. Full-resolution files are sent by email after your enquiry is confirmed.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  }
];
