import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Config/FirebaseConfig';
import { Button, Divider, FAB, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { FirebaseApp } from 'firebase/app';
import { FlatList } from 'react-native-gesture-handler';
import { Productoscomponent } from './component/Productoscomponent';
import { Nuevocomponent } from './component/Nuevocomponent';

//interfaz producto
interface Producto{
  id:string;
  codigo:string;
  nombreProducto:string;
  descripcion:string;
  precio:number;
  stock:number;
}
export const HomeScreen = () => {
    const [name, setName] = useState<string>(''); 

    //hook capturar y modificar la data del usuario
    const [userData, setUserData] = useState<FirebaseApp| null>(null);

    const [showModalProfile, setShowModalProfile] = useState<boolean>(false); // Use estate Estado del modal para el perfil
    const [showModalProduct,setshowModalProduct] = useState<boolean>(false); // Use estate Estado del modal para el los productos
// hook useState: gestionar productos
const [products, setProducts] = useState<Producto[]>([
  {id:'1',codigo:'12345678',nombreProducto:'teclado',descripcion:'teclado gamer',precio:25,stock:100},
  {id:'1',codigo:'12345678',nombreProducto:'teclado',descripcion:'teclado gamer',precio:25,stock:100}
])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName ?? 'User'); 
            }
        });

        return () => unsubscribe(); 
    }, []);


    //funcion para actualizar la informacion
    const handleUpdateUser= () =>{
      //ocultar modal
      setShowModalProfile(false);
    }
    return (
      <>
        <View style={styles.root}>
            <Text style={styles.welcomeText}>Bienvenid@</Text>
            <Text style={styles.nameText}>{name}</Text>
            <View>
                <IconButton
                    icon="account-edit"
                    size={20}
                    onPress={() => setShowModalProfile(true)} 
                />
            </View>
        </View>
       <View>
       <FlatList
        data={products}
        renderItem={({item}) => <Productoscomponent/>}
        keyExtractor={item => item.id}
      />
       </View>
        <Portal>
            <Modal visible={showModalProfile} onDismiss={() => setShowModalProfile(false)} contentContainerStyle={styles.modalProfile}>
                <Text>Mi perfil</Text>
                <Divider />
                <TextInput
                    mode='outlined'
                    label='Nombre'
                />
                <TextInput
                    mode='outlined'
                    label='Email'
                />
                <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
            </Modal>
        </Portal>
        <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => setshowModalProduct(true)}
  />
  <Nuevocomponent showModalProduct={showModalProduct} setshowModalProduct={setshowModalProduct}/>
      </>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end', 
        padding: 20,
        backgroundColor: '#E2EAF4', 
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200ee', 
        marginBottom: 10, 
    },
    nameText: {
        fontSize: 20,
        color: '#333', 
    },
    modalProfile: {
        paddingHorizontal: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    modal: {
        paddingHorizontal: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    }
});
