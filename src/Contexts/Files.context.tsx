import { api, urls } from '@src/Services/Api'
import React, { useContext, createContext, useState } from 'react'

export interface iFileOrDirectory {
  id: number
  hierarchy: string | number | null
  isDirectory: boolean
  name: string
  children: iFileOrDirectory[]
}

export interface iFile {
  content: string
  id: number
  name: string
  item?: iFileOrDirectory
}

interface iFileContext {
  files: iFileOrDirectory[]
  filesSearch: iFile[]
  setFilesSearch(items: iFile[]): void
  fileSelected: iFile
  setFileSelected(item: iFile | any): void
  searchFiles(): void
  searchFileById(item: iFileOrDirectory): void
  deleteById(): void
  updateById(text: string): void
}

const returnWithoutFileById = (
  items: iFileOrDirectory[],
  idToRemove: number,
) : iFileOrDirectory[] => items.filter((item) => {
  if (item.id !== idToRemove) {
    const res = item

    if (res.children && res.children.length) {
      res.children = returnWithoutFileById(res.children, idToRemove)
    }

    return true
  }

  return false
})

const returnNameUpdated = (
  item: iFileOrDirectory,
  currentId: number,
  name: string,
) : iFileOrDirectory => {
  if (item.id === currentId) {
    return {
      ...item,
      name,
    }
  }

  const res = item

  if (res.children && res.children.length) {
    res.children = res.children.map((itemChildren) => (
      returnNameUpdated(itemChildren, currentId, name)
    ))
  }

  return res
}

export const FileContext = createContext({} as iFileContext)

export const useFileContext = () => useContext(FileContext)

export const FileProvider: React.FC<any> = ({ children }) => {
  const [files, setFiles] = useState<iFileOrDirectory[]>([] as iFileOrDirectory[])
  const [filesSearch, setFilesSearch] = useState<iFile[]>([] as iFile[])
  const [fileSelected, setFileSelected] = useState<iFile>({} as iFile)

  const searchFiles = async () => {
    try {
      const { data } : { data: iFileOrDirectory[] } = await api.get(urls.getAll)

      setFiles(data)
    } catch (error) {
      console.error(error)
    }
  }

  const searchFileById = async (item: iFileOrDirectory) => {
    const findFile = filesSearch.find(({ id }) => id === item.id)

    if (findFile) {
      return setFileSelected(findFile)
    }

    try {
      const { data } : { data: iFile } = await api.get(`${urls.general}${item.id}`)

      const newData = {
        ...data,
        item,
      }
      setFileSelected(newData)
      setFilesSearch((prevState) => (
        [
          ...prevState,
          newData,
        ]
      ))
    } catch (err) {
      console.error(err)
    }
  }

  const updateById = async (newText: string) => {
    try {
      const newFile = {
        ...fileSelected,
        content: newText,
      }

      await api.put(`${urls.general}${fileSelected.id}`, newFile)

      const newFilesSearch = filesSearch.map((file) => {
        if (file.id === newFile.id) {
          return newFile
        }

        return file
      })

      const newFiles = files.map((file) => (
        returnNameUpdated(file, fileSelected.id, fileSelected.name)
      ))

      setFiles(newFiles)
      setFilesSearch(newFilesSearch)
      setFileSelected(newFile)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteById = async () => {
    try {
      await api.delete(`${urls.general}${fileSelected.id}`)

      const newFiles = returnWithoutFileById(files, fileSelected.id)

      setFiles(newFiles)
      setFileSelected({} as iFile)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <FileContext.Provider value={{
      files,
      filesSearch,
      setFilesSearch,
      fileSelected,
      setFileSelected,
      searchFiles,
      searchFileById,
      deleteById,
      updateById,
    }}
    >
      { children }
    </FileContext.Provider>
  )
}
