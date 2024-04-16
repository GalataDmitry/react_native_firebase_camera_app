import React, {useCallback} from "react"
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import {useFocusEffect} from "@react-navigation/native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import {
    discardSessionIcon,
    loading,
    resumeCameraIcon,
    shareVideosIcon,
    uploadVideosIcon
} from "../icons/icons"
import {
    getVideos,
    uploadingVideo,
    sharingVideo,
    modalException,
    updater
} from "../services/shooting_session_services"
import {useShootingSessions} from "../hooks/hooks"

const ShootingSessionScreen = ({route}): React.JSX.Element => {

    const {id, userCollection} = route.params
    const {
        navigation,
        videos,
        setVideos,
        modalVisible,
        setModalVisible,
        exceptionMessage,
        setExceptionMessage,
        messageColor,
        setMessageColor,
        icon,
        setIcon,
    } = useShootingSessions()

    useFocusEffect(
        useCallback(() => {
            getVideos(userCollection, id, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
        }, [])
    )

    const renderItem = ({item}) => {
        if (item.nanoseconds) return null
        return <View style={styles.cardItemContainer}>
            <View style={styles.cardItem}>
                <Text style={styles.cardText}>{item.name}</Text>
                <Image style={styles.thumb} source={{uri: item.thumb}}/>
                {item.uploaded ?
                    (<Text style={styles.checkBox}>uploaded</Text>) :
                    item.uploading ? null : (<BouncyCheckbox
                        fillColor='green'
                        style={styles.checkBox}
                        isChecked={item.isChecked}
                        size={22}
                        innerIconStyle={{borderWidth: 2}}
                        onPress={() => {
                            updater(id, `${item.id}.isChecked`, !item.isChecked, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
                        }}
                    />)}
                {item.uploading ? <View style={styles.uploadingIndicator}>{loading}</View> : null}
            </View>
        </View>
    }

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {modalVisible && modalException(modalVisible, exceptionMessage, icon, messageColor)}
                <Text style={styles.sessionTitle}>Session: {id}</Text>
                {videos ?
                    (<FlatList
                        data={videos}
                        renderItem={renderItem}
                        // keyExtractor={item => item.id}
                    />) : (loading)}
                <TouchableOpacity
                    style={styles.discardButton}
                    onPress={() => navigation.navigate('Shooting sessions', {sessionName: id, userCollection})}
                >
                    <Text>{discardSessionIcon}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => uploadingVideo(videos, id, userCollection, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)}
                >
                    <Text>{uploadVideosIcon}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.resumeButton}
                    onPress={() => navigation.navigate('Camera', {sessionName: id, userCollection})}
                >
                    <Text>{resumeCameraIcon}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sharingButton}
                    onPress={() => sharingVideo(userCollection, id, setVideos, setExceptionMessage, setModalVisible, setMessageColor, setIcon)}
                >
                    <Text>{shareVideosIcon}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    discardButton: {
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
        borderWidth: 1,
    },
    uploadButton: {
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
        borderWidth: 1,
    },
    resumeButton: {
        position: 'absolute',
        bottom: 220,
        right: 10,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1,
    },
    sharingButton: {
        position: "absolute",
        right: 10,
        bottom: 160,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1,
    },
    cardItem: {
        backgroundColor: '#DDDDDD',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 300,
        height: 100,
        borderRadius: 5,
    },
    cardItemContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 300
    },
    cardText: {
        position: 'absolute',
        left: 115,
        top: 3,
    },
    sharingText: {
        position: "absolute",
        top: 3,
        alignSelf: "center",
    },
    sessionTitle: {
        fontSize: 15,
        alignSelf: "center",
        marginTop: 5
    },
    thumb: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        width: 105,
        height: 90,
        borderRadius: 3
    },
    checkBox: {
        position: 'absolute',
        left: 115,
        top: 73,
    },
    uploadingIndicator: {
        position: 'absolute',
        right: 2,
        bottom: 2
    }
})

export default ShootingSessionScreen