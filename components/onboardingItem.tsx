// File: moodBites/components/onboardingItem.tsx
import { View, Image, StyleSheet } from 'react-native';
import Button from '@/components/ui/button';
import { TextRegular, TextBold } from '@/components/ui/customFont';

type Props = {
  image: any;
  title: string;
  description: string;
  backgroundColor: string;
  onNext: () => void;
  isLast: boolean;
};

export default function OnboardingItem({
  image,
  title,
  description,
  backgroundColor,
  onNext,
  isLast,
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={image} style={styles.image} />

      <TextBold style={styles.title}>{title}</TextBold>
      <TextRegular style={styles.desc}>{description}</TextRegular>

      <Button
        label={isLast ? 'Mulai' : 'Next'}
        onPress={onNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
  desc: {
    fontSize: 20,
    color: '#555',
    marginBottom: 50
  },
});