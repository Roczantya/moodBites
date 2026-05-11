import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert, // FIX 1: Jangan lupa import Alert
} from "react-native";
import { LikertScale } from "../../components/ui/Skalasurvey";
import { CheckboxGroup } from "../../components/ui/checkbox";
import {
  MoodKey,
  DataType,
  Responses,
  MoodSection,
} from "../../constants/surveystate";
import { MOOD_SECTIONS, FLAVORS, MENU_CATEGORIES } from "../../constants/mood";
import { Colors } from "../../constants/colors";
import { router } from "expo-router";

export default function MoodSurveyScreen() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [responses, setResponses] = useState<Responses>({
    moods: {
      sad: { desire: {}, intensity: {}, categories: [] },
      angry: { desire: {}, intensity: {}, categories: [] },
      fearful: { desire: {}, intensity: {}, categories: [] },
      happy: { desire: {}, intensity: {}, categories: [] },
      neutral: { desire: {}, intensity: {}, categories: [] },
      surprised: { desire: {}, intensity: {}, categories: [] },
      disgusted: { desire: {}, intensity: {}, categories: [] },
    },
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  }, [currentStep]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Toast hilang otomatis setelah 3 detik
  };
  const handleMoodChange = (
    moodKey: MoodKey,
    type: DataType,
    flavorOrCat: string | null,
    value: number | string[],
  ) => {
    setResponses((prev) => {
      const updatedMood = { ...prev.moods[moodKey] };

      if (type === "categories") {
        updatedMood.categories = value as string[];
      } else {
        updatedMood[type] = {
          ...updatedMood[type],
          [flavorOrCat as string]: value as number,
        };
      }

      return {
        ...prev,
        moods: { ...prev.moods, [moodKey]: updatedMood },
      };
    });
  };

  // --- FIX 2: Fungsi Validasi (Trigger Wajib Isi) ---
  const validateAndProceed = (isSubmit: boolean = false) => {
    const moodInfo = MOOD_SECTIONS[currentStep];
    const moodData = responses.moods[moodInfo.key];

    // Cek apakah 5 Desire diisi
    const isDesireFilled = FLAVORS.every(
      (f) => moodData.desire[f] !== undefined && moodData.desire[f] > 0,
    );
    // Cek apakah 5 Intensity diisi
    const isIntensityFilled = FLAVORS.every(
      (f) => moodData.intensity[f] !== undefined && moodData.intensity[f] > 0,
    );
    // Cek apakah minimal 1 kategori dipilih
    const isCategoryFilled = moodData.categories.length > 0;

    // Jika ada yang bolong, munculkan Alert dan tolak pindah step
    if (!isDesireFilled || !isIntensityFilled || !isCategoryFilled) {
      showToast(
        "Harap isi semua skala (1-5) dan minimal 1 kategori menu ya! 😅",
      );
      return;
    }

    // Jika lolos validasi
    if (isSubmit) {
      console.log("Payload siap kirim:", JSON.stringify(responses, null, 2));
      Alert.alert("Sukses!", "Data survey berhasil disubmit!");
      // Tambahkan router.replace('/dashboard') di sini kalau mau pindah layar
      router.replace("/auth");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const moodInfo = MOOD_SECTIONS[currentStep];
  const moodData = responses.moods[moodInfo.key];

  const progressPercentage = ((
    ((currentStep + 1) / MOOD_SECTIONS.length) *
    100
  ).toFixed(2) + "%") as any;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step {currentStep + 1} of 7</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: progressPercentage }]}
          />
        </View>
      </View>

      <ScrollView ref={scrollViewRef} style={{ flex: 1, padding: 20 }}>
        <Text style={styles.header}>{moodInfo.title}</Text>
        <Text style={styles.desc}>{moodInfo.desc}</Text>

        <Text style={styles.subHeader}>
          Seberapa PENGEN kamu dengan rasa berikut?
        </Text>
        {FLAVORS.map((flavor) => (
          <LikertScale
            key={`desire-${flavor}`}
            label={flavor}
            minLabel="Sangat Tidak"
            maxLabel="Pengen Banget"
            // FIX 3: Ganti || 3 menjadi || 0 agar slider kosong di awal
            value={moodData.desire[flavor] || 0}
            onChange={(val: number) =>
              handleMoodChange(moodInfo.key, "desire", flavor, val)
            }
          />
        ))}

        <Text style={[styles.subHeader, { marginTop: 25 }]}>
          Seberapa KUAT intensitas rasanya?
        </Text>
        {FLAVORS.map((flavor) => (
          <LikertScale
            key={`int-${flavor}`}
            label={`Tingkat ${flavor.split(" /")[0]}`}
            minLabel="Sangat Ringan"
            maxLabel="Sangat Kuat"
            // FIX 4: Ganti || 3 menjadi || 0 agar slider kosong di awal
            value={moodData.intensity[flavor] || 0}
            onChange={(val: number) =>
              handleMoodChange(moodInfo.key, "intensity", flavor, val)
            }
          />
        ))}

        <Text style={[styles.subHeader, { marginTop: 25 }]}>
          Pilih kategori menu (Bisa {">"} 1)
        </Text>
        <CheckboxGroup
          options={MENU_CATEGORIES}
          selectedValues={moodData.categories}
          onChange={(val: string[]) =>
            handleMoodChange(moodInfo.key, "categories", null, val)
          }
        />
        {toastMessage && (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}
        <View style={styles.navRow}>
          {currentStep > 0 ? (
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => setCurrentStep((prev) => prev - 1)}
            >
              <Text style={styles.btnOutlineText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={[styles.btnOutline, { opacity: 0 }]}
              pointerEvents="none"
            >
              <Text style={styles.btnOutlineText}>Back</Text>
            </View>
          )}

          {currentStep < 6 ? (
            <TouchableOpacity
              style={styles.btnSolid}
              // FIX 5: Gunakan fungsi validasi saat tombol Next ditekan
              onPress={() => validateAndProceed(false)}
            >
              <Text style={styles.btnSolidText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnSubmit}
              // FIX 6: Gunakan fungsi validasi saat tombol Submit ditekan
              onPress={() => validateAndProceed(true)}
            >
              <Text style={styles.btnSolidText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// ... (Styles-nya biarkan persis seperti yang Kanda miliki sebelumnya)
const styles = StyleSheet.create({
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: Colors.primary,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.textPrimary,
  },
  desc: { fontSize: 16, marginBottom: 25, color: Colors.textSecondary },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.textAccent,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  btnOutline: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textAccent,
    backgroundColor: Colors.white,
  },
  toastContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: Colors.optionalAccent + "CC", // Warna merah bata/pink gelap sesuai tema Kanda
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999, // Supaya tampil paling depan menutupi semuanya
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  toastText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnOutlineText: {
    color: Colors.textAccent,
    fontWeight: "bold",
    fontSize: 16,
  },
  btnSolid: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  btnSubmit: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    backgroundColor: Colors.optionalAccent,
  },
  btnSolidText: { color: Colors.white, fontWeight: "bold", fontSize: 16 },
});
