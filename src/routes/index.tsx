import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";

export type StackParamList = {
    Home: undefined
}

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            
        </Stack.Navigator>
    );
}
