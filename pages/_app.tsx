import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import EditModal from "@/components/modals/EditModal";
import RegisterModal from "@/components/modals/RegisterModal";

import "@/styles/globals.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
        <Toaster />
        <EditModal />
        <LoginModal />
        <RegisterModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>

);
}
