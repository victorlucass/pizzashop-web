import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { managerRestaurantGet } from '@/api/manager-restaurant-get'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido' }),
  description: z.string(),
})

type StoreProfileFormData = z.infer<typeof storeProfileFormSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: managerRestaurantGet,
  })
  // tendo a mesma queryKey a requisição não é feita novamente.

  const { register, handleSubmit } = useForm<StoreProfileFormData>({
    resolver: zodResolver(storeProfileFormSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },

    // não usei o defaultValues pois o values fica manitorando os valores.
  })
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
          <Button type="submit" variant="sucess">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
