import { Redirect, Stack } from 'expo-router';

import { useSession } from '../ctx';
import { Text } from '@/components/Themed';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  // You can keep the splash screen open, or render a loading screen like we do here.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="cart" options={{ presentation: 'containedModal' }} />
    </Stack>
  )
}
