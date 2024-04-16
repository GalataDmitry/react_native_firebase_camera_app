import React, {useCallback} from "react"
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useFocusEffect} from "@react-navigation/native"
import {resumeCameraIcon} from "../icons/icons"
import {useCreateSessionScreen} from "../hooks/hooks"
import {addSession} from "../services/create_session_services"
import {modalException} from "../services/shooting_session_services";

const CreateSessionScreen = ({route}): React.JSX.Element => {

    const {userCollection} = route.params
    const {
        navigation,
        sessionName,
        setSessionName,
        inputRef,
        exceptionMessage,
        setExceptionMessage,
        messageColor,
        setMessageColor,
        icon,
        setIcon,
        modalVisible,
        setModalVisible
    } = useCreateSessionScreen()

    useFocusEffect(
        useCallback(() => {
            inputRef.current.focus()
        }, [])
    )

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {modalVisible && modalException(modalVisible, exceptionMessage, icon, messageColor)}
                <TextInput
                    ref={inputRef}
                    style={styles.textInputSessionName}
                    placeholder='session name'
                    value={sessionName}
                    onChangeText={(text) => setSessionName(text)}
                />
                <TouchableOpacity
                    style={styles.startSessionButton}
                    onPress={() => {
                        addSession(
                            userCollection,
                            sessionName,
                            setSessionName,
                            setMessageColor,
                            setIcon,
                            setExceptionMessage,
                            setModalVisible,
                            navigation
                        )
                    }}
                >
                    <Text>{resumeCameraIcon}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    textInputSessionName: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    startSessionButton: {
        position: 'absolute',
        bottom: 40,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1
    }
})

export default CreateSessionScreen