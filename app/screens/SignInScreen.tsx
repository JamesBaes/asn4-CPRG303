import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'
import { login } from "../../services/auth"; // Add this import


// values for form entry
interface SignInValues {
    email: string,
    password: string,
}

// validation for form entry
const signInSchema = Yup.object().shape({
    email: Yup.string().email("Email is Invalid").required("Email is Required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is Required"),
})

const SignInScreen = () => {
    const router = useRouter();
    const handleLogin = async (values: SignInValues) => {
      try {
            await login(values.email, values.password);
            router.replace("./ProtectedPage"); 
      } catch (error) {
            console.error("Sign in error:", error);
            router.replace("./FailedPage");
        }
    }

  return (
    <LinearGradient style={styles.container} colors={['#D4145A', '#6d45d6']}>
      <TouchableOpacity style={styles.backButton} onPress={()=> router.replace("/")} >
          <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Formik<SignInValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity onPress={() => handleSubmit()} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </LinearGradient> 
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
  }, 
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
})