import ProfileLayout from '@/features/profile/layouts/profile-layout'
import UpdatePasswordProfile from '@/features/profile/components/update-password-profile'
import UpdateProfile from '@/features/profile/components/update-profile'

interface ProfileUpdateProps {
  user: {
    fullName: string
    email: string
  }
}

export default function ProfileUpdate({ user }: ProfileUpdateProps) {
  return (
    <ProfileLayout>
      <div className="space-y-6">
        <UpdateProfile user={user} />
        <UpdatePasswordProfile />
      </div>
    </ProfileLayout>
  )
}
