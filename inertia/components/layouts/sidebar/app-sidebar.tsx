import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { BadgeCheck, ChevronsUpDown, LibraryBig, LogOut, Settings, Share2 } from 'lucide-react'
import { FragmentLoader } from '@/components/load_fragment'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link, router, usePage } from '@inertiajs/react'
import { getInitials } from '@/lib/utils'
import Role from '#enums/role'

interface CurrentUserPropsPage {
  user: {
    username: string
    email: string
    role: Role
  }
  [key: string]: unknown
}

export default function AppSidebar() {
  const { props } = usePage<CurrentUserPropsPage>()
  const { isMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-center py-5 gap-3">
        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
          <LibraryBig className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold">Knowledge</h1>
      </SidebarHeader>
      <FragmentLoader source={'/folders/list'} />
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getInitials(props.user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{props.user.username}</span>
                    <span className="truncate text-xs">{props.user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {getInitials(props.user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{props.user.username}</span>
                      <span className="truncate text-xs">{props.user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <BadgeCheck />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/shares">
                      <Share2 />
                      Shares
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {props.user.role === Role.ADMIN && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive" asChild>
                        <Link href="/admin">
                          <Settings />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button onClick={() => router.delete('/logout')}>
                    <LogOut />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
