export interface SurveyMoodData {
  userId: string;
  mood: "Senang" | "Sedih" | "Marah" | "Netral" | "Stress";
  preferences: string[];
}
