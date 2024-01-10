import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div>
      <h1>Autenticação</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
