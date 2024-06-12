import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  managerRestaurantGet,
  ManagerRestaurantProps,
} from '@/api/manager-restaurant-get'
import { updateProfile } from '@/api/update-profile'
import { queryClient } from '@/lib/react-query'

import { Button } from './ui/button'
import {
  DialogClose,
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
    staleTime: Infinity,
  })
  // tendo a mesma queryKey a requisição não é feita novamente.
  // o staleTime é para garantir que a requisição não seja feita novamente. Isso quando o usuário sair da tela.

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileFormData>({
    resolver: zodResolver(storeProfileFormSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
    // não usei o defaultValues pois o values fica manitorando os valores.
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<ManagerRestaurantProps>([
        'managed-restaurant',
      ])

      if (cached) {
        queryClient.setQueryData<ManagerRestaurantProps>(
          ['managed-restaurant'],
          {
            ...cached,
            name,
            description,
          },
        )
      }
    },
  })

  async function handleUpdateProfile({
    name,
    description,
  }: StoreProfileFormData) {
    try {
      await updateProfileFn({ name, description })
      toast.success('Informações atualizadas com sucesso!')
    } catch {
      toast.error('Erro ao atualizar as informações')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="sucess" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
