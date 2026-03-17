import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Loader2 } from 'lucide-react'
import { router } from '@inertiajs/react'

type Props = {
  onUpload: (url: string) => void
}

export function FileUploader({ onUpload }: Props) {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      setProcessing(true)
      setError(null)

      router.post('/upload', formData, {
        forceFormData: true,
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          if (!isMounted.current) return
          const share = (page.props as { flash?: { share?: string } }).flash?.share
          if (share) {
            onUpload(share)
          } else {
            setError('Upload succeeded but no URL returned')
          }
        },
        onError: (errors) => {
          if (!isMounted.current) return
          setError(errors.file ?? 'Upload failed')
        },
        onFinish: () => {
          if (isMounted.current) setProcessing(false)
        },
      })
    },
    [onUpload]
  )

  const onDropRejected = useCallback((rejectedFiles: import('react-dropzone').FileRejection[]) => {
    const code = rejectedFiles[0]?.errors[0]?.code
    if (code === 'file-too-large') setError('File is too large (max 5mb)')
    else if (code === 'file-invalid-type') setError('Invalid file type')
    else setError('File rejected')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    disabled: processing,
  })

  return (
    <div
      {...getRootProps()}
      className={`
        flex flex-col items-center justify-center
        p-12 border-2 border-dashed rounded-lg transition-colors duration-200
        ${processing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />

      {processing ? (
        <div className="flex flex-col items-center gap-2 text-primary">
          <Loader2 className="animate-spin" />
          <p>Uploading…</p>
        </div>
      ) : isDragActive ? (
        <p className="text-blue-500 font-medium">Drop the image here</p>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-gray-600 font-medium">Drag & drop an image here</p>
          <p className="text-gray-400 text-sm">or click to browse</p>
          <p className="text-gray-400 text-xs mt-2">JPG, PNG, WEBP — max 5mb</p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  )
}
