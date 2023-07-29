import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import '@/styles/globals.css';
import { Navbar } from '@/component/landingComponent';
import SideBar from '@/component/landingComponent/SideBar';
import { useRouter } from 'next/router';
import AllDataContextProvider from '@/context/AllDataContext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isRootPage =
    router.pathname === '/' ||
    router.pathname === '/register' ||
    router.pathname === '/login';
  return (
    <ChakraProvider>
      <Head>
        <title>Stocktrackr</title>
        <meta
          name='description'
          content='Stocktrackr is an inventory management application'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='row' h={'100vh'}>
        <AllDataContextProvider>
          {!isRootPage && (
            <>
              <SideBar />
            </>
          )}

          <Container maxW={'container.lg'} mx={'auto'} flexGrow={1}>
            <Component {...pageProps} />
          </Container>
        </AllDataContextProvider>
      </Flex>
    </ChakraProvider>
  );
}
