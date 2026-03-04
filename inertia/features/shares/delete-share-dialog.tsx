import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'

interface DeleteShareProps {
  shareId: number
}

export default function DeleteShareDialog(props: DeleteShareProps) {
  const [open, setOpen] = useState(false)
  const { delete: destroy, processing } = useForm()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    destroy(`/shares/${props.shareId}/delete`, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader className="items-center text-center mb-4 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <DialogTitle className="mt-4">Remove share ?</DialogTitle>

            <DialogDescription className="text-sm text-center text-muted-foreground mb-4">
              This action is irreversible. All associated data will be permanently deleted
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                cancel
              </Button>
            </DialogClose>

            <Button variant="destructive" className="w-full" type="submit">
              {processing && <Loader2 className="animate-spin" />}
              {processing ? 'Removing' : 'Remove'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
