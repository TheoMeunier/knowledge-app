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
import { useForm, usePage } from '@inertiajs/react'
import { Copy, Loader2, Share2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface ShareFolderProps {
  folderId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ShareFolderDialog({ folderId, open, onOpenChange }: ShareFolderProps) {
  const { props } = usePage<{ flash: { share?: string } }>()
  const { processing, post } = useForm({
    folderId: folderId,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(`/folders/${folderId}/share`, {})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader className="items-center text-center mb-4 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Share2 className="h-6 w-6 text-primary" />
            </div>

            <DialogTitle className="mt-4">Share folder ?</DialogTitle>

            <DialogDescription className="text-sm text-center text-muted-foreground mb-4">
              Anyone with the link will have read-only access to this folder. You can revoke access
              at any time.
            </DialogDescription>

            {props.flash?.share && (
              <div className="flex gap-2 mb-4">
                <Input readOnly value={props.flash.share} />
                <Button
                  variant="outline"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigator.clipboard.writeText(props.flash.share!)
                    toast.success('The URL share has been copied!')
                  }}
                >
                  <Copy />
                </Button>
              </div>
            )}
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>

            <Button className="w-full" type="submit">
              {processing && <Loader2 className="animate-spin" />}
              {processing ? 'Sharing' : 'Share'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
