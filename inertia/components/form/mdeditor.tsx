import { useEffect, useRef, useState } from 'react'
import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'
import { Dialog, DialogContent } from '../ui/dialog'
import { FileUploader } from '@/components/form/file-upload'

type Props = {
  defaultValue: string
  name: string
  value: string
  onChange?: (value: string) => void
}

export default function MdEditor(props: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorRef = useRef<EasyMDE | null>(null)
  const [fileExplorerOpen, setFileExplorerOpen] = useState(false)

  useEffect(() => {
    if (!textareaRef.current || editorRef.current) {
      return
    }

    editorRef.current = new EasyMDE({
      element: textareaRef.current,
      status: false,
      spellChecker: false,
      unorderedListStyle: '-',
      sideBySideFullscreen: false,
      indentWithTabs: false,
      previewClass: ['prose', 'p-8', 'max-w-175', 'mx-auto'],
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        {
          name: 'image',
          action: () => setFileExplorerOpen(true),
          className: 'fa fa-image',
          title: 'Insert image',
        },
        'code',
        '|',
        'side-by-side',
        'fullscreen',
        '|',
        'guide',
      ],
    })

    if (props.onChange) {
      editorRef.current.codemirror.on('change', () => {
        props.onChange?.(editorRef.current!.value())
      })
    }

    return () => {
      editorRef.current?.toTextArea()
      editorRef.current = null
    }
  }, [])

  return (
    <div className="mdeditor">
      <textarea ref={textareaRef} name={props.name} defaultValue={props.defaultValue} />
      <Dialog open={fileExplorerOpen} onOpenChange={setFileExplorerOpen}>
        <DialogContent className="p-0 max-w-300">
          <FileUploader
            onUpload={(url) => {
              const cm = editorRef.current?.codemirror
              if (cm) {
                const cursor = cm.getCursor()
                cm.replaceRange(`![image](${url})`, cursor)
              }

              setFileExplorerOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
