import { iFile, useFileContext } from '@src/Contexts/Files.Context'
import { api, urls } from '@src/Services/Api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import {
  BoxContent, BoxContentButton, BoxContentTextEditor, ButtonDelete, ButtonSave, InputNameFile,
} from './styled'

export const Content: React.FC<any> = () => {
  const {
    fileSelected, setFileSelected, deleteById, updateById,
  } = useFileContext()

  const modules = {
    toolbar: [
      [],
    ],
  }

  const {
    quill, quillRef,
  } = useQuill({ modules })

  useEffect(() => {
    if (quill && fileSelected.content) {
      quill.setText(fileSelected.content)
    }
  }, [fileSelected, quill])

  return (
    <BoxContent>
      <InputNameFile
        value={fileSelected.name}
        onChange={({ target }) => {
          setFileSelected((prevState: iFile) => (
            {
              ...prevState,
              name: target.value,
            } as iFile
          ))
        }}
      />

      <BoxContentTextEditor>
        <div ref={quillRef} />
      </BoxContentTextEditor>

      <BoxContentButton>
        <ButtonDelete onClick={deleteById}>
          Deletar
        </ButtonDelete>

        <ButtonSave onClick={() => updateById(quill.getText())}>
          Salvar
        </ButtonSave>
      </BoxContentButton>
    </BoxContent>
  )
}
