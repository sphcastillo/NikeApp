import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from "./src/store"
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {

  const STRIPE_KEY = 
  'pk_test_51NGP9fG2sJl7vfGOcv5iiSYplEHufSV4TXm7ajiKTsljvL69QBxeXlLTRSyvUmOmfGQjgpcZyFURmqxngUrpmohe00ObmX7rJW'

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Navigation />
      </StripeProvider>

      <StatusBar style="auto" />
    </Provider>

  );
}
