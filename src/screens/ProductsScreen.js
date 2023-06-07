import { StyleSheet, Image, FlatList, Pressable, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsScreen = () => {

    const navigation = useNavigation();

    // const products = useSelector((state) => state.products.products);
    

    const dispatch = useDispatch();

    const { data, isLoading, error } = useGetProductsQuery();

    if(isLoading){
      return <ActivityIndicator />
    }

    if(error){
      return  <Text>Error fetching products: {error.error}</Text>
    }

    const products = data.data; 


    return (
        <FlatList 
            data={products}
            renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                //update selected product
                // need to see payload - the id of the item 
                // dispatch(productsSlice.actions.setSelectedProduct(item.id))
                navigation.navigate('Product Details', {id: item._id});
              }}
              style={styles.imageContainer}
            >
                <Image 
                source={{
                    uri: item.image,
                }}
                style={styles.image}
                />
            </Pressable>
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