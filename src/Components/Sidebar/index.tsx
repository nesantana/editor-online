import { api, urls } from '@src/Services/Api'
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
  onClick: () => void
}

export const Sidebar: React.FC<any> = () => {
  const [tree, setTree] = useState<iFileOrDirectory[]>([])
  const [open, setOpen] = useState<number[]>([])

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
    onClick,
  } : iCurrentComponent) => {
    if (isDirectory) {
      return (
        <Directory onClick={onClick}>
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
      <File onClick={onClick}>
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

  return (
    <ContentSidebar>
      { tree.map((item) => (
        <Son key={`${item.id}-directory`}>
          <CurrentComponent
            id={item.id}
            isDirectory={item.isDirectory}
            text={`${item.name}`}
            onClick={() => handleSetOpen(item.id)}
          />

          {open.includes(item.id) && item.children.map((son) => (
            <Son key={`${son.id}-son`}>
              <CurrentComponent
                id={son.id}
                isDirectory={son.isDirectory}
                text={`${son.name}`}
                onClick={() => handleSetOpen(son.id)}
              />

              {open.includes(son.id) && son.children.map((grandson) => (
                <Son key={`${grandson.id}-grandson`}>
                  <CurrentComponent
                    id={grandson.id}
                    isDirectory={grandson.isDirectory}
                    text={`${grandson.name}`}
                    onClick={() => handleSetOpen(grandson.id)}
                  />

                  {open.includes(grandson.id) && grandson.children.map((grandgrandson) => (
                    <Son key={`${grandgrandson.id}-grandgrandson`}>
                      <CurrentComponent
                        id={grandgrandson.id}
                        isDirectory={grandgrandson.isDirectory}
                        text={`${grandgrandson.name}`}
                        onClick={() => handleSetOpen(grandgrandson.id)}
                      />

                      {
                        open.includes(grandgrandson.id)
                        && !!grandgrandson.children
                        && grandgrandson.children.map((grandgrandgrandson) => (
                          <Son key={`${grandgrandgrandson.id}-grandgrandgrandson`}>
                            <CurrentComponent
                              id={grandgrandgrandson.id}
                              isDirectory={grandgrandgrandson.isDirectory}
                              text={`${grandgrandgrandson.name}`}
                              onClick={() => handleSetOpen(grandgrandgrandson.id)}
                            />
                          </Son>
                        ))
                      }
                    </Son>
                  ))}
                </Son>
              ))}
            </Son>
          ))}
        </Son>
      )) }
      <div />
    </ContentSidebar>
  )
}
