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
//   type        "photo" or "video"
//   category    used by the gallery filters
//   src         path to the image or video file
//   description short paragraph for the product page
//   details     array of [label, value] pairs for the fact sheet
// =========================================================

const GUNSTAR_PRODUCTS = [
  {
    id: "01",
    tag: "N°01",
    name: "Look 01",
    type: "photo",
    category: "Mercenary",
    src: "assets/img/etoile_blanche.png",
    description: "A raw, high-contrast still from the Mercenary series, built around GUNSTAR's signature monochrome silhouette.",
    details: [
      ["Category", "Mercenary"],
      ["Format", "Photo"],
      ["Reference", "N°01"]
    ]
  },
  {
    id: "02",
    tag: "N°02",
    name: "1011",
    type: "video",
    category: "Business man",
    src: "assets/video/gunstarhomepage_2.mp4",
    description: "Behind-the-scenes footage from the Business Man shoot, motion and attitude captured in one continuous take.",
    details: [
      ["Category", "Business man"],
      ["Format", "Video"],
      ["Reference", "N°02"]
    ]
  },
  {
    id: "03",
    tag: "N°03",
    name: "1012",
    type: "video",
    category: "Business man",
    src: "assets/video/gunstarhomepage_2.mp4",
    description: "A second angle on the Business Man story, same energy, different frame.",
    details: [
      ["Category", "Business man"],
      ["Format", "Video"],
      ["Reference", "N°03"]
    ]
  },
  {
    id: "04",
    tag: "N°04",
    name: "1101",
    type: "video",
    category: "Hacker",
    src: "assets/video/gunstarhomepage_2.mp4",
    description: "First cut from the Hacker series, low light, sharp lines, GUNSTAR's darker register.",
    details: [
      ["Category", "Hacker"],
      ["Format", "Video"],
      ["Reference", "N°04"]
    ]
  },
  {
    id: "05",
    tag: "N°05",
    name: "1102",
    type: "video",
    category: "Hacker",
    src: "assets/video/gunstarhomepage_2.mp4",
    description: "Second cut from the Hacker series, continuing the same visual language.",
    details: [
      ["Category", "Hacker"],
      ["Format", "Video"],
      ["Reference", "N°05"]
    ]
  },
  {
    id: "06",
    tag: "N°06",
    name: "1001",
    type: "video",
    category: "Mercenary",
    src: "assets/video/gunstarhomepage_2.mp4",
    description: "Closing shot of the Mercenary series, a last look before the drop.",
    details: [
      ["Category", "Mercenary"],
      ["Format", "Video"],
      ["Reference", "N°06"]
    ]
  }
];
