import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions, StatusBar, ScrollView } from 'react-native';


export default function Header() {
    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    return (
        <View style={[styles.containerHeader, {marginTop: statusBarHeight}]}>
            <View style={styles.circleUser}>
                <Text>CG</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    containerHeader: {
        position: 'absolute',
        zIndex: 99,
        opacity: 0.9,
        backgroundColor: '#FFF',
        width: '100%',
        height: 79,
        justifyContent: 'space-between',
        marginLeft: -10,

    },
    circleUser: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 20,
        marginTop: 12,
    }
})