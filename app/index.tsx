import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'


const LandingPage = () => {
  const router = useRouter();

  return (
    <LinearGradient
      style={styles.container}
      colors={['#ff0000', '#1a366d']}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to *AppName*  </Text>

        <TouchableOpacity
          onPress={() => router.push("/screens/EmployeeForm")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Employee Information Form</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/screens/SignInScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/screens/SignUpScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default LandingPage

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})