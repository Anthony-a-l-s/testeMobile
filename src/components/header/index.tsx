import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Header() {
    
    return (
        <View style={styles.containerHeader}>
            <View style={styles.circleUser}>
                <Text>CG</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: '#fff',
        width: '100%',
        height: 79,
        justifyContent: 'space-between',
    },
    circleUser: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 20,
        marginTop: 12
    }
})