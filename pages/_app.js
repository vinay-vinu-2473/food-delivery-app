import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { SocketProvider } from '../context/SocketContext';
import { ToastProvider } from '../context/ToastContext';
import { UIProvider } from '../context/UIContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import Head from 'next/head';

// Fix for Link warnings
import NextLink from 'next/link';
NextLink.defaultProps = NextLink.defaultProps || {};
NextLink.defaultProps.legacyBehavior = true;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <SocketProvider>
            <ToastProvider>
              <UIProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </UIProvider>
            </ToastProvider>
          </SocketProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}