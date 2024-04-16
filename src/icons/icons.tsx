import {ActivityIndicator, StyleSheet} from "react-native"
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    activityIndicator: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const resumeCameraIcon = <Icon name='camera' size={30} color='green'/>
export const uploadVideosIcon = <Icon name='upload-cloud' size={30} color='green'/>
export const shareVideosIcon = <Icon name='share' size={30} color='green'/>
export const discardSessionIcon = <Icon name='x-circle' size={35} color='red'/>
export const signInIcon = <Icon name='log-in' size={30} color='green'/>
export const createUserIcon = <Icon name='user-plus' size={30} color='orange'/>
export const cameraOffIcon = <Icon name="camera-off" size={30} color='red'/>
export const startVideoIcon = <Icon name='video' size={35} color='red'/>
export const stopVideoIcon = <Icon name='video-off' size={35} color='white'/>
export const sessionItemIcon = <Icon name='folder' size={40} color='green'/>
export const addSessionIcon = <Icon name='plus-square' size={30} color='green'/>
export const signOutIcon = <Icon name='log-out' size={30} color='red'/>
export const successfullySignInIcon = <Icon name='check-circle' size={50} color='green'/>
export const exceptionIconFrown = <Icon name='frown' size={50} color='red'/>
export const exceptionIconSmile = <Icon name='smile' size={50} color='green'/>
export const exceptionIconMeh = <Icon name='meh' size={50} color='orange'/>

export const loading = <ActivityIndicator style={styles.activityIndicator} size='large' color="green"/>

