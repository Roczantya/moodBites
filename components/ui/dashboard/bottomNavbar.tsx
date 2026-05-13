import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { router } from "expo-router";

export default function BottomNavBar() {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {/* Beranda Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push("/dashboard/home")}
        >
          <Ionicons name="home" size={24} color={Colors.optionalAccent} />
          <Text style={styles.tabText}>BERANDA</Text>
        </TouchableOpacity>

        {/* NFC Center Button */}
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => router.push("/dashboard/nfc")}
          >
            <MaterialCommunityIcons
              name="contactless-payment-circle-outline"
              size={28}
              color={Colors.white}
            />
            <Text style={styles.nfcText}>NFC</Text>
          </TouchableOpacity>
        </View>

        {/* Profil Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push("/dashboard/profil")}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={Colors.optionalAccent}
          />
          <Text style={styles.tabText}>PROFIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFF7E8",
    width: "75%",
    height: 70,
    borderRadius: 40,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#FBE6E6", // Outline tipis
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.optionalAccent,
    marginTop: 4,
  },
  centerButtonWrapper: {
    position: "absolute",
    left: "50%",
    marginLeft: -15, // Menyesuaikan agar tepat di tengah
    top: -25,
    alignItems: "center",
  },
  centerButton: {
    backgroundColor: Colors.accent,
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  nfcText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
});
