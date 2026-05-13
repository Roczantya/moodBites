import { Colors } from "./colors";

export interface FoodItem {
  id: string;
  name: string;
  moodTag: string;
  tagColor: string;
  tagTextColor: string;
  image: string;
}

export const FOOD_DATA = [
  {
    id: "1",
    name: "Ayam Rica-Rica",
    moodTag: "Stres",
    tagColor: Colors.third,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Cah Kangkung",
    moodTag: "Bahagia",
    tagColor: Colors.third,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Bebek Dangkot",
    moodTag: "Lapar",
    tagColor: Colors.third,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Ayam Goreng",
    moodTag: "Santai",
    tagColor: Colors.third,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&w=300&q=80",
  },
];
