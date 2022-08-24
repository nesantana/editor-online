import { Content } from '@src/Components/Content'
import { Sidebar } from '@src/Components/Sidebar'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export const Home: React.FC<any> = () => {
  const { query } = useRouter()

  const id = useMemo(() => Number(query.id) ?? 0, [query])

  return (
    <>
      <Sidebar />

      {id && (
        <Content id={id} />
      )}
    </>
  )
}
