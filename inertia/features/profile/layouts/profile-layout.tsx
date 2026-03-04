import AppLayouts from '@/components/layouts/app-layouts'
import { Share2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Head, Link, usePage } from '@inertiajs/react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage()

  const navItems = [
    {
      id: 'account',
      url: '/profile',
      label: 'Account',
      icon: User,
    },
    {
      id: 'shares',
      url: '/profile/shares',
      label: 'Shares',
      icon: Share2,
    },
  ]

  return (
    <AppLayouts>
      <Head title="Profile" />

      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-background">
          <nav className="space-y-1 p-4">
            {navItems.map((item) => {
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
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </AppLayouts>
  )
}
