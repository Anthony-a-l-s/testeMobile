import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { EmployeeProps } from "../../types/employee.types";


export default function CardEmployee({ data }: { data: EmployeeProps }) {

    const [heightCard, setHeightCard] = useState(60);
    const [icon, setIcon] = useState('para baixo');

    function modfyHeight() {
        if (heightCard === 60) {
            setHeightCard(200);
            setIcon('para cima')
        } else {
            setHeightCard(60);
            setIcon('para baixo')
        }
    }

    function switchIcon(icon: string): void {
        if(icon === 'dowm'){
            setIcon('up')
        }else{
            setIcon('down')
        }
    }

    function formatDate(dateString: string): string | undefined {
        const regex = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        const match = dateString.match(regex);

        if (match) {
            // Extraímos o ano, mês e dia
            let year = match[1];
            let month = match[2];
            let day = match[3];

            // Retorna no formato DD/MM/AAAA
            return `${day}/${month}/${year}`;
        }
        return
    }

    function formatPhone(phoneString: string): string | undefined {
        const regex = /^55(\d{2})(\d{5})(\d{4})$/;
        const match = phoneString.match(regex);

        if (match) {
            let ddd = match[1];
            let prefix = match[2];
            let suffix = match[3];

            // Retorna no formato +55 (XX) XXXXX-XXXX
            return `+55 (${ddd}) ${prefix}-${suffix}`;
        }
        return
    }

    return (
        <Pressable style={[styles.containerCard, { height: heightCard }]} onPress={() => modfyHeight()}>
            <View style={styles.headerCard}>
                <View style={styles.ImageAndName}>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                    />
                    <Text>{data.name}</Text>
                </View>
                    <AntDesign
                        name={icon === 'para baixo'? 'down': 'up'}
                        size={20}
                        color='#0500FF'
                        style={styles.icon}
                    />
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
                        <Text>{formatDate(data.admission_date)}</Text>
                    </View>
                    <Text style={styles.line}>----------------------------------------------------------------------------</Text>
                </View>

                <View>
                    <View style={styles.bodyCardInformations}>
                        <Text>Telefone</Text>
                        <Text>{formatPhone(data.phone)}</Text>
                    </View>
                    <Text style={styles.line}>----------------------------------------------------------------------------</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    containerCard: {
        backgroundColor: '#FFF',
        width: 335,
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