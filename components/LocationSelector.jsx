import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import * as Location from 'expo-location'
import { COLORS } from '../constants'
import MapPreview from "./MapPreview";
import { useNavigation } from "@react-navigation/native";


const LocationSelector = props => {
    const navigation = useNavigation();
    const [pickedLocation, setPickedLocation] = useState()


 
    useEffect(() => {
        if (props.mapLocation) {
            setPickedLocation(props.mapLocation)
            props.onLocation(props.mapLocation)
      }
    }, [props.mapLocation])
    

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
    };

    
  const handlePickOnMap =  () => {
    const isLocationOK = verifyPermission()
    if (!isLocationOK) return
    navigation.navigate("Map");
  };


    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
        <Text> Location en proceso...</Text>
      </MapPreview>
      <View  style={styles.actions}>
            <Button title="obtener ubicacion" color={COLORS.PEACH_PUFF} onPress={handleGetLocation} />
            <Button title="Elegir del mapa" color={COLORS.PEACH_PUFF} onPress={handlePickOnMap} />
            </View>
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
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
      },
})