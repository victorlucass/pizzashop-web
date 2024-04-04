import '@/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { routes } from './routes'
export function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Toaster richColors />
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}

/*
  ANOTAÇÕES -----------------------------------------------------
  richColors: 
  %s : 
*/
