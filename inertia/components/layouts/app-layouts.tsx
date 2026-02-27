import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import AppSidebar from '@/components/layouts/app-sidebar'
import { useFlash } from '@/hooks/use-flash'
import { Toaster } from '@/components/ui/sonner'

interface AppLayoutsProps {
  children: ReactNode
}

export default function AppLayouts({ children }: AppLayoutsProps) {
  useFlash()

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>
        <div className="container mx-auto py-8">
          {children}
          <Toaster richColors />
        </div>
      </main>
    </SidebarProvider>
  )
}
