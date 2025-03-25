import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import { useSession } from '../../services/session/ctx';

export default function Details() {

  const { signOut, session } = useSession();

  // Uncomment this to test the sign-out functionality when an api gives 401.
  // useEffect(() => {
  //   setTimeout(() => {
  //     signOut();
  //   }, 3000)
  // }, [])


  return (
    <View>
      <Text>Details</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      />
    </View>
  )
}