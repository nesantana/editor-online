import { api, urls } from '@src/Services/Api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillFileEarmarkMinusFill } from 'react-icons/bs'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import {
  ContentSidebar, Directory, File, Son,
} from './styled'

interface iFileOrDirectory {
  id: number
  isDirectory: boolean
  name: string
  children: iFileOrDirectory[]
}

interface iCurrentComponent {
  id: number
  isDirectory: boolean
  text: string
}

export const Sidebar: React.FC<any> = () => {
  const [tree, setTree] = useState<iFileOrDirectory[]>([])
  const [open, setOpen] = useState<number[]>([])

  const { push: pushRouter } = useRouter()

  const searchAll = async () => {
    try {
      const { data } : { data: iFileOrDirectory[] } = await api.get(urls.getAll)

      console.log(data)
      setTree(data as iFileOrDirectory[])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    searchAll()
  }, [])

  const CurrentComponent = ({
    id,
    isDirectory,
    text,
  } : iCurrentComponent) => {
    if (isDirectory) {
      return (
        <Directory onClick={() => handleSetOpen(id)}>
          {
            open.includes(id)
              ? <FiChevronDown />
              : <FiChevronRight />
          }
          {text}
        </Directory>
      )
    }

    return (
      <File onClick={() => handleSetOpenFile(id)}>
        <BsFillFileEarmarkMinusFill />
        {' '}
        {text}
      </File>
    )
  }

  const handleSetOpen = (id: number) => {
    if (open.includes(id)) {
      const newOpen = open.filter((item) => item !== id)

      return setOpen(newOpen)
    }

    setOpen((prevState) => [...prevState, id])
  }

  const handleSetOpenFile = (id: number) => {
    pushRouter(`/${id}`)
  }

  const RenderFiles = ({ item } : { item: iFileOrDirectory }) => {
    console.log(item)

    return (
      <Son key={`${item.id}-${item.name}-inside`}>
        <CurrentComponent
          id={item.id}
          isDirectory={item.isDirectory}
          text={`${item.name}`}
        />

        {
          (
            open.includes(item.id)
            && item.children
            && item.children.length
          )
          && item.children.map((son) => (
            <RenderFiles key={`${son.id}-renderFiles`} item={son} />
          ))
        }
      </Son>
    )
  }

  return (
    <ContentSidebar>
      { tree.map((item) => (
        <RenderFiles key={`${item.id}-renderFiles`} item={item} />
      )) }
      <div />
    </ContentSidebar>
  )
}
