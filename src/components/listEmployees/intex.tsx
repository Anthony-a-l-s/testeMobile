import { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Entypo } from '@expo/vector-icons'
import CardEmployee from "../cardEmployee";
import { EmployeeProps } from "../../types/employee.types";





export default function ListEmployees({ employees }: { employees: EmployeeProps[] } ) {



    return (
        <View style={styles.containerListEmployees}>
            <View style={styles.headerList}>
                <View style={styles.viewTextnameAndPhoto}>
                    <Text> FOTO</Text>
                    <Text>NOME</Text>
                </View>
                <Entypo
                    name='controller-record'
                    size={10}
                    color='#1C1C1C'
                    style={styles.icon}
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={employees}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CardEmployee data={item} />}
                //onTouchStart={() => employees.setScroll(false)}  // Desativa o Scroll Externo
                //onTouchEnd={() => employees.setScroll(true)}    // Ativa o Scroll Externo
                //onScrollEndDrag={() => employees.setScroll(true)}  // Ativa ao final da rolagem
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerListEmployees: {
        backgroundColor: '#FFF',
        width: '90%',
        height: 637,
        marginTop: 20,

    },

    headerList: {
        backgroundColor: '#EDEFFB',
        width: '100%',
        height: 47,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },

    viewTextnameAndPhoto: {
        marginLeft: 15,
        flexDirection: 'row',
        gap: 25
    },

    icon: {
        marginRight: 20
    }

})