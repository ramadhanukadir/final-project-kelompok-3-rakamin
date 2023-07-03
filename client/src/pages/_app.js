import { ChakraProvider, Grid, Box } from "@chakra-ui/react";
import "@/styles/globals.css";
import { Navbar } from "@/component/landingComponent";
import SideBar from "@/component/landingComponent/SideBar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isRootPage =
    router.pathname === "/" ||
    router.pathname === "/register" ||
    router.pathname === "/login";
  return (
    <ChakraProvider>
      <Grid height="" templateRows="auto 1fr" templateColumns="1fr" gap={0}>
        {!isRootPage && (
          <Box templateColumns="auto 1fr" height="">
            <SideBar />
          </Box>
        )}
        <Box p={5}>
          <Component {...pageProps} />
        </Box>
      </Grid>
    </ChakraProvider>
  );
}
