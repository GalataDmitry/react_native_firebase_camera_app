import React, {useCallback} from "react"
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useFocusEffect} from "@react-navigation/native"
import {addSessionIcon, loading, sessionItemIcon, signOutIcon} from "../icons/icons"
import {fetchSessions, hitTheRoad} from "../services/shooting_sessions_services"
import {modalException} from "../services/shooting_session_services"
import {useShootingSessions} from "../hooks/hooks"

const ShootingSessionsScreen = ({route}): React.JSX.Element => {

    const {userCollection} = route.params
    const {
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
        setIcon
    } = useShootingSessions()

    useFocusEffect(useCallback(() => {
        fetchSessions(userCollection, setSessions, setExceptionMessage, setModalVisible, setMessageColor, setIcon)
    }, []))

    const renderSessions = ({item}) => {
        if (item.createdAt) return null
        return <View>
            <TouchableOpacity onPress={() => navigation.navigate('Shooting session', {id: item.name, userCollection})}>
                <View style={styles.cardItem}>
                    <View style={styles.folderIcon}>{sessionItemIcon}</View>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={styles.countText}>{item.count > 1 ? 'Files:' : 'File:'} {item.count}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {modalVisible && modalException(modalVisible, exceptionMessage, icon, messageColor)}
                <Text style={styles.sessionsTitle}>Shooting sessions</Text>
                {sessions ?
                    (<FlatList
                        data={sessions}
                        renderItem={renderSessions}
                        keyExtractor={item => item.sortId}
                    />) : (loading)}
            </View>
            <TouchableOpacity
                style={styles.addSessionButton}
                onPress={() => navigation.navigate('Create new session', {userCollection})}
            >
                <Text>{addSessionIcon}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signOutButton}
                onPress={() => hitTheRoad(navigation, setExceptionMessage, setModalVisible, setMessageColor, setIcon)}
            >
                <Text>{signOutIcon}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
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
        alignSelf: 'center'
    },
    cardText: {
        position: "absolute",
        alignSelf: 'center',
        justifyContent: "center"
    },
    addSessionButton: {
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
    signOutButton: {
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
    countText: {
        position: "absolute",
        left: 5,
        bottom: 2
    },
    folderIcon: {
        position: 'absolute',
        left: 4,
        top: 4,
    },
    sessionsTitle: {
        fontSize: 15,
        alignSelf: "center",
        marginTop: 5
    },
})

export default ShootingSessionsScreen