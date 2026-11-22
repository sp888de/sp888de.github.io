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
//
// IMPORTANT: every product object goes INSIDE the same [ ... ]
// array below, separated by commas. Never close the array (]) and
// reopen a new { ... } outside it — that breaks the whole file.
// =========================================================

const GUNSTAR_PRODUCTS = [
  {
    id: "01",
    tag: "N°0000",
    name: "INTRODUCTION",
    seoTitle: "Discover the GUNSTAR Universe — Three Divisions",
    seoDescription: "Enter the GUNSTAR universe and discover its three divisions: Mercenary, Business Man and Hacker, each with its own clothing series and visual identity.",
    category: "None",
    media: [
      { type: "video", src: "https://res.cloudinary.com/iptm1k0x/video/upload/v1793478625/gunstarhomepage_2.mp4" }
    ],
    description: "Congratulations. Curiosity brought you into the archive. Here is some classified information for you : Three divisions operate inside GUNSTAR: Mercenary, Business man and Hacker. Each division controls a classified clothing series. Be awake. Choose GUNSTAR.",
    details: [
      ["Category", "Knowledge"]
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "02",
    sizes: ["S", "M", "L", "XL"],
    tag: "N°1010",
    name: "SNIPER",
    seoTitle: "SNIPER — Mercenary Clothing Archive | GUNSTAR",
    seoDescription: "Explore SNIPER, an archived GUNSTAR clothing piece from the Mercenary division. View the design and photographs. This piece is sold out.",
    purchasable: false,
    price: null,
    category: "Mercenary",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/P7291261.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/P7291156.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_5662.jpg" }
    ],
    description: "This piece is sold out, try next time.",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "03",
    sizes: ["S", "M", "L", "XL"],
    tag: "N°1011",
    name: "Mechagirl",
    seoTitle: "Mechagirl — Mercenary Clothing Archive | GUNSTAR",
    seoDescription: "Discover Mechagirl, an archived GUNSTAR clothing piece from the Mercenary division. Explore the design and photographs. This piece is sold out.",
    purchasable: false,
    price: null,
    category: "Mercenary",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_5662.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/P7291158.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/P7291170.jpg" }
    ],
    description: "This piece is sold out, try next time.",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "04",
    sizes: ["S", "M", "L", "XL"],
    tag: "N°1100",
    name: "BOGO",
    seoTitle: "BOGO — Business Man Clothing Archive | GUNSTAR",
    seoDescription: "Explore BOGO, an archived GUNSTAR clothing piece from the Business Man division. View the design and photographs. This piece is sold out.",
    purchasable: false,
    price: null,
    category: "Business man",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/10-DSC00221.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/4-DSC00260.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/6-DSC00254.jpg" }
    ],
    description: "This piece is sold out, try next time.",
    details: [
      ["Category", "Business man"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "05",
    sizes: ["S", "M", "L", "XL"],
    tag: "N°1101",
    name: "INSERT COIN",
    seoTitle: "INSERT COIN — Exclusive Piece for Arkan | GUNSTAR",
    seoDescription: "Discover INSERT COIN, a GUNSTAR clothing piece created exclusively for the artist Arkan. Explore photographs from the Business Man archive.",
    purchasable: false,
    price: null,
    category: "Business man",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_3697.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_3533.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/tee_coin_inside_v2.png" }
    ],
    description: "This piece was exclusively made for the artist Arkan.",
    details: [
      ["Category", "Business man"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "06",
    sizes: ["S", "M", "L", "XL"],
    tag: "N°10100",
    name: "Demon vest",
    seoTitle: "Demon Vest — Mercenary Clothing Archive | GUNSTAR",
    seoDescription: "Explore the GUNSTAR Demon Vest from the Mercenary division. View photographs of this archived clothing piece. This piece is sold out.",
    purchasable: false,
    price: null,
    category: "Mercenary",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/DSC07666.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/DSC07611.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/DSC07086.jpg" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/DSC07083.jpg" }
    ],
    description: "This piece is sold out, try next time.",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "07",
    tag: "11000",
    name: "Pop star wallpaper",
    seoTitle: "Pop Star Wallpaper | GUNSTAR",
    seoDescription: "Shop the GUNSTAR Pop Star Wallpaper in white or black for €9.90, printed on 200 g/m² paper.",
    purchasable: true,
    price: 990,
    paperWeight: 200,
    sizes: ["WHITE", "BLACK"],
    variantLabel: "Colour",
    category: "Business man",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/popstar_black_red.png", variant: "BLACK" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/popstar_white_red.png", variant: "WHITE" },
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_5675.jpg" }
    ],
    description: "Available in white and black.",
    details: [
      ["Category", "Business man"],
      ["Paper", "200 g/m²"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "08",
    sizes: ["S", "M", "L", "XL"],
    tag: "1000",
    name: "Starboy",
    seoTitle: "Starboy — Hacker Clothing Archive | GUNSTAR",
    seoDescription: "Discover Starboy, an archived GUNSTAR clothing piece from the Hacker division. Explore its visual design. This piece is sold out.",
    purchasable: false,
    price: null,
    category: "Hacker",
    media: [
      { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/starface_copie.png" }
    ],
    description: "This piece is sold out, try next time.",
    details: [
      ["Category", "Hacker"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "09",
    tag: "1001",
    name: "USB DRIVE",
    seoTitle: "USB Drive — Zinc Alloy USB 3.0 | GUNSTAR",
    seoDescription: "Discover the GUNSTAR USB Drive: a zinc alloy USB 3.0 flash drive from the Hacker division, supplied blank with no preloaded files or software.",
    purchasable: true,
    price: 1990,
    sizes: [],
    displayOptions: ["64 Go", "128 Go"],
    category: "Hacker",
    media: [
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_6698.jpg" },
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_6697.jpg" },
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/IMG_6704.jpg" }
],
    description: "Every file matters. Every detail counts. Crafted from durable zinc alloy, the GUNSTAR USB Drive features USB 3.0 technology. <strong>The USB drive is delivered completely blank, with no preloaded files or software.</strong> <strong>Carry the data. Be Awake.</strong>",
    details: [
      ["Category", "Hacker"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
 {
    id: "10",
    tag: "10101",
    name: "GS GLOVES",
    seoTitle: "GS Gloves — Reflective Touchscreen Gloves | GUNSTAR",
    seoDescription: "Discover GUNSTAR GS Gloves: reflective gloves with touchscreen-compatible fingertips and a tactical aesthetic, designed for the Mercenary division.",
    purchasable: true,
    price: 2990,
    sizes: ["M", "L"],
    displayOptions: ["S", "M", "L", "XL"],
    category: "Mercenary",
    media: [
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/29102026-RAW05810.jpg" },
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/29102026-RAW05882.jpg" },
     { type: "photo", src: "https://res.cloudinary.com/iptm1k0x/image/upload/29102026-RAW05941.jpg" }
],
    description: "Built for the Mercenary. Designed for those who operate beyond the ordinary. 88% Polyester / 12% Spandex. Featuring a reflective print and touchscreen-compatible fingertips, the GUNSTAR Gloves combine functionality with a tactical aesthetic. <strong>Stay equipped. Be Awake.</strong>",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  } 
];
