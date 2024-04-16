import {collection, getDocs} from "firebase/firestore"
import {signOut} from "firebase/auth"
import {firebase_auth, firestore} from "../../firebase"
import {exceptionIconFrown} from "../icons/icons"

export const fetchSessions = async (userCollection, setSessions, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    try {
        const snap = await getDocs(collection(firestore, userCollection))
        const sessions = snap.docs.map(doc => {
            const data = {...doc.data()}
            return {name: doc.id, sortId: data?.createdAt?.seconds, count: Object.keys(data).length - 1}
        })
        setSessions(sessions.sort((a, b) => b.sortId - a.sortId))
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Something went wrong with your sessions.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}

export const hitTheRoad = async (navigation, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    try {
        await signOut(firebase_auth).then(() => navigation.navigate('SignIn'))
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Doesn\'t let you go.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}