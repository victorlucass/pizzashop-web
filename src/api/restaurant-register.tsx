import { api } from '@/lib/axios'

interface RestaurantRegisterProps {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export async function restaurantRegister({
  restaurantName,
  managerName,
  phone,
  email,
}: RestaurantRegisterProps) {
  await api.post('restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })
}
