import AppLayouts from '@/components/layouts/app-layouts'
import { FileText, Home, Share2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Head, Link, usePage } from '@inertiajs/react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage()

  const sections = [
    {
      title: 'Gestion',
      items: [
        {
          id: 'dashboard',
          url: '/admin',
          label: 'Dashboard',
          icon: Home,
        },
        {
          id: 'users',
          url: '/admin/users',
          label: 'Users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          id: 'files',
          url: '/admin/files',
          label: 'Files',
          icon: FileText,
        },
        {
          id: 'shares',
          url: '/admin/shares',
          label: 'Shares',
          icon: Share2,
        },
      ],
    },
  ]

  return (
    <AppLayouts>
      <Head title="Admin" />

      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-background flex flex-col">
          <nav className="flex-1 p-4 space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase">
                  {section.title}
                </p>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = url === item.url

                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'w-full justify-start font-normal',
                          isActive && 'bg-secondary font-medium'
                        )}
                        asChild
                      >
                        <Link href={item.url}>
                          <Icon className="mr-3 h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </AppLayouts>
  )
}
