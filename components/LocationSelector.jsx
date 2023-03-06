import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React,{useState} from 'react'
import * as Location from 'expo-location'
import { COLORS } from '../constants'


const LocationSelector = props => {
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
            Alert.alert("permisos insuficientes", "Se necesitan permisos para usar la aplicacion", [{ text: "ok" }])
            return false
        }
        return true

    }

    const handleGetLocation = async () => {
        const isLocationOK = await verifyPermission()
        if (!isLocationOK) return
        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        })
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
        props.onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {pickedLocation ? (<Text>{pickedLocation.lat}, {pickedLocation.lng}</Text>)
                    : (<Text> Esperando ubicacion</Text>)}
            </View>
            <Button title="obtener ubicacion" color={COLORS.PEACH_PUFF} onPress={handleGetLocation} />
        </View>
    )
}


export default LocationSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    preview: {
        widh: '100%',
        marginBottom: 10,
        height: 200,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    }
})