import AuthProvider from "@/context/auth-context";
import BillProvider from "@/context/bill-context";
import DashboardProvider from "@/context/dashboard-context";
import PaymentProvider from "@/context/payment-context";
import PropertyProvider from "@/context/property-context";
import "react-phone-number-input/style.css";
import "@/styles/globals.css";
import "react-phone-number-input/style.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import { Router } from "next/router";
import AccountProvider from "@/context/account-contxt";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const queryClient = new QueryClient();
  Router.events.on("routeChangeStart", () => {
    nProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    nProgress.done();
  });
  return (
    <>
      <Head>
        <title>MyAssembly.GOV.GH - Admin</title>
        <meta name="description" content="MyAssembly.GOV.GH Web Admin" />
      </Head>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <CookiesProvider>
          <AuthProvider>
            <DashboardProvider>
              <PaymentProvider>
                <PropertyProvider>
                  <BillProvider>
                    <AccountProvider>
                      {process.env.NODE_ENV !== "production" && (
                        <div className="bg-yellow-400 text-white text-center text-xs">
                          Staging
                        </div>
                      )}
                      <Component {...pageProps} />
                    </AccountProvider>
                  </BillProvider>
                </PropertyProvider>
              </PaymentProvider>
            </DashboardProvider>
          </AuthProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </>
  );
}
