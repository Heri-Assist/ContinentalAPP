import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { Card } from '@rneui/themed';
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import { Usuario } from '../interfaces/Login';
import { Style } from '../theme/dashboardCSS';


const usuario= {
    "id_usuario": "2798",
    "nombre": "ALEXANDER VELASQUEZ",
    "nacimiento": "1983-Ago-17",
    "email": "HVHVALENCIA3@GMAIL.COM",
    "avatar": '../../assets/imagenes/bg-02.jpg',
    "telefonos": [
        {
            "id": "4318",
            "id_usuario": "2798",
            "pais_name": "",
            "pais_callingCode": "57",
            "telefono": "3017864123",
            "pais_flag": "col.png"
        }
    ]
}

const image = require('../../assets/imagenes/userAvatar.png');

export const MiCuentaScreen = () => {
  

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>  
            <View style={{position:'absolute', top:30, left:30, zIndex:999}}>
                <Image
                    source={ image }
                    style={
                        { 
                            width: 150, 
                            height: 150, 
                            borderRadius: 150, 
                            borderWidth: 3, 
                            borderColor: '#fff',  
                           
                        }}
                />
            </View>
              
            <Card containerStyle={{ borderRadius: 20, marginTop:110, paddingTop:110 }}>
            
                <Text>{usuario.nombre}</Text>
                <Card.Divider />

                <TouchableOpacity onPress={showModal}>
                    <Text>Editar</Text>
                </TouchableOpacity>

                {/* Resto de la información del usuario */}
            </Card>

            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{}}>
                        <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    </Modal>
                </Portal>
                <Button style={{marginTop: 30}} onPress={showModal}>
                     Show
                </Button>
            </PaperProvider>
        </>
        
    );
};

