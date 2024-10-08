import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/FirebaseConfig';
import { Button, Text, TextInput } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native';

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate("MyTabs");
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    };

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Iniciar Sesion</Text>
            <TextInput
                label="Correo"
                mode='outlined'
                placeholder='Ingrese su Correo'
                keyboardType='email-address'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input} // Estilo para el input de Email
            />
            <TextInput
            label="Contraseña"
                mode="outlined"
                
                placeholder="Ingrese su Contraseña"
                value={password}
                secureTextEntry={hiddenPassword}
                onChangeText={text => setPassword(text)}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                style={styles.input} // Estilo para el input de Contraseña
            />
            <Button icon="account" mode="contained" onPress={login} style={styles.button}>
                Iniciar sesión
            </Button>
            <Button icon="account-plus" mode="contained" onPress={() => navigation.navigate('Registro')} style={styles.button}>
                Registrate
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 20,
        backgroundColor: '#E2EAF4', 
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000', 
        marginBottom: 20, 
    },
    input: {
        width: '100%',
        marginBottom: 10, 
        backgroundColor: '#ffffff', 
        borderColor: '#E2EAF4', 
    },
    button: {
        width: '100%', 
        marginBottom: 10, 
        backgroundColor: '#7DDA58', 
    },
});
