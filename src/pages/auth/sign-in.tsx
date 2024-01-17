import { Label } from '@radix-ui/react-label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  // username: z.string().optional(),
  // password: z.string().min(6, { message: 'Senha inválido' }),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>()

  async function handleSignIn(data: SignInFormData) {
    try {
      console.log(data)
      await new Promise((resolver) => setTimeout(resolver, 2000))
      throw new Error('Algo deu errado. Tente novamente mais tarde.')
      toast.success('Enviamos um link de verificação para o seu e-mail.')
    } catch (error: any) {
      console.log(error) 
      toast.error(error.message)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
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
*/
