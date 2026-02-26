import { useEffect, useRef } from 'react'
import 'easymde/dist/easymde.min.css'
import EasyMDE from 'easymde'

type Props = {
  defaultValue: string
  name: string
}

export default function MdEditor(props: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorRef = useRef<EasyMDE | null>(null)

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
        'code',
        '|',
        'side-by-side',
        'fullscreen',
        '|',
        'guide',
      ],
    })

    return () => {
      editorRef.current?.toTextArea()
      editorRef.current = null
    }
  }, [])

  return (
    <div className="mdeditor">
      <textarea ref={textareaRef} name={props.name} defaultValue={props.defaultValue} />
    </div>
  )
}
