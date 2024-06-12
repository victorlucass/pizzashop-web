import { api } from '@/lib/axios'

interface UpdateProfileProps {
  name: string
  description: string
}

export function updateProfile({ name, description }: UpdateProfileProps) {
  return api.put('profile', { name, description })
}
