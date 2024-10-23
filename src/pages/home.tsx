import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TextInput, FlatList, Image, ScrollView } from 'react-native';
import Header from '../components/header';
import CardEmployee from '../components/cardEmployee';
import api from '../services/api';
import { EmployeeProps } from '../types/employee.types';
import { Fontisto, Entypo } from '@expo/vector-icons';
import Search from '../assets/search.svg'



export default function Home() {
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);
    const [screen, setScreen] = useState('logo');
    const [scrollControl, setScrollControl] = useState(true);

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get('/employees');
            setEmployees(response.data);
        }

        fetchApi();
    }, []);

    useEffect(() => {
        function transitionScreen() {
            setTimeout(() => {
                setScreen('Home')
            }, 1000);
        }
        transitionScreen();
    }, [])


    async function searchEmployee(text: string) {
        if (text === '') {
            const response = await api.get('/employees');
            setEmployees(response.data);
            return;
        }

        try {
            const [nameResponse, jobResponse, phoneResponse] = await Promise.all([
                api.get(`/employees?name=${text}`),
                api.get(`/employees?job=${text}`),
                api.get(`/employees?phone=${text}`)
            ]);

            const responseData = nameResponse.data.length
                ? nameResponse.data
                : jobResponse.data.length
                    ? jobResponse.data
                    : phoneResponse.data.length
                        ? phoneResponse.data
                        : [];

            setEmployees(responseData);
        } catch (error) {
            console.error('Erro ao buscar empregados:', error);
        }
    }

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <>
            {screen === 'logo' ? <View style={styles.containerInitial}>
                <Image
                    source={require('../assets/logo.png')}
                />
            </View> :
                <View style={[styles.containerEmployees, { paddingTop: statusBarHeight }]}>
                    <Header />
                    <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Funcionários</Text>
                        <View style={styles.inputArea}>
                            <Search width={24} height={24} />
                            <TextInput
                                style={styles.input}
                                placeholder="Pesquisar"
                                placeholderTextColor={'#1C1C1C'}
                                onChangeText={(text) => {
                                    searchEmployee(text);
                                }}
                            />
                        </View>
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
                        <ScrollView style={styles.containerCards} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {employees.map(employee =>(
                                <CardEmployee key={employee.id} data={employee} />
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View >}
        </>
    );
}

const styles = StyleSheet.create({
    containerInitial: {
        flex: 1,
        backgroundColor: '#0500FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerEmployees: {
        flex: 1,
        backgroundColor: '#FFF',
        marginLeft: 18,
        gap: 8,
        alignItems: 'center'
    },
    containerContent: {
        marginRight: 17,
    },
    title: {
        fontSize: 18,
        color: '#1C1C1C',
        fontWeight: 'bold',
        marginTop: 94,
    },
    inputArea: {
        backgroundColor: '#F5F5F5',
        width: 335,
        height: 48,
        borderRadius: 100,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 4,
    },
    iconSearch: {
        color: '#1C1C1C'
    },
    input: {
        marginLeft: 5,
    },
    headerList: {
        backgroundColor: '#EDEFFB',
        width: 335,
        height: 47,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
        borderWidth: 1,
        borderColor: '#EDEFFB',
    },
    containerCards:{
        height: 590
    },
    viewTextnameAndPhoto: {
        marginLeft: 15,
        flexDirection: 'row',
        gap: 25
    },

    icon: {
        marginRight: 20
    }
});