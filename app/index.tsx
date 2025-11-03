import { Redirect } from 'expo-router';

// Redirect to the main tabs when app starts
export default function HomeScreen() {
  return <Redirect href="/(tabs)/map" />;
}