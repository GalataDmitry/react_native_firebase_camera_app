import {doc, serverTimestamp, setDoc} from "firebase/firestore"
import {firestore} from "../../firebase"
import {exceptionIconFrown} from "../icons/icons"

export const addSession = async (
    userCollection,
    sessionName,
    setSessionName,
    setMessageColor,
    setIcon,
    setExceptionMessage,
    setModalVisible,
    navigation) => {

    try {
        const timeStamp = serverTimestamp()
        const sessionRef = await doc(firestore, userCollection, sessionName)
        setDoc(sessionRef, {createdAt: timeStamp})
            .then(() => {
                setSessionName('')
                navigation.navigate('Camera', {sessionName, userCollection})
            })
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Session didn\'t create.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }

}