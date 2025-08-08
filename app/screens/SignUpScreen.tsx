import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'
import { signUp } from "../../services/auth";


// values for form entry
interface SignUpValues {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

// validation for form entry
const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Pasword must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
})

const SignUpScreen = () => {
  const router = useRouter();
  const handleLogin = async (values: SignUpValues) => {
    try {
      await signUp(
        values.fullName,
        values.userName,
        values.email,
        values.phoneNumber,
        values.password
      );
      router.replace("./ProtectedPage"); // Navigate to home or another screen after signup
    } catch (error) {
      console.error("Sign up error:", error);
      router.replace("./FailedPage")
    }
    

    }

  return (
    <LinearGradient style={styles.container} colors={['#66a8cd', '#efb40b']}>
      <TouchableOpacity style={styles.backButton} onPress={()=> router.replace("/")} >
          <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Formik<SignUpValues>
          initialValues={{
            fullName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
          }}  
          validationSchema={signUpSchema}
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
                placeholder="Full Name"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              {touched.userName && errors.userName && (
                <Text style={styles.error}>{errors.userName}</Text>
              )}
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
                placeholder="Phone Number"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                keyboardType="phone-pad"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
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

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </LinearGradient> 
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: 'center'
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
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
})