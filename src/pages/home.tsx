import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView, TextInput } from 'react-native';
import Header from '..//components/header'
import ImputSearch from '../components/inputSearch';
import ListEmployees from '../components/listEmployees/intex';
import EmployeeContent from '../components/cardEmployee';
import api from '../services/api';
import { EmployeeProps } from '../types/employee.types';
import { Fontisto } from '@expo/vector-icons'


export default function Home() {
    const [employees, setEmployees] = useState<EmployeeProps[]>([])
    const [isOuterScrollEnabled, setOuterScrollEnabled] = useState(false);

    useEffect(() => {

        async function fetchApi() {
            const response = await api.get('/employees')
            setEmployees(response.data)
        }

        fetchApi();
    }, [])

    async function searchEmployee(text: string) {

        if (text === '') {
            return;
        }

        try {

            const [nameResponse, jobResponse, phoneResponse] = await Promise.all([
                api.get(`/employees?name=${text}`),
                api.get(`/employees?job=${text}`),
                api.get(`/employees?phone=${text}`)
            ]);


            if (nameResponse.data.length > 0) {
                setEmployees(nameResponse.data);
            } else if (jobResponse.data.length > 0) {
                setEmployees(jobResponse.data);
            } else if (phoneResponse.data.length > 0) {
                setEmployees(phoneResponse.data);
            } else {

                setEmployees([]);
            }

        } catch (error) {
            console.error('Erro ao buscar empregados:', error);

        }
    }


    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    return (
        /*<View style={styles.containerInitial}>
          <Image
            source={require('./src/assets/Logo.png')} 
            />
        </View>*/
        <View style={[styles.containerEmployees, { paddingTop: statusBarHeight }]}>
            <Header />
            <View
            //scrollEnabled={false}
            //showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Funcionários</Text>
                <View style={styles.inputArea}>
                    <Fontisto name='search' size={20} color='#1C1C1C' />
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar"
                        placeholderTextColor={'#1C1C1C'}
                        onChangeText={(text) => { searchEmployee(text) }}
                    />
                </View>
                <ListEmployees
                    employees={employees}
                //setScroll={(scroll:boolean)=> {setScrollEnabled(scroll)}}
                />
            </View>
        </View>
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
    },
    title: {
        fontSize: 18,
        color: '#1C1C1C',
        fontWeight: 'bold',
        marginTop: 94,
    },
    inputArea: {
        backgroundColor: '#F5F5F5',
        width: '90%',
        height: 48,
        borderRadius: 100,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 4
    },
    input: {
        marginLeft: 5
    }
});