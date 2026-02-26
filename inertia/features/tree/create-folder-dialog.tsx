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
import { useForm } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface CreateFolderProps {
  parentId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateFolderDialog({ parentId, open, onOpenChange }: CreateFolderProps) {
  console.log('parentId', parentId)
  const { data, setData, processing, post } = useForm({
    path: '',
    parentId: parentId,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/folders/create', {})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>Create folder</DialogTitle>
            <DialogDescription>
              Make changes to your knowledge base here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={data.path}
                onChange={(e) => setData('path', e.target.value)}
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
