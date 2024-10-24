import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Platform, StatusBar, ScrollView, TextInput, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Header from '../../components/header';
import Search from '../../assets/search.svg';
import { EmployeeProps } from '../../types/employee.types';
import CardEmployee from '../../components/cardEmployee';
import api from '../../services/api';
import { Entypo } from '@expo/vector-icons';

export default function Teste() {
    
    const opacity = useSharedValue(1);  
    const [display, setDisplay] = useState(true)
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);
    useEffect(() => {
        setTimeout(() => {
            opacity.value = withTiming(0, { duration: 500 });
        }, 1000);

        const timeout = setTimeout(() => {
            setDisplay(false)
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get('/employees');
            setEmployees(response.data);
        }

        fetchApi();
    }, []);

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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });
    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.containerInitial, { opacity: display ? 1 : 0 }, animatedStyle]}>
                <Image source={require('../../assets/logo.png')} />
            </Animated.View>

            <View style={[styles.container2, { paddingTop: statusBarHeight }]}>
                <Header />
                <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Funcionários</Text>
                    <View style={styles.inputArea}>
                        <Search width={24} height={24} />
                        <TextInput
                            style={styles.input}
                            placeholder="Pesquisar"
                            placeholderTextColor={'#1C1C1C'}
                            onChangeText={(text) => searchEmployee(text)}
                        />
                    </View>
                    <View style={styles.headerList}>
                        <View style={styles.viewTextnameAndPhoto}>
                            <Text style={styles.textHeaderList}> FOTO</Text>
                            <Text style={styles.textHeaderList}>NOME</Text>
                        </View>
                        <Entypo name="controller-record" size={10} color="#1C1C1C" style={styles.icon} />
                    </View>
                    <ScrollView style={styles.containerCards} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {employees.map(employee => (
                            <CardEmployee key={employee.id} data={employee} />
                        ))}
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInitial: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#0500FF',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    container2: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        alignItems: 'center',
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
    containerCards: {
        height: 590,
    },
    viewTextnameAndPhoto: {
        marginLeft: 15,
        flexDirection: 'row',
        gap: 25,
    },
    textHeaderList: {
        fontWeight: '500',
    },
    icon: {
        marginRight: 20,
    },
});
