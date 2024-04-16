import {inMemoryPersistence, setPersistence} from "firebase/auth"
import {Alert} from "react-native"
import {firebase_auth} from "../../firebase"

export const signInAndCreate = (emailPassword, setVisibleAuthComponent, setModalVisible, setEmailPassword, navigation, action) => {
    setPersistence(firebase_auth, inMemoryPersistence).then(async () => {
        await action(firebase_auth, emailPassword.email, emailPassword.password)
        setVisibleAuthComponent(false)
        setModalVisible(true)
        setEmailPassword({email: '', password: ''})
        setTimeout(() => navigation.navigate('Shooting sessions', {userCollection: emailPassword.email}), 1000)
    }).catch(() => {
        setEmailPassword({email: '', password: ''})
        Alert.alert('Oops', 'Enter correct credentials')
    })
}