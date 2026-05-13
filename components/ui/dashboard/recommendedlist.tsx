import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/colors";

const FOOD_DATA = [
  {
    id: "1",
    name: "Ayam Rica-Rica",
    moodTag: "Stres",
    tagColor: Colors.primary,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80", // Placeholder
  },
  {
    id: "2",
    name: "Cah Kangkung",
    moodTag: "Bahagia",
    tagColor: Colors.primary,
    tagTextColor: Colors.textPrimary,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80", // Placeholder
  },
];

export default function RecommendationList() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommendations for{"\n"}your Mood</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View{"\n"}All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        Fuel your energy with vibrant{"\n"}nutrients
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {FOOD_DATA.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
              <Text style={[styles.tagText, { color: item.tagTextColor }]}>
                {item.moodTag}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 100, // Memberi ruang untuk bottom nav
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.optionalAccent,
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textPrimary,
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 20,
  },
  listContainer: {
    paddingLeft: 24,
  },
  card: {
    backgroundColor: "#FFEDD5", // Card background color matching the design
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    width: 160,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.optionalAccent,
    marginBottom: 8,
  },
  tag: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
