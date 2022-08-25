import styled from 'styled-components'

export const BoxContent = styled.div`
  position: fixed;
  left: min(300px, 30%);
  bottom: 0;
  height: 100%;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: auto;
`

export const BoxContentTextEditor = styled.div`
  margin: 30px 0;
`

export const ButtonSave = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  background: #1c6b1f;
  height: 45px;
  width: 200px;
  cursor: pointer;
`

export const ButtonDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  background: #FF0000;
  height: 45px;
  width: 200px;
  cursor: pointer;
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
`
