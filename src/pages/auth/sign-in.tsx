import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  // username: z.string().optional(),
  // password: z.string().min(6, { message: 'Senha inválido' }),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [seachParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: seachParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  // mutateAsync -> vai executar a mutação e aguardar a resposta. No caso, o signIn

  async function handleSignIn(data: SignInFormData) {
    try {
      await authenticate({ email: data.email })
      toast.success('Enviamos um link de acesso para o seu e-mail!', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn,
        },
      })
    } catch {
      toast.error('Ocorreu um erro inesperado')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

/*
  ANOTAÇÕES -----------------------------------------------------
  tracking-tighter: vai deixar a font um pouco mais grudada.
  register: vai registrar os dados/campos do formulário.
  handleSubmit: vai processar os dados do formulário.
  hasChildren -> Button: ele vai transformar o elemento em um Slot, quer dizer, que todos os elementos do Button será incluídos no componente filho, por exemplo, o className.
*/
