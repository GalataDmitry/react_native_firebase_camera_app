import {doc, updateDoc} from "firebase/firestore"
import createThumbnail from "react-native-create-thumbnail"
import {ref, uploadBytesResumable} from "firebase/storage"
import {firebase_storage, firestore} from "../../firebase"
import {exceptionIconFrown, exceptionIconSmile} from "../icons/icons"

export const addVideo = async (
    video,
    userCollection,
    sessionName,
    setExceptionMessage,
    setModalVisible,
    setMessageColor,
    setIcon) => {
    try {
        const sessionRef = doc(firestore, userCollection, sessionName)
        await updateDoc(sessionRef, video, {merge: true})
        setMessageColor('green')
        setIcon(exceptionIconSmile)
        setExceptionMessage('Video successfully recorded.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Video didn\'t add.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}

export const generateThumbnail = async (url, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    try {
        return await createThumbnail.create({
            url,
            timeStamp: 10000,
            format: 'png',
        })
    } catch {
        setMessageColor('red')
        setIcon(exceptionIconFrown)
        setExceptionMessage('Thumb didn\'t create.')
        setModalVisible(true)
        setTimeout(() => setModalVisible(false), 2000)
    }
}

export const autoUpload = (video, setExceptionMessage, setModalVisible, setMessageColor, setIcon) => {
    const storageRef = ref(firebase_storage, `videos/${video.name}`)
    fetch(`file://${video.path}`)
        .then((response) => response.blob())
        .then((blob) => {
            const upload = uploadBytesResumable(storageRef, blob)
            upload.on('state_changed',
                () => {
                },
                () => {
                    setMessageColor('red')
                    setIcon(exceptionIconFrown)
                    setExceptionMessage('Auto uploading error.')
                    setModalVisible(true)
                    setTimeout(() => setModalVisible(false), 2000)
                }, () => {
                    setMessageColor('green')
                    setIcon(exceptionIconSmile)
                    setExceptionMessage('Video uploaded successfully.')
                    setModalVisible(true)
                    setTimeout(() => setModalVisible(false), 2000)
                }
            )
        })
        .catch(() => {
            setMessageColor('red')
            setIcon(exceptionIconFrown)
            setExceptionMessage('Auto uploading error.')
            setModalVisible(true)
            setTimeout(() => setModalVisible(false), 2000)
        })
}

export const startRecording = async (
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
    setNewVideoName) => {

    if (!isRecording) {
        setIsRecording(true)
        await camera.current.startRecording({
            onRecordingFinished: async (video) => {
                const thumb = await generateThumbnail(
                    `file://${video.path}`,
                    setExceptionMessage,
                    setModalVisible,
                    setMessageColor,
                    setIcon)
                const videoId = Date.now().toString()
                if (autoUploading) {
                    video['id'] = videoId
                    video['thumb'] = thumb.path
                    video['name'] = newVideoName
                    video['isChecked'] = true
                    video['uploaded'] = true
                    await addVideo(
                        {[videoId]: video},
                        userCollection,
                        sessionName,
                        setExceptionMessage,
                        setModalVisible,
                        setMessageColor,
                        setIcon)
                    await autoUpload(video, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
                    setIsRecording(false)
                } else {
                    video['id'] = videoId
                    video['thumb'] = thumb.path
                    video['name'] = newVideoName
                    video['isChecked'] = true
                    video['uploaded'] = false
                    await addVideo(
                        {[videoId]: video},
                        userCollection,
                        sessionName,
                        setExceptionMessage,
                        setModalVisible,
                        setMessageColor,
                        setIcon)
                    setIsRecording(false)
                }
            },
            onRecordingError: () => {
                setIsRecording(false)
                setMessageColor('red')
                setIcon(exceptionIconFrown)
                setExceptionMessage('Recording error.')
                setModalVisible(true)
            }
        })
    } else {
        setNewVideoName('')
        setIsRecording(false)
        camera.current?.stopRecording()
    }
}