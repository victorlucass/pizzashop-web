import { api } from '@/lib/axios'

interface UpdateProfileProps {
  name: string
  description: string | null
}

export function updateProfile({ name, description }: UpdateProfileProps) {
  return api.put('profile', { name, description })
}
