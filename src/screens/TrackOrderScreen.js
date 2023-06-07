import { View, TextInput, StyleSheet, ActivityIndicator, Text } from "react-native";

const TrackOrder = () => {

    return (
        <View style={styles.root}>
            <TextInput 
                style={styles.input}
            
            />
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