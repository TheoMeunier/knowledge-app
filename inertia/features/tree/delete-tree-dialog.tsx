import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useForm } from '@inertiajs/react'

interface DeleteObjectTree {
  id: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteObjectTree(props: DeleteObjectTree) {
  const { delete: destroy, processing } = useForm()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    destroy(`/folders/${props.id}/delete`, {
      onSuccess: () => {
        props.onOpenChange(false)

        window.dispatchEvent(
          new CustomEvent('refresh-fragment', {
            detail: { source: 'folders/list' },
          })
        )
      },
    })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader className="items-center text-center mb-4 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <DialogTitle className="mt-4">Remove folder or file ?</DialogTitle>

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
              {processing ? 'Removing...' : 'Remove'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
