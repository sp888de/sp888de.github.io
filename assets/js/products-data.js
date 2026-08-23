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
    category: "None",
    media: [
      { type: "photo", src: "assets/img/etoile_blanche.png" }
    ],
    description: "Congratulations. Curiosity brought you into the archive. Three divisions operate inside GUNSTAR: Mercenary, Business man and Hacker. Each division controls a classified clothing series and a binary protocol: Mercenary => 101, Business man => 110, Hacker => 100. Stay alert. Be awake.",
    details: [
      ["Category", "Knowledge"]
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "02",
    tag: "N°1010",
    name: "SNIPER",
    category: "Mercenary",
    media: [
      { type: "photo", src: "assets/img/sniper/P7291258.jpg" },
      { type: "photo", src: "assets/img/sniper/P7291260.jpg" },
      { type: "photo", src: "assets/img/sniper/P7291155.jpg" },
      { type: "video", src: "assets/video/snipervid.mp4" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy. A field asset from the Mercenary division, engineered around precision, distance and controlled impact.",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "03",
    tag: "N°1011",
    name: "Mechagirl",
    category: "Mercenary",
    media: [
      { type: "photo", src: "assets/img/mechagirl/P7291167.jpg" },
      { type: "photo", src: "assets/img/mechagirl/P7291170.jpg" },
      { type: "photo", src: "assets/img/mechagirl/P7291255.jpg" },
      { type: "photo", src: "assets/img/mechagirl/P7291158.jpg" },
      { type: "photo", src: "assets/img/mechagirl/P7291250.jpg" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy. A second classified entry from the Mercenary division. Same command structure, different operative profile.",
    details: [
      ["Category", "Mercenary"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "04",
    tag: "N°1100",
    name: "BOGO",
    category: "Business man",
    media: [
      { type: "photo", src: "assets/img/babytee/0D04D802-1D4B-4A74-8B21-775653399C15_1_102_o.jpeg" },
      { type: "photo", src: "assets/img/babytee/30804994-2478-4A84-8C51-87FD69D9662E_1_102_o.jpeg" },
      { type: "video", src: "assets/img/babytee/IMG_4417.mp4" },
      { type: "video", src: "assets/img/babytee/bc4eda649d234d3c845555c94d6b5ea6.mp4" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy. An asset from the Business man division: controlled presence, private access and silent leverage.",
    details: [
      ["Category", "Business man"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "05",
    tag: "N°1101",
    name: "INSERT COIN",
    category: "Business man",
    media: [
      { type: "photo", src: "assets/img/arkan_insert_coin/IMG_3697.jpeg" },
      { type: "photo", src: "assets/img/arkan_insert_coin/8091D81E-BF93-41DB-ADD6-1CE79032783A.jpeg" },
      { type: "photo", src: "assets/img/arkan_insert_coin/4F2304B1-1725-4937-A1F5-00C4966709A8.jpeg" },
      { type: "photo", src: "assets/img/arkan_insert_coin/2FE51D00-C24C-4C75-BEDE-DBB7AEC4BE05.jpeg" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy. The second Business man file. Capital, influence and discretion encoded into the same visual system.",
    details: [
      ["Category", "Business man"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "06",
    tag: "N°10100",
    name: "Demon vest",
    category: "Mercenary",
    media: [
      { type: "photo", src: "assets/img/demonvest/gunstar_test.png" },
      { type: "photo", src: "assets/img/demonvest/DSC07597.jpg" },
      { type: "photo", src: "assets/img/demonvest/DSC07666.jpg" },
      { type: "photo", src: "assets/img/demonvest/027826A9-8270-4E91-AEFC-1C23A57866BD_1_105_c.jpeg" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy.",
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
    category: "Business man",
    media: [
      { type: "photo", src: "assets/img/pop_star_wallpaper/29B29B0F-B199-42C5-8F34-66A8E97BBD47_1_102_o.jpeg" },
      { type: "photo", src: "assets/img/pop_star_wallpaper/AB676C5E-57C5-42B4-AFAD-664D34532DB0_1_102_o.jpeg" },
      { type: "photo", src: "assets/img/pop_star_wallpaper/67D1B77A-A1FF-4EEA-8BBD-A74CB02AD0B0.jpeg" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy. The first recovered file from the Hacker division: low light, corrupted signals and unauthorized access.",
    details: [
      ["Category", "Business man"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "08",
    tag: "1000",
    name: "Starboy",
    category: "Hacker",
    media: [
      { type: "photo", src: "assets/img/starboy/7403F916-C927-481F-96BD-4E784FC2D07C.png" },
      { type: "photo", src: "assets/img/starboy/3D484495-8E69-4FE0-9083-61F8CA46FA90.jpeg" }
    ],
    description: "This piece is not for sale here, place an enquiry if you would like to buy.",
    details: [
      ["Category", "Hacker"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  },
  {
    id: "09",
    tag: "1001",
    name: "USB KEY",
    category: "Hacker",
   media: [
  { type: "photo", src: "assets/img/etoile_blanche.png" }
],
    description: "This piece is not for sale here, place an enquiry if you would like to buy.",
    details: [
      ["Category", "Hacker"],
    ],
    delivery: "Contact us at contact@gunstar.world for more information.",
    terms: "By submitting an enquiry you agree to be contacted by GUNSTAR about this piece. Usage rights are discussed and confirmed individually."
  }
];
