import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { router, useForm } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface CreatePageProps {
  folderId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateFileDialog({ folderId, open, onOpenChange }: CreatePageProps) {
  const { data, setData, processing } = useForm({
    title: '',
    folderId: folderId,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.post('/file/create', data, {
      onFinish: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>Create page</DialogTitle>
            <DialogDescription>
              Make changes to your knowledge base here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="grid grid-cols-2 gap-2 mt-5">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={processing} className="w-full">
              {processing && <Loader2 className="animate-spin" />}
              {processing ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
