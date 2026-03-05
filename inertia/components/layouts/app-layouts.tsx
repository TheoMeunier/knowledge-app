import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import AppSidebar from '@/components/layouts/sidebar/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { useFlash } from '@/hooks/use_flash'
import AppBreadcrumb from '@/components/layouts/breadcrumb/app-breadcrumb'

interface AppLayoutsProps {
  children: ReactNode
}

export default function AppLayouts({ children }: AppLayoutsProps) {
  useFlash()

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <AppBreadcrumb />
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8">
            {children}
            <Toaster richColors />
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
