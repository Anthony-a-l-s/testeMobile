import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions, StatusBar, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'

export default function Header() {
    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    return (
        <View style={[styles.containerHeader, { marginTop: statusBarHeight }]}>
            <View style={styles.circleUser}>
                <Text>CG</Text>
            </View>
            <Feather name={'bell'}
                size={30}
                color='#1C1C1C'
                style={styles.icon}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    containerHeader: {
        position: 'absolute',
        zIndex: 2,
        opacity: 0.9,
        backgroundColor: '#FFF',
        width: '100%',
        height: 79,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: -10,

    },
    circleUser: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 20,
        marginLeft: 10,
        marginTop: 12,
    },
    icon:{
        marginRight: 30,
        marginTop: 25,
    }
})