import { useForm } from '@inertiajs/react'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function UpdatePasswordProfile() {
  const { data, setData, post, processing, errors } = useForm({
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/profile/update/password', {})
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Update Password</h2>
        <p className="text-sm text-muted-foreground">
          Changing your password will log you out of all your sessions. You will need to log in
          again.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              id="password"
              type="password"
              required
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password_confirmation">Password Confirmation</FieldLabel>
            <Input
              value={data.passwordConfirmation}
              onChange={(e) => setData('passwordConfirmation', e.target.value)}
              id="password_confirmation"
              type="password"
              required
            />
            {errors.password && <FieldError>{errors.passwordConfirmation}</FieldError>}
          </Field>
        </FieldGroup>

        <div>
          <Button type="submit" disabled={processing}>
            {processing && <Loader2 className="animate-spin" />}
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}
