import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Products" component={ProductsScreen}/>
                <Stack.Screen name="Product Details" component={ProductDetailsScreen}/>
                <Stack.Screen name="Cart" component={ShoppingCartScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;