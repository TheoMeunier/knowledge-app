import AppLayouts from '@/components/layouts/app-layouts'
import MdEditor from '@/components/form/mdeditor'
import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { FieldError } from '@/components/ui/field'

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
  const { data, setData, post, processing, errors } = useForm({
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
        {errors.content && <FieldError>{errors.content}</FieldError>}

        <div className="flex justify-end items-center gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={processing}>
            {processing && <Loader2 className="animate-spin" />}
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </AppLayouts>
  )
}
