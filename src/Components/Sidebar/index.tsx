import { iFileOrDirectory, useFileContext } from '@src/Contexts/Files.Context'
import React, { useEffect, useState } from 'react'
import { BsFillFileEarmarkMinusFill } from 'react-icons/bs'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import {
  ContentSidebar, Directory, File, Son,
} from './styled'

interface iCurrentComponent {
  id: number
  isDirectory: boolean
  text: string
  item: iFileOrDirectory
}

export const Sidebar: React.FC<any> = () => {
  const { searchFileById, files, searchFiles } = useFileContext()

  const [open, setOpen] = useState<number[]>([])

  useEffect(() => {
    searchFiles()
  }, [])

  const CurrentComponent = ({
    id,
    isDirectory,
    text,
    item,
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
      <File onClick={() => handleSetOpenFile(item)}>
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

  const handleSetOpenFile = (item: iFileOrDirectory) => {
    searchFileById(item)
  }

  const RenderFiles = ({ item } : { item: iFileOrDirectory }) => (
    <Son key={`${item.id}-${item.name}-inside`}>
      <CurrentComponent
        item={item}
        id={item.id}
        isDirectory={item.isDirectory}
        text={`${item.name}`}
      />

      {
          (
            open.includes(item.id)
            && !!item.children
            && !!item.children.length
          )
          && item.children.map((son) => (
            <RenderFiles key={`${son.id}-renderFiles`} item={son} />
          ))
        }
    </Son>
  )

  return (
    <ContentSidebar>
      { files.map((item) => (
        <RenderFiles key={`${item.id}-renderFiles`} item={item} />
      )) }
      <div />
    </ContentSidebar>
  )
}
