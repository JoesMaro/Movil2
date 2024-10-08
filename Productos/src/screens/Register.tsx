import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { auth } from '../Config/FirebaseConfig';

// Interfaz Registro
interface FormRegister {
  email: string;
  password: string;
}

// Interfaz message snackbar
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const Register = ({ navigation }: any) => { // Añadido el prop navigation
  // Hook para cambiar el formulario 
  const [formRegister, setformRegister] = useState<FormRegister>({
    email: "",
    password: ""
  });

  // Hook para cambiar el estado del mensaje 
  const [showMessage, setshowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff"
  });

  // Funcion para actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformRegister({ ...formRegister, [key]: value });
  }

  // Funcion para registrar a nuevos usuarios 
  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setshowMessage({ visible: true, message: 'Completa todos los campos', color: '#7a0808' });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );

      setshowMessage({
        visible: true,
        message: 'Registro Exitoso',
        color: '#4CAF50' // Color para un mensaje exitoso
      });

      // Navegar al Login o a otra pantalla después del registro exitoso
      navigation.navigate('Login'); // Cambia esto si quieres navegar a otra pantalla

    } catch (error: any) { // Usar 'any' o un tipo más específico si lo conoces
      console.log(error);
      setshowMessage({
        visible: true,
        message: error.message || 'No se pudo completar el registro', // Mensaje específico de error
        color: '#ff0000' // Color para un mensaje de error
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <TextInput
        label="Email"
        mode="outlined"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handleSetValues('email', value)}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escribe tu contraseña"
        onChangeText={(value) => handleSetValues('password', value)}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister}>
        Registrarse
      </Button>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setshowMessage({ ...showMessage, visible: false })}>
        {showMessage.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
  },
});
