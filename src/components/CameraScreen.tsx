import React, {useCallback} from "react"
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import {Camera} from "react-native-vision-camera"
import {useFocusEffect} from "@react-navigation/native"
import {cameraOffIcon, loading, startVideoIcon, stopVideoIcon} from "../icons/icons"
import {useCameraScreen} from "../hooks/hooks"
import {modalException} from "../services/shooting_session_services"
import {startRecording} from "../services/camera_services"

const CameraScreen = ({route}): React.JSX.Element => {

    const {sessionName, userCollection} = route.params
    const {
        navigation,
        device,
        hasPermission,
        requestPermission,
        camera,
        inputRef,
        isActive,
        setIsActive,
        autoUploading,
        setAutoUploading,
        newVideoName,
        setNewVideoName,
        isRecording,
        setIsRecording,
        modalVisible,
        setModalVisible,
        exceptionMessage,
        setExceptionMessage,
        messageColor,
        setMessageColor,
        icon,
        setIcon
    } = useCameraScreen()

    useFocusEffect(
        useCallback(() => {
            if (inputRef.current) inputRef.current.focus()
            setTimeout(() => {
                Alert.alert('Oops', 'Session lasts eight hours!')
            }, 8 * 3600 * 1000)
            Alert.alert(
                'Auto uploading',
                'Do you want to auto uploading videos?',
                [{text: 'No', onPress: () => setAutoUploading(false)},
                    {text: 'Yes', onPress: () => setAutoUploading(true)}]
            )
            if (!hasPermission) {
                requestPermission()
                setIsActive(true)
            }
            if (hasPermission) setIsActive(true)
            return () => {
                if (isRecording) {
                    setIsActive(false)
                    camera.current?.stopRecording()
                }
            }
        }, [hasPermission])
    )

    if (!hasPermission) return <View>{loading}</View>
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {modalVisible && modalException(modalVisible, exceptionMessage, icon, messageColor)}
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    video={true}
                />
                {!isRecording && <TextInput
                    ref={inputRef}
                    style={styles.textInputVideoName}
                    placeholder='video name'
                    value={newVideoName}
                    onChangeText={(text) => setNewVideoName(text)}
                />}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Shooting session', {id: sessionName, userCollection})
                    }}
                    style={styles.backButton}
                >
                    <Text>{cameraOffIcon}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        bottom: 10,
                        width: 60,
                        height: 60,
                        backgroundColor: isRecording ? 'red' : 'gray',
                        opacity: newVideoName ? 1 : 0,
                        borderRadius: 75,
                        borderWidth: 1,
                    }}
                    onPress={() => startRecording(
                        isRecording,
                        setIsRecording,
                        camera,
                        setExceptionMessage,
                        setModalVisible,
                        setMessageColor,
                        setIcon,
                        autoUploading,
                        newVideoName,
                        userCollection,
                        sessionName,
                        setNewVideoName
                    )}
                >
                    <View style={styles.startStopVideoIcon}>
                        {isRecording ? stopVideoIcon : startVideoIcon}
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    backButton: {
        position: "absolute",
        justifyContent: "center",
        alignItems: 'center',
        top: 20,
        left: 20,
        width: 50,
        height: 50,
        backgroundColor: 'grey',
        borderWidth: 1,
        borderRadius: 8
    },
    startStopVideoIcon: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputVideoName: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    }
})

export default CameraScreen