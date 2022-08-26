import { themes } from '@src/Contexts/Theme.context'
import styled from 'styled-components'

interface iBoxContent {
  theme: themes
}

export const BoxContent = styled.div<iBoxContent>`
  position: fixed;
  left: min(300px, 30%);
  bottom: 0;
  height: 100%;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: auto;
  ${({ theme }) => {
    if (theme === 'moon') {
      return `
        background: #2f2f2f;
        &, & * {
          color: #FFFFFF;
        }
      `
    }
  }}
`

export const BoxContentTextEditor = styled.div`
  margin: 30px 0;
`

const defaultButton = `
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  height: 45px;
  width: 200px;
  cursor: pointer;
  border-radius: 4px;
`

export const ButtonSave = styled.div`
  ${defaultButton}
  background: #1c6b1f;

  &:hover {
    background: #175319;
  }
`

export const ButtonDelete = styled.div`
  ${defaultButton}
  background: #FF0000;

  &:hover {
    background: #810505;
  }
`

export const BoxContentButton = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputNameFile = styled.input`
  width: 100%;
  padding: 0 15px;
  border: 1px solid #bbbbbb;
  height: 65px;
  font-size: 35px;
  background: transparent;
`

export const BoxTheme = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  & > svg {
    margin-left: 15px;
    padding: 5px;
    font-size: 30px;
    border-radius: 4px;
  }

  & > svg.active {
    background: #000000;
    color: #FFFFFF;
  }
`
