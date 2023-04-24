import AppLayout from "@/layout/AppLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Roboto, Roboto_Mono } from "@next/font/google";

import { Provider } from "react-redux";
import { store } from "../../store";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${roboto.variable} ${robotoMono.variable} font-sans`}>
      <Toaster position="top-center" reverseOrder={false} />
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </SessionProvider>
    </main>
  );
}
