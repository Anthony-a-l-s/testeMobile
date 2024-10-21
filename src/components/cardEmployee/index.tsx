import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { EmployeeProps } from "../../types/employee.types";


export default function CardEmployee({ data }: { data: EmployeeProps }) {

    const [heightCard, setHeightCard] = useState(60);

    function modfyHeight() {
        console.log(heightCard)
        if (heightCard === 60) {
            setHeightCard(200);
        } else {
            setHeightCard(60);
        }
    }

    return (
        <View style={[styles.containerCard, { height: heightCard }]}>
            <View style={styles.headerCard}>
                <View style={styles.ImageAndName}>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                    />
                    <Text>{data.name}</Text>
                </View>
                <TouchableOpacity onPress={() => modfyHeight()}>
                    <AntDesign
                        name='down'
                        size={20}
                        color='#1C1C1C'
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.bodyCard}>
                <View>
                    <View style={styles.bodyCardInformations}>
                        <Text>Cargo</Text>
                        <Text>{data.job}</Text>
                    </View>
                    <Text style={styles.line}>----------------------------------------------------------------------------</Text>
                </View>

                <View>
                    <View style={styles.bodyCardInformations}>
                        <Text>Data de admissão</Text>
                        <Text>{data.admission_date}</Text>
                    </View>
                    <Text style={styles.line}>----------------------------------------------------------------------------</Text>
                </View>

                <View>
                    <View style={styles.bodyCardInformations}>
                        <Text>Telefone</Text>
                        <Text>{data.phone}</Text>
                    </View>
                    <Text style={styles.line}>----------------------------------------------------------------------------</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    containerCard: {
        backgroundColor: '#FFF',
        width: '100%',
        borderWidth: 1,
        borderColor: '#EDEFFB',
    },
    headerCard: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ImageAndName: {
        marginLeft: 12,
        flexDirection: 'row',
        gap: 25
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    icon: {
        marginRight: 15
    },
    bodyCard: {
        gap: 8,
        paddingLeft: 15,
        paddingRight: 15
    },
    bodyCardInformations: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        marginTop: -10,
        color: '#F5F5F5'
    }
})