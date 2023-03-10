import * as FileSystem from 'expo-file-system'
import Map from '../constants/Map'
import { inserAddress } from '../db'
import { fetchAddress } from '../db'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACE ='LOAD_PLACE'


export const addPlace = (title, image, location) => {
    //return { type: ADD_PLACE, payload: {title}}
    return async dispatch => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${Map.API_KEY}`
          );

          if (!response.ok) {
             throw new Error('cant this conected with Google Maps API')
          }

          const resData = await response.json()
          if (!resData.results)
          throw new Error(
            "No se han encontrado datos para las coordenadas seleccionadas"
          );
            
          const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName
        try {
            FileSystem.moveAsync({
                from: image,
                to: Path,
            })
            const result = await inserAddress(title, Path, address, location.lat, location.lng);
            console.log(result)
        } catch (err) {
            console.log(err.message)
            throw err
        }
     dispatch({type:ADD_PLACE, 
        payload:{
            title, 
            image: Path, 
            lat: location.lat, 
            lng:location.lng, 
            address}})
    }
}

export const loadAddress =()=>{
    return async dispatch =>{
        try {
            const result = await fetchAddress()
            console.log('Tabla recibida', result)
            dispatch({ type:LOAD_PLACE, places: result.rows._array });
        } catch (err) {
            throw err;
        }
    }
}