import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UpdateProfileProps {
  user: {
    username: string
    email: string
  }
}

export default function UpdateProfile({ user }: UpdateProfileProps) {
  const { data, setData, post, processing, errors } = useForm({
    fullName: user.username,
    email: user.email,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/profile/update', {})
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information to keep your account accurate and secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Username</FieldLabel>
            <Input
              value={data.fullName}
              onChange={(e) => setData('fullName', e.target.value)}
              id="name"
              type="text"
              required
            />
            {errors.fullName && <FieldError>{errors.fullName}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              id="email"
              type="email"
              required
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
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
