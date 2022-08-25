import { Content } from '@src/Components/Content'
import { Sidebar } from '@src/Components/Sidebar'
import { useFileContext } from '@src/Contexts/Files.Context'
import React, { useMemo } from 'react'

export const Home: React.FC<any> = () => {
  const { fileSelected } = useFileContext()

  const hasId = useMemo(() => !!fileSelected.id, [fileSelected])

  return (
    <>
      <Sidebar />

      {hasId && (
        <Content />
      )}
    </>
  )
}
