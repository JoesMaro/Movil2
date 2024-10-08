import React from 'react';
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import {  View, StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';
interface Props{
  showModalProduct:boolean;
  setshowModalProduct:Function;
}

//interface formProduct
interface formProduct{
  codigo:string;
  nombreProducto:string;
  precio:number;
  stock:number;
  descripcion:string;
}

export const Nuevocomponent = ({showModalProduct,setshowModalProduct}: Props) => {

  //hook para cmabiar el estado de los productos
   const [formProduct, setFormProduct] = useState<formProduct>({
    codigo:'',
    nombreProducto:'',
    precio:0,
    stock:0,
    descripcion:''

   });
   
// Interfaz message snackbar
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}
  // Hook para cambiar el estado del mensaje 
  const [showMessage, setshowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff"
  });

   //funcion para actualizar el estado del formulario 
   const handleSetValues=(key:string,value:string)=>{
    setFormProduct ({...formProduct,[key]: value});
   }

   //funcion agregar productos 
   const handleSaveProduct= ()=>{
    if (!formProduct.codigo ||!formProduct.nombreProducto|| !formProduct.precio||!formProduct.stock||!formProduct.descripcion ) {
      setshowMessage({
        visible:true,
        message:'Completa todos los campos',
        color:'#7a0808'
      })
      return;
    }
    console.log(formProduct);
   }
  return (
    <>
    <Portal>
        <Modal visible={showModalProduct}  contentContainerStyle={styles.modalContainer}>
         <View>
          <Text variant='headlineSmall'>Nuevo Producto</Text>
          <IconButton icon='close-circle-outline' size={30} onPress={()=>setshowModalProduct(false)}></IconButton>
         </View>
         <Divider/>
         <TextInput
         label='Codigo'
         mode='outlined'
         onChangeText={(value)=> handleSetValues('codigo',value)}
         />
         <TextInput
         label='Nombre'
         mode='outlined'
         onChangeText={(value)=> handleSetValues('nombreProducto',value)}
         />
         <TextInput
         label='Precio'
         mode='outlined'
         keyboardType='numeric'
         onChangeText={(value)=> handleSetValues('precio',value)}
         style={{width:'45%'}}
         />
         <TextInput
         label='Stock'
         mode='outlined'
         keyboardType='numeric'
         onChangeText={(value)=> handleSetValues('stock',value)}
         style={{width:'45%'}}
         />
         <TextInput
         label='Descripcion'
         mode='outlined'
         numberOfLines={3}
         onChangeText={(value)=> handleSetValues('descripcion',value)}/>
         <Button mode='contained' onPress={handleSaveProduct}>Agregar</Button>
         
        </Modal>
      </Portal>
       <Snackbar
       visible={showMessage.visible}
       onDismiss={() => setshowMessage({ ...showMessage, visible: false })}>
       {showMessage.message}
     </Snackbar>
     </>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffffff',  
    padding: 20,
    margin: 20,  
    borderRadius: 10,  
    elevation: 5,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    alignItems: 'center',  
  },
  text: {
    fontSize: 16,
    color: '#333',  
    textAlign: 'center',  
  },
});