import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { addEmployee } from '@/services/auth'

interface EmployeeFormValues {
  name: string,
  email: string,
  phone: string,
  address: string,
  startDate: string
}

const employeeFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),

  address: Yup.string()
    .matches(/[\w\.\-\s\,]{5,}$/, "Must be a valid Address")
    .required("Address is required"),

  startDate: Yup.string()
    .matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, "Must be in the Correct Format (YYYY-MM-DD)")
    .required("A Start Date is required")
});

const EmployeeForm = () => {
  const router = useRouter();

  const handleSubmit = async (values: EmployeeFormValues) => {
    try {
      await addEmployee(
        values.name,
        values.email,
        values.phone,
        values.address,
        values.startDate
      );
      router.replace("./ProtectedPage");
    } catch (error) {
      console.error("Add employee error:", error);
      router.replace("./");
      
    }
  }

  return (
    <LinearGradient style={styles.container} colors={['#D4145A', '#FBB03B']}>
        <TouchableOpacity style={styles.backButton} onPress={()=> router.replace("/")} >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Employee Information</Text>
          <Formik<EmployeeFormValues>
            initialValues={{ name: "", email: '', phone: '', address: '', startDate: '' }}
            validationSchema={employeeFormSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                {/* Name */}
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                {/* Email */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                {/* Phone */}
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                {/* Address */}
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />
                {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

                {/* Start Date */}
                <TextInput
                  style={styles.input}
                  placeholder="Start Date (YYYY-MM-DD)"
                  onChangeText={handleChange("startDate")}
                  onBlur={handleBlur("startDate")}
                  value={values.startDate}
                />
                {touched.startDate && errors.startDate && <Text style={styles.error}>{errors.startDate}</Text>}

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
    </LinearGradient>
  )
}

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: 'center'
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
});
