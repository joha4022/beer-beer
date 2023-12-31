import styled from 'styled-components'

const Category = styled.div`
  color: ${props => props.theme === 'red' ? 'red' : 'gray'};
  font-weight: ${props => props.boldness === 'normal' ? 'normal' : 'bold'};
  font-size: ${props => props.theme === 'red' ? '' : '13px'};
`

const OfficialLink = styled.a`
  text-decoration: none;
  color: #1D8698;
  margin-top: 10px;
  margin-bottom: 10px;
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
  width: 40vw;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`
const LocalBreweryBox = styled(BreweryBox)`
  background: #f6c48e;
  width: 40vw;
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
  text-align: center;
`

const Megah3 = styled.h3`
  margin-top: 0px;
  font-size: 50px;
  text-align: center;
`

const DetailDiv = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
`

const SpaceDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`

const OfficialLinkDiv = styled(SpaceDiv)`
  margin-top: 10px;
  margin-bottom: 10px; 
`

const DiscoverButton = styled.button`
  border: none;
  font-family: CooperHewittBold;
  font-size: 15px;
  background: #EC9d00;
  padding: 15px;
  color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`

const PageNumber = styled.span`
  color: ${props => props.theme === 'active' ? '#ec9d00' : 'black'};
  margin: 30px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`
const PageNumberBottom = styled(PageNumber)`
  margin-bottom: 50px;
  margin-top: 10px;
`
export {
  Category,
  OfficialLink,
  GetDirection,
  BreweryBox,
  LocalBreweryBox,
  Megah1,
  Megah3,
  DetailDiv,
  SpaceDiv,
  OfficialLinkDiv,
  DiscoverButton,
  PageNumber,
  PageNumberBottom
}