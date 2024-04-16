import {useRef, useState} from "react"
import {useColorScheme} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {Colors} from "react-native/Libraries/NewAppScreen"
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera"

export interface EmailPasswordTypes {
    email: string
    password: string
}

export const useSignInScreen = () => {

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [visibleAuthComponent, setVisibleAuthComponent] = useState(true)
    const [emailPassword, setEmailPassword] = useState<EmailPasswordTypes>({email: '', password: ''})
    const inputRef = useRef(null)
    const isDarkMode = useColorScheme() === 'dark'
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return {
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
    }
}

export const useCreateSessionScreen = () => {

    const navigation = useNavigation()
    const [sessionName, setSessionName] = useState('')
    const [exceptionMessage, setExceptionMessage] = useState('')
    const [messageColor, setMessageColor] = useState('')
    const [icon, setIcon] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const inputRef = useRef(null)

    return {
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
    }
}

export const useShootingSessions = () => {
    const navigation = useNavigation()
    const [sessions, setSessions] = useState<object[]>()
    const [videos, setVideos] = useState<object[]>()
    const [modalVisible, setModalVisible] = useState(false)
    const [exceptionMessage, setExceptionMessage] = useState('')
    const [messageColor, setMessageColor] = useState('')
    const [icon, setIcon] = useState(null)

    return {
        navigation,
        sessions,
        setSessions,
        modalVisible,
        setModalVisible,
        exceptionMessage,
        setExceptionMessage,
        messageColor,
        setMessageColor,
        icon,
        setIcon,
        videos,
        setVideos
    }
}

export const useCameraScreen = () => {

    const navigation = useNavigation()
    const device = useCameraDevice('back', {physicalDevices: ['wide-angle-camera']})
    const {hasPermission, requestPermission} = useCameraPermission()
    const camera = useRef<Camera>(null)
    const inputRef = useRef(null)
    const [isActive, setIsActive] = useState(false)
    const [autoUploading, setAutoUploading] = useState<boolean | null>(null)
    const [newVideoName, setNewVideoName] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [exceptionMessage, setExceptionMessage] = useState('')
    const [messageColor, setMessageColor] = useState('')
    const [icon, setIcon] = useState(null)

    return {
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
    }
}