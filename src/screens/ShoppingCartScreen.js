import { Text, FlatList, View, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartListItem from '../components/CartListItem';
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';
import { useStripe } from '@stripe/stripe-react-native';
// import cart from "../data/cart";


const ShoppingCartTotals =  () => {
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    
    return (
    <View style={styles.totalsContainer}>
        <View style={styles.row}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>USD ${subtotal}.00</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.text}>USD ${deliveryFee}.00</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>USD ${total}.00</Text>
        </View>
    </View>
)}

const ShoppingCartScreen =  ()  => {
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    // console.log(error, isLoading);

    const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

    const onCreateOrder = () => {
        createOrder({
            // all the items from the cart - we want to add to order
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: "Sophia Castillo",
                address: "Playa Del Rey, California",
                email: "sphcastillo@gmail.com"
            }
        })
    }
    return (
        <>
            <FlatList 
                data={cartItems} 
                renderItem={({ item }) => <CartListItem 
                cartItem={item} />}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable 
                onPress={onCreateOrder} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Checkout
                    {isLoading && <ActivityIndicator />}
                </Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    textBold: {
        fontSize: 16,
        fontWeight: '500'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: '500',
        fontSize: 16
    }
});

export default ShoppingCartScreen;