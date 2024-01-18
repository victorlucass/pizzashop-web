import { Pizza } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
export function AuthLayout() {
  return (
    <>
      <Helmet title="Login" />
      <div className="grid min-h-screen grid-cols-2">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
          <div className="flex items-center gap-3 text-lg text-foreground">
            <Pizza className="h-5 w-5" />
            <span className="font-semibold">pizza.ship</span>
          </div>
          <footer className="text-sm">
            Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
          </footer>
        </div>
        <main className="relative flex flex-col items-center justify-center">
          <Outlet />
        </main>
      </div>
    </>
  )
}

/*
  ANOTAÇÕES -----------------------------------------------------
  foreground: é a cor oposta, ou seja, se for dark, o background é light;
  foreground/5: 5 de opacidade;
  muted: é tipo um apelido das cores.
*/
