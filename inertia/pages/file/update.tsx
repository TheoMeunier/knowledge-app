import AppLayouts from '@/components/layouts/app-layouts'
import MdEditor from '@/components/form/mdeditor'
import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface FileProps {
  file: {
    id: number
    title: string
    slug: string
    content: string
    createdAt: string
  }
}

export default function UpdateFile({ file }: FileProps) {
  const { data, setData, post, processing } = useForm({
    content: file.content,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    post(`/file/${file.id}/edit`, {})
  }

  return (
    <AppLayouts>
      <Head title="Update file" />

      <form onSubmit={handleSubmit}>
        <MdEditor
          defaultValue={data.content}
          name={'content'}
          value={data.content}
          onChange={(v) => setData('content', v)}
        />

        <div className="flex justify-end items-center gap-3">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={processing}>
            {processing && <Loader2 className="animate-spin" />}
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </AppLayouts>
  )
}
