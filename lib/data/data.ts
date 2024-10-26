import {Review} from "../types";

export const reviews: Review[] = [
  {
    review:
      "Shooreshi Rugs has the most beautiful and high-quality rugs I've ever seen. The craftsmanship is exceptional!",
    name: "Alice Johnson",
    rate: 5
  },
  {
    review:
      "I am thrilled with my purchase from Shooreshi Rugs. The colors and patterns are even more stunning in person.",
    name: "Bob Smith",
    rate: 5
  },
  {
    review:
      "The service at Shooreshi Rugs was fantastic. They helped me choose the perfect rug for my living room.",
    name: "Charlie Davis",
    rate: 5
  },
  {
    review:
      "Shooreshi Rugs offers an amazing selection of rugs. The one I bought transformed the look of my home!",
    name: "Diana Wilson",
    rate: 5
  },
  {
    review:
      "I'm so happy with my rug from Shooreshi Rugs. It's incredibly soft and well-made. Highly recommend!",
    name: "Ethan Martinez",
    rate: 5
  },
  {
    review:
      "The quality of the rugs at Shooreshi Rugs is unmatched. I couldn't be more pleased with my purchase.",
    name: "Fiona Brown",
    rate: 5
  },
  {
    review:
      "Shooreshi Rugs provided excellent customer service and a top-notch product. My new rug is a work of art.",
    name: "George Clark",
    rate: 5
  },
  {
    review:
      "I love my new rug from Shooreshi Rugs! It's the perfect addition to my home decor, and the quality is outstanding.",
    name: "Hannah Garcia",
    rate: 5
  }
];

export const rugSizes = [
  {
    name: "Small",
    link: "/rugs?maxWidth=120&maxLength=170&sortBy=newest",
    image: "/rug-sizes/small-rug.webp"
  },
  {
    name: "Medium",
    link: "/rugs?maxWidth=190&maxLength=290&sortBy=newest",
    image: "/rug-sizes/medium-rug.webp"
  },
  {
    name: "Large",
    link: "/rugs?maxWidth=320&maxLength=430&sortBy=newest",
    image: "/rug-sizes/large-rug.webp"
  },
  {
    name: "ExtraLarge",
    link: "/rugs?maxWidth=320&maxLength=430&sortBy=newest",
    image: "/rug-sizes/extra-large-rug.webp"
  },
  {
    name: "Runners",
    link: "/rugs?maxWidth=200&maxLength=1000&sortBy=newest",
    image: "/rug-sizes/runners-rug.webp"
  }
];

const MaximumRugWidth = "500";
const MaximumRugLength = "1000";
const SliderStep = 50;

export {MaximumRugLength, MaximumRugWidth, SliderStep};
