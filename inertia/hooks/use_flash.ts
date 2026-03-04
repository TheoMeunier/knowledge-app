import { useEffect } from 'react'
import { toast } from 'sonner'
import { usePage } from '@inertiajs/react'

type FlashMessages = {
  success?: string
}

export function useFlash() {
  const { flash } = usePage<{ flash: FlashMessages }>().props

  useEffect(() => {
    if (flash.success) toast.success(flash.success)
  }, [flash])
}
