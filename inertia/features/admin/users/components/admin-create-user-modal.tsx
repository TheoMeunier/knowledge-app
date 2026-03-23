import { router, useForm } from '@inertiajs/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AdminCreateUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdminCreateUserModal({ open, onOpenChange }: AdminCreateUserModalProps) {
  const { data, setData, processing, errors } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 0,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.post('/admin/users/store', data, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>Create user</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="john doe"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                />
                {errors.username && <FieldError>{errors.username}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@knowledge.com"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
            </div>
            <Field>
              <Label htmlFor="p">Role</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choice role your user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">ADMIN</SelectItem>
                    <SelectItem value="1">MAINTAINER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role && <FieldError>{errors.role}</FieldError>}
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="p">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <FieldError>{errors.password}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="password_confirmation">Password</Label>
                <Input
                  id="password_confirmation"
                  name="password"
                  type="password"
                  value={data.passwordConfirmation}
                  onChange={(e) => setData('passwordConfirmation', e.target.value)}
                />
                {errors.passwordConfirmation && (
                  <FieldError>{errors.passwordConfirmation}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter className="grid grid-cols-2 gap-2 mt-7">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={processing} className="w-full">
              {processing && <Loader2 className="animate-spin" />}
              {processing ? 'Creating' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
