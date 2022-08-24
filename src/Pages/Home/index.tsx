import { api, urls } from '@src/Services/Api'
import React, { useEffect } from 'react'

export const Home: React.FC<any> = () => {
  const searchAll = async () => {
    try {
      const { data } = await api.get(urls.getAll)

      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    searchAll()
  }, [])

  return (
    <>Start</>
  )
}
