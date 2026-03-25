import AdminLayout from '@/features/admin/layouts/admin-layout'
import { LucideUsers, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import AdminCreateUserModal from '@/features/admin/users/components/admin-create-user-modal'
import AdminDeleteUserDialog from '@/features/admin/users/components/admin-delete-user-dialog'
import AdminUpdateUserDialog from '@/features/admin/users/components/admin-update-user-dialog'

export default function Users({ users }: { users: any[] }) {
  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <LucideUsers className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        </div>
        <div>
          <Button onClick={() => setOpenCreateUser(true)} className="flex items-center gap-2">
            <Plus />
            Create user
          </Button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center space-y-3">
          <LucideUsers className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm"></p>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Username</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Role</TableHead>
                <TableHead className="font-medium">Created At</TableHead>
                <TableHead className="text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id ?? index} className="group h-14">
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  {user.email !== 'admin@knowledge.fr' && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <AdminUpdateUserDialog user={user} />
                        <AdminDeleteUserDialog id={user.id} />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AdminCreateUserModal open={openCreateUser} onOpenChange={setOpenCreateUser} />
    </AdminLayout>
  )
}
