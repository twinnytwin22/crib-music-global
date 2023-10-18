"use client";
import * as React from "react";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SubportPlayer } from "app/context/subport-player";
import { AuthContextProvider } from "app/context/auth";
const queryClient = new QueryClient()



 
export const Providers = ({ children, }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
                    <Suspense>
                        <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
                            <SubportPlayer>
                                {children}
                                </SubportPlayer>
                        </ThemeProvider>
                    </Suspense>
        </QueryClientProvider>
    );
};

export default Providers;

