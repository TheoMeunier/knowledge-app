import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'

interface FragmentLoaderProps {
  source: string
  fallback?: React.ReactNode
}

export function FragmentLoader({ source, fallback }: FragmentLoaderProps) {
  const { version: assetVersion } = usePage()
  const [component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [componentProps, setComponentProps] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const response = await fetch(source, {
        headers: {
          'X-Inertia': 'true',
          'X-Inertia-Fragment': 'true',
          'X-Inertia-Version': assetVersion ?? '',
        },
      }).then((r) => r.json())

      setComponentProps(response.props)

      const modules = import.meta.glob('../fragments/**/*.tsx')
      const key = `../fragments/${response.component}.tsx`
      const mod = (await modules[key]()) as any
      setComponent(() => mod.default)
    }

    load()
  }, [source])

  if (component === null) {
    return <>{fallback}</>
  }

  const Component = component
  return <Component {...componentProps} />
}
