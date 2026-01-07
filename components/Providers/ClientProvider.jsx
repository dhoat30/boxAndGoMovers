'use client';
import { ThemeProvider } from '@mui/material/styles';
import {lightTheme } from "../../utils/themeSettings"
import { useState, useEffect } from 'react';
import Loading from '../UI/Loader/Loading'
export default function ClientProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust timing
  //   return () => clearTimeout(timer);
  // }, []);



  return <ThemeProvider theme={lightTheme}>
    {/* {isLoading && <Loading />} */}
    {children}</ThemeProvider>;
}
