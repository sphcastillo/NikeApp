import { View, TextInput, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
import { useState } from 'react';

const TrackOrder = () => {
    const [ref, setRef] = useState('');
    const { data, isLoading, error } = useGetOrderQuery(ref);
    return (
        <View style={styles.root}>
            <TextInput 
                style={styles.input}
                placeholder="Your order reference"
                value={ref}
                onChangeText={setRef}
                autoCapitalize='none'
            />
            {isLoading && <ActivityIndicator />}
            {data?.status !== "OK" && <Text>Order not found</Text>}
            {data?.status === "OK" && (
                <Text>{JSON.stringify(data.data, null, 2)}</Text>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    input: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    }
});

export default TrackOrder;