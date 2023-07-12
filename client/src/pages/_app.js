import { ChakraProvider, Grid, Box, Container, Flex } from '@chakra-ui/react';
import '@/styles/globals.css';
import { Navbar } from '@/component/landingComponent';
import SideBar from '@/component/landingComponent/SideBar';
import { useRouter } from 'next/router';
import AllDataContextProvider from '@/context/AllDataContext';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isRootPage =
    router.pathname === '/' ||
    router.pathname === '/register' ||
    router.pathname === '/login';
  return (
    <ChakraProvider>
      <Flex direction='row'>
        <AllDataContextProvider>
          {!isRootPage && (
            // <Box templateColumns='auto 1fr' height=''>
            <>
              <SideBar />
            </>
            // </Box>
          )}
          {/* <Box height={'100vh'}> */}

          <Container maxW={'container.lg'} mx={'auto'} flexGrow={1}>
            <Component {...pageProps} />
          </Container>
        </AllDataContextProvider>
        {/* </Box> */}
      </Flex>
    </ChakraProvider>
  );
}
