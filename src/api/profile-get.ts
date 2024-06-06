import { api } from '@/lib/axios'

interface ProfileGetProps {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function profileGet() {
  const { data: profile } = await api.get<ProfileGetProps>('/me')
  return profile
}
