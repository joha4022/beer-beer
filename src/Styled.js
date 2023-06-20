import styled from 'styled-components'

const Category = styled.span`
  color: gray;
  font-weight: bold;
`

const OfficialLink = styled.a`
  text-decoration: none;
  margin: 0px;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`

const BreweryBox = styled.div`
  background: lightyellow;
  margin: 5px;
  &:hover {
    opacity: 80%;
  }
`

export { 
  Category, 
  OfficialLink,
  BreweryBox
}