import {Alert, Modal, Text, View} from "react-native"
import {doc, getDoc, updateDoc} from "firebase/firestore"
import firebase from "firebase/compat"
import {ref, uploadBytesResumable} from "firebase/storage"
import DocumentPicker, {DocumentPickerOptions} from "react-native-document-picker"
import {SupportedPlatforms} from "react-native-document-picker/lib/typescript/fileTypes"
import RNFS from "react-native-fs"
import {firebase_storage, firestore} from "../../firebase"
import {addVideo, generateThumbnail} from "./camera_services"
import {exceptionIconFrown, exceptionIconMeh} from "../icons/icons"
import UpdateData = firebase.firestore.UpdateData

export const modalException = (visible, message, icon, color) => {
    return <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
    >
        <View style={{
            position: "absolute",
            top: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: 350,
            height: 100,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: color,
            backgroundColor: 'white'
        }}>
            {icon}
            <Text>{message}</Text>
        </View>
    </Modal>
}

export const getVideos = async (
    userCollection,
    id,
    setVideos,
    setExceptionMessage,
    setModalVisible,
    setMessageColor,
    setIcon) => {
    try {
        const documentRef = doc(firestore, userCollection, id)

        const allVideos = await getDoc(documentRef)
            .then(res => res.data())
        let videos = []
        for (let value of Object.values(allVideos)) {
            if (value.seconds) continue
            videos.push(value)
        }
        setVideos(videos.sort((a, b) => b.id - a.id))
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Something went wrong with your videos.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}

export const uploadingVideo = (videos, id, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    videos?.forEach((video) => {
        const storageRef = ref(firebase_storage, `videos/${video.name}`)
        if (video.isChecked && !video.uploaded) {
            updater(id, `${video.id}.uploading`, true, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
            fetch(`file://${video.path}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const upload = uploadBytesResumable(storageRef, blob)
                    upload.on('state_changed', () => {
                        },
                        (error) => {
                            Alert.alert('Oops', `Something went wrong with your uploading :( \n ${error}`, [
                                {
                                    text: 'Forget it',
                                    onPress: () => updater(id, `${video.id}.uploading`, false, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
                                }
                            ])
                        }, () => {
                            updater(id, `${video.id}.uploaded`, true, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
                                .then(() => updater(id, `${video.id}.uploading`, false, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon))
                        }
                    )
                })
                .catch((error) => {
                    Alert.alert('Oops', `Something went wrong with your uploading :( \n ${error}`, [
                        {
                            text: 'Forget it',
                            onPress: () => updater(id, `${video.id}.uploading`, false, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
                        }
                    ])
                })
        }
    })
}

export const sharingVideo = async (userCollection, id, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.video]
        } as DocumentPickerOptions<SupportedPlatforms>)

        const newPath = RNFS.CachesDirectoryPath + '/' + res[0].name
        await RNFS.copyFile(res[0].uri, newPath);
        const videoId = Date.now().toString()
        const thumb = await generateThumbnail(res[0].uri, setExceptionMessage, setModalVisible, setMessageColor, setIcon)

        let video = {
            id: videoId,
            name: res[0]?.name,
            path: newPath,
            thumb: thumb?.path,
            isChecked: true,
            uploaded: false
        }
        await addVideo({[videoId]: video}, userCollection, id, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
            .then(() => getVideos(userCollection, id, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon))
    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            setMessageColor('orange')
            setIcon(exceptionIconMeh)
            setExceptionMessage('Selection video canceled.')
            setModalVisible(true)
            setTimeout(() => setModalVisible(false), 2000)
        } else {
            setMessageColor('red')
            setIcon(exceptionIconFrown)
            setExceptionMessage('Selection video error.')
            setModalVisible(true)
            setTimeout(() => setModalVisible(false), 2000)
        }
    }
}

export const updater = async (sessionId, videoId, value, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    try {
        await updateDoc(doc(firestore, userCollection, sessionId), {
            [videoId]: value
        } as UpdateData)
            .then(() => getVideos(userCollection, sessionId, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon))
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Oops, something doesn\'t understand you.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}
// import RNFS from "react-native-fs"
// remVideos(RNFS.CachesDirectoryPath, setVideos)
