import styled from 'styled-components'

export const ContentSidebar = styled.div`
  height: 100vh;
  width: min(30%, 300px);
  background: #2b2a4a;
  color: #FFFFFF;
  overflow: hidden;
`

export const Son = styled.div`
  padding: 0 15px;
  border-left: 1px solid rgba(255, 255, 255, .1);
`

export const Directory = styled.div`
  height: 45px;
  display: flex;
  padding: 0 25px;
  align-items: center;
  position: relative;
  margin: 0 -15px;
  cursor: pointer;
  
  & svg {
    position: absolute;
    left: 7px;
  }

  &:hover {
    background: rgba(0,0,0,.1);
  }
`

export const File = styled.div`
  height: 45px;
  align-items: center;
  display: flex;
  padding: 0 15px;
  min-width: 300px;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,.1);
  }
`
