import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Fontisto } from '@expo/vector-icons'


export default function ImputSearch() {

    return (
        <View style={styles.inputArea}>
            <Fontisto  name='search' size={20} color='#1C1C1C' />
            <TextInput
                style={styles.input}
                placeholder="Pesquisar"
                placeholderTextColor={'#1C1C1C'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputArea: {
        backgroundColor: '#F5F5F5',
        width: '90%',
        height: 48,
        borderRadius: 100,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input:{
        marginLeft: 5
    }
})