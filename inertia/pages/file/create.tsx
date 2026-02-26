import AppLayouts from '@/components/layouts/app-layouts'
import MdEditor from '@/components/form/mdeditor'
import { useForm } from '@inertiajs/react'

export default function CreateFile() {
  const { data, setData, post } = useForm({
    title: '',
    content: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    post(`/file/${id}/edit`, {})
  }

  return (
    <AppLayouts>
      <form onSubmit={handleSubmit}>
        <div>
          <MdEditor defaultValue={'Default value'} name={'content'} />
        </div>
      </form>
    </AppLayouts>
  )
}
