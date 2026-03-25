import { useState } from 'react'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Check, Copy, Share2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import DeleteShareDialog from '@/features/shares/delete-share-dialog'
import AdminLayout from '@/features/admin/layouts/admin-layout'

interface ShareProfile {
  id: number
  url: string
  folder_path: string
  created_at: string
}
interface AdminSharesProps {
  shares: ShareProfile[]
}

export default function AdminShares({ shares }: AdminSharesProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = (share: ShareProfile) => {
    navigator.clipboard.writeText(share.url).then(() => () => {})

    setCopiedId(share.id)
    toast.success('Link is copied to clipboard!', {
      description: share.url,
    })

    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <AdminLayout>
      <TooltipProvider>
        <div className="flex items-center justify-between mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-semibold tracking-tight">Shares</h1>
            </div>
          </div>
        </div>

        {shares.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center space-y-3">
            <Share2 className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm"></p>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Path</TableHead>
                  <TableHead className="font-medium">Link</TableHead>
                  <TableHead className="font-medium">Created At</TableHead>
                  <TableHead className="text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shares.map((share) => (
                  <TableRow key={share.id} className="group">
                    <TableCell className="font-medium">{share.folder_path}</TableCell>

                    <TableCell>
                      <a
                        href={share.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-primary hover:underline max-w-[200px] truncate"
                      >
                        <span className="truncate">{share.url}</span>
                      </a>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {share.created_at}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopy(share)}
                            >
                              {copiedId === share.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy link</TooltipContent>
                        </Tooltip>
                        <DeleteShareDialog shareId={share.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </TooltipProvider>
    </AdminLayout>
  )
}
