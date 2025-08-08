import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const FailedPage = () => {
    const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>An error occurred. Press<Pressable onPress={() => router.replace("/")}>Here</Pressable> to return.</Text>
    </View>
  )
}

export default FailedPage

const styles = StyleSheet.create({})