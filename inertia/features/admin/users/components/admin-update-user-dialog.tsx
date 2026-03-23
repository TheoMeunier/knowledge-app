import { router, useForm } from '@inertiajs/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, SquarePen } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

interface AdminUpdateUserModalProps {
  user: {
    id: number
    username: string
    email: string
    role: string
  }
}

export default function AdminUpdateUserDialog({ user }: AdminUpdateUserModalProps) {
  const [open, setOpen] = useState(false)

  const { data, setData, processing, errors } = useForm({
    username: user.username,
    email: user.email,
    role: user.role === 'ADMIN' ? '0' : '1',
  })

  console.log(user.role, typeof user.role)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.post(
      `/admin/users/${user.id}/update`,
      {
        ...data,
        role: parseInt(data.role),
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>Update user</DialogTitle>
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
              <Select
                value={data.role.toString()}
                onValueChange={(value) => setData('role', value)}
              >
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
          </FieldGroup>
          <DialogFooter className="grid grid-cols-2 gap-2 mt-7">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={processing} className="w-full">
              {processing && <Loader2 className="animate-spin" />}
              {processing ? 'Updating' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
