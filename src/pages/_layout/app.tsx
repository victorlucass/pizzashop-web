import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { HeaderApp } from '@/components/header'

export function AppLayout() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex min-h-screen flex-col antialiased">
        <HeaderApp />
        <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}
