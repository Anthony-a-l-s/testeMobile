import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions, StatusBar } from 'react-native';
import Header from './src/components/header'
import ImputSearch from './src/components/inputSearch';



const { height } = Dimensions.get('window');

export default function App() {

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  return (
    /*<View style={styles.containerInitial}>
      <Image
        source={require('./src/assets/Logo.png')} 
        />
    </View>*/
    <SafeAreaView style={[styles.containerEmployees, , { paddingTop: statusBarHeight }]}>
        <Header/>
        <Text style={styles.title}>Funcionários</Text>
        <ImputSearch/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#0500FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEmployees:{
    flex: 1,
    backgroundColor: '#FFF',
    marginLeft: 18,
    gap: 8,
  },
  title:{
    fontSize: 18,
    color: '#1C1C1C',
    fontWeight: 'bold'
  }
});
