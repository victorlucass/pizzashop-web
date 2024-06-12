import { api } from '@/lib/axios'

export interface ManagerRestaurantProps {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function managerRestaurantGet() {
  const { data: managerRestaurant } =
    await api.get<ManagerRestaurantProps>('managed-restaurant')
  return managerRestaurant
}
