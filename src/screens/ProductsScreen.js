import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import products from '../data/products';

const ProductsScreen = () => {
    return (
        <FlatList 
            data={products}
            renderItem={({ item }) => (
            <View
            style={styles.imageContainer}
            >
                <Image 
                source={{
                    uri: item.image,
                }}
                style={styles.image}
                />
            </View>
            )}
            numColumns={2}
      />
    )
}

const styles = StyleSheet.create({
    imageContainer: {
      width: '50%',
      padding: 1
    },
    image: {
      width: "100%",
      aspectRatio: 1
    }
  });

  export default ProductsScreen;