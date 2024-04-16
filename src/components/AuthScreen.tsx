import React, {useCallback} from "react"
import {useFocusEffect} from '@react-navigation/native'
import {
    SafeAreaView,
    StatusBar,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal, StyleSheet
} from "react-native"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {createUserIcon, signInIcon, successfullySignInIcon} from "../icons/icons"
import {signInAndCreate} from "../services/auth_services"
import {useSignInScreen} from "../hooks/hooks"

const AuthScreen = ():React.JSX.Element => {

    const {
        navigation,
        modalVisible,
        setModalVisible,
        visibleAuthComponent,
        setVisibleAuthComponent,
        emailPassword,
        setEmailPassword,
        inputRef,
        isDarkMode,
        backgroundStyle
    } = useSignInScreen()

    useFocusEffect(
        useCallback(() => {
            inputRef.current.focus()
            return () => {
                setModalVisible(false)
                setVisibleAuthComponent(true)
            }
        }, [])
    )

    return (
        <SafeAreaView>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    {successfullySignInIcon}
                    <Text>Successfully signIn</Text>
                </View>
            </Modal>
            {visibleAuthComponent &&
            (<View style={styles.mainContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.textInputEmail}
                    placeholder='email'
                    value={emailPassword.email}
                    onChangeText={(text) => setEmailPassword((prev) => ({...prev, email: text}))}
                />
                <TextInput
                    style={styles.textInputPassword}
                    placeholder='password'
                    value={emailPassword.password}
                    secureTextEntry={true}
                    onChangeText={(text) => setEmailPassword((prev) => ({...prev, password: text}))}
                />
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => signInAndCreate(
                        emailPassword,
                        setVisibleAuthComponent,
                        setModalVisible,
                        setEmailPassword,
                        navigation,
                        signInWithEmailAndPassword
                    )}
                >
                    <Text>{signInIcon}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.createUserButton}
                    onPress={() => signInAndCreate(
                        emailPassword,
                        setVisibleAuthComponent,
                        setModalVisible,
                        setEmailPassword,
                        navigation,
                        createUserWithEmailAndPassword
                    )}
                >
                    <Text>{createUserIcon}</Text>
                </TouchableOpacity>
            </View>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
    },
    textInputEmail: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    textInputPassword: {
        marginTop: 10,
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    signInButton: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1
    },
    createUserButton: {
        position: 'absolute',
        bottom: 40,
        right: 10,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1
    },
    modal: {
        position: "absolute",
        top: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'green',
        backgroundColor: 'white'
    }
})

export default AuthScreen