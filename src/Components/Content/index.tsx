import { iFile, useFileContext } from '@src/Contexts/Files.context'
import React, { useEffect, useMemo } from 'react'
import { useQuill } from 'react-quilljs'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { themes, useThemeContext } from '@src/Contexts/Theme.context'
import {
  BoxContent,
  BoxContentButton,
  BoxContentTextEditor,
  BoxTheme,
  ButtonDelete,
  ButtonSave,
  InputNameFile,
} from './styled'

const buttonsTheme = [
  {
    id: 'moon',
    component: BsFillMoonFill,
  },
  {
    id: 'sun',
    component: BsFillSunFill,
  },
]

export const Content: React.FC<any> = () => {
  const {
    fileSelected,
    setFileSelected,
    deleteById,
    updateById,
  } = useFileContext()

  const { theme, updateTheme } = useThemeContext()

  const hasId = useMemo(() => !!fileSelected.id, [fileSelected])

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
    <BoxContent theme={theme}>
      <BoxTheme>
        {
          buttonsTheme.map(({ id, component: Component }) => (
            <Component
              key={id}
              className={theme === id ? 'active' : ''}
              onClick={() => updateTheme(id as themes)}
            />
          ))
        }
      </BoxTheme>

      {
        hasId && (
          <>
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

              <ButtonSave onClick={() => updateById((
                quill
                  ? quill.getText()
                  : fileSelected.content))}
              >
                Salvar
              </ButtonSave>
            </BoxContentButton>
          </>
        )
      }
    </BoxContent>
  )
}
