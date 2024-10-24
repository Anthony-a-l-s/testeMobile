import { useEffect, useState, useCallback } from 'react';
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
    const [index, setIndex] = useState(3)
    const [searcInput, setSeaarchInput] = useState('')
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            opacity.value = withTiming(0, { duration: 500 });
        }, 1000);

        const timeout2 = setTimeout(() => {
            setIndex(0)
        }, 1500);


        return () => { clearTimeout(timeout1), clearTimeout(timeout2) };
    }, []);

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get('/employees');
            setEmployees(response.data);
        }

        fetchApi();
    }, []);

    function handeInputChange(text: string) {
        setSeaarchInput(text)
        delayedApiCall(text)
    }

    const debounce = (func: (...args: string[]) => void, dalay: number) => {
        let tiemout: NodeJS.Timeout | null = null;

        return (...args: string[]) => {
            if (tiemout) {
                clearInterval(tiemout);
            }
            tiemout = setTimeout(() => {
                func(...args)
            }, dalay)
        }
    }

    const delayedApiCall = useCallback(
        debounce(async (text: string) => await searchEmployee(text), 700),
        []
    )

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
            <Animated.View style={[styles.containerInitial, { zIndex: index }, animatedStyle]}>
                <Image source={require('../../assets/logo.png')} />
            </Animated.View>
            <View style={[styles.containerHome, { paddingTop: statusBarHeight }]}>
                <Header />
                <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Funcionários</Text>
                    <View style={styles.inputArea}>
                        <Search width={24} height={24} />
                        <TextInput
                            style={styles.input}
                            placeholder="Pesquisar"
                            placeholderTextColor={'#1C1C1C'}
                            onChangeText={(text) => handeInputChange(text)}
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
        backgroundColor: '#FFF',
    },
    containerInitial: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#0500FF',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    containerHome: {
        width: '100%',
        height: '100%',
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
