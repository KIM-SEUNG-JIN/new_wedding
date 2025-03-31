import { WeddingProvider } from '../context/WeddingContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <WeddingProvider>
      <Component {...pageProps} />
    </WeddingProvider>
  );
}

export default MyApp;