import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { COLORS } from '../constants'

const ImageSelector = (props) => {
    const [pickerUri, setPickerUri] = useState();

    const verifyPermission = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== "granted") {
            Alert.Alert(
                "Permisos insuficientes", " se necesita permisos de la camara para utilziar la aplicacion", [{text:"OK"}]
            )
            return false
        }
        return true
    }

    const handleTakeImage = async () => {
        const isCamaraOK = await verifyPermission()
        if (!isCamaraOK) return
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9 ],
            quality:0.8,
        })
        setPickerUri(image.assets[0].uri)
        props.onImage(image.assets[0].uri)
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickerUri ? (<Text>No hay imagen Seleccionada</Text>) : (<Image source={{ uri: pickerUri }} style={styles.image} />
                )}
            </View>
            <Button title="tomar foto" color={COLORS.LIGTH_PINK} onPress={handleTakeImage} />
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    preview: {
        widh: '100%',
        marginBottom: 10,
        height: 200,
        justifyContent:"center",
        alignItems:'center',
        borderColor:COLORS.BLUSH,
        borderWidth:1,
    },
    image:{
        width:"100%",
        height:'100%'
    }

})