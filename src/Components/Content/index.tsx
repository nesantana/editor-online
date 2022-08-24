import { api, urls } from '@src/Services/Api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import {
  BoxContent, BoxContentButton, BoxContentTextEditor, ButtonDelete, ButtonSave,
} from './styled'

interface iContent {
  id: number
}

interface iFile {
  content: string
  id: number
  name: string
}

export const Content: React.FC<iContent> = ({ id }) => {
  const [file, setFile] = useState<iFile>({} as iFile)
  const { push: pushRouter } = useRouter()

  const modules = {
    toolbar: [
      [],
    ],
  }

  const {
    quill, quillRef,
  } = useQuill({ modules })

  const searchFileById = async () => {
    try {
      const { data } : { data: iFile } = await api.get(`${urls.general}${id}`)

      setFile(data)
      quill.setText(data.content)
    } catch (err) {
      console.error(err)
    }
  }

  const updateById = async () => {
    try {
      const newFile = {
        ...file,
        content: quillRef.current.innerText,
      }

      await api.put(`${urls.general}${id}`, newFile)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteById = async () => {
    try {
      await api.put(`${urls.general}${id}`)

      pushRouter('/')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (quill) {
      searchFileById()
    }
  }, [id, quill])

  return (
    <BoxContent>
      <h1>{file.name}</h1>

      <BoxContentTextEditor>
        <div ref={quillRef} />
      </BoxContentTextEditor>

      <BoxContentButton>
        <ButtonDelete onClick={deleteById}>
          Deletar
        </ButtonDelete>

        <ButtonSave onClick={updateById}>
          Salvar
        </ButtonSave>
      </BoxContentButton>
    </BoxContent>
  )
}
