import { Head, useForm } from '@inertiajs/react'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LibraryBig, Loader2 } from 'lucide-react'

export default function Login() {
  const { data, setData, processing, post, reset, errors } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/login', {
      preserveScroll: true,
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Head title="Login" />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center items-center gap-2 text-lg font-semibold">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <LibraryBig className="size-5" />
          </div>
          Knowledge
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Please enter your credentials to log in.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  {(errors.email || errors.password) && (
                    <FieldError>These credentials do not match our records.</FieldError>
                  )}

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="john.doe@knowledge.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={processing}>
                      {processing && <Loader2 className="animate-spin" />}
                      Login
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
