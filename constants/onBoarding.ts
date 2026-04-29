import { Colors } from "./colors";

export const onboardingData = [
  {
    id: "1",
    title: "Lagi bad mood? Kamu nggak sendirian",
    description:
      "Mood bisa memengaruhi pola makanmu setiap hari kadang makan berlebihan, kadang malah lupa makan.",
    image: require("../assets/images/onboarding1.png"),
    backgroundColor: "#FFF5E4",
  },
  {
    id: "2",
    title: "Kenali mood, atur makananmu",
    description:
      "MoodBites bantu kamu mencatat suasana hati dan memberikan rekomendasi makanan yang sesuai dengan kondisimu.",
    image: require("../assets/images/onboarding2.png"),
    backgroundColor: Colors.secondary,
  },
  {
    id: "3",
    title: "Hidup lebih seimbang, mulai dari hari ini",
    description:
      "Bangun kebiasaan makan yang lebih sehat dan jaga mood kamu tetap stabil setiap hari.",
    image: require("../assets/images/onboarding3.png"),
    backgroundColor: "#FFF5E4",
  },
];
