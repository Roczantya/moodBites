import { render, fireEvent } from "@testing-library/react-native";
import AuthScreen from "../app/Auth/index";

test('ketika klik Register, teks tombol harus berubah jadi "Join the Hearth"', () => {
  const { getByText } = render(<AuthScreen />);

  // Klik tombol Register
  fireEvent.press(getByText("Login"));

  // Kita BERHARAP ada tombol dengan teks baru
  expect(getByText("Join the Hearth")).toBeTruthy();
});
