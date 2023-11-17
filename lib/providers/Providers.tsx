"use client";
import * as React from "react";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalUIProvider } from "app/context/global-ui";
import SiteContextProvider from "app/context/siteContext";
import { SubportPlayer } from "app/context/subport-player";
import { ThemeProvider } from "next-themes";
import { FormProvider } from "ui/Forms/formContext";
const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalUIProvider>
      <SiteContextProvider>
        <Suspense>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            defaultTheme="dark"
          >
            <SubportPlayer>
              <FormProvider>{children}</FormProvider>
            </SubportPlayer>
          </ThemeProvider>
        </Suspense>
        
      </SiteContextProvider>
      </GlobalUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
