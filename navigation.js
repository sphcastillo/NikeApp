import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Products"/>
                <Stack.Screen name="Product Details"/>
                <Stack.Screen name="Cart"/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;