import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <h1>Cabeçalho</h1>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}
