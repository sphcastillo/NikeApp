import { Text, FlatList, View, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartListItem from '../components/CartListItem';
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from '../store/cartSlice';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '../store/apiSlice';
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

    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async () => {
        // create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(total * 100),
        })
        // console.log("RESPONSE: ", response);
        if(response.error){
            // console.log("response error: ", response.error);
            Alert.alert("Something went wrong");
            return;
        }
        // initialize the payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: "sphcastillo",
            paymentIntentClientSecret: response.data.paymentIntent,
        })
        if(initResponse.error){
            // console.log("init Response: ", initResponse.error);
            Alert.alert("Something went wrong");
            return;
        }

        // present the payment sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if(paymentResponse.error){
            Alert.alert(
                `Error code: ${paymentResponse.error.code}`,
                paymentResponse.error.message
            );
            return;
        }

        // if payment is ok => create the order
        onCreateOrder();
    }

    const onCreateOrder = async () => {
        const result =  await createOrder({
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

        if(result.data?.status === "OK"){
            Alert.alert(
                "Order has been submitted",
                `Your order reference is ${result.data.data.ref}`
            );
            // empty shopping cart
            dispatch(cartSlice.actions.clear());
        }
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
                onPress={onCheckout} 
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