import styled from 'styled-components'

const Category = styled.div`
  color: ${props => props.theme === 'red' ? 'red' : 'gray'};
  font-weight: ${props => props.boldness === 'normal' ? 'normal' : 'bold'};
  font-size: ${props => props.theme === 'red' ? '' : '13px'};
`

const OfficialLink = styled.a`
  text-decoration: none;
  color: #1D8698;
  margin: 0px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`
const GetDirection = styled(OfficialLink)`
  color: #FB3617;
  font-weight: bold;
`

const BreweryBox = styled.div`
  background: #f6c48e;
  width: 35vw;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`

const Megah1 = styled.h1`
  font-size: 100px;
`

const Megah3 = styled.h3`
  font-size: 50px;
`

export { 
  Category, 
  OfficialLink,
  GetDirection,
  BreweryBox,
  Megah1,
  Megah3
}