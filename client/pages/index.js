import axios from "axios"

const LandindgPage = ({currentUser}) => {
  console.log(currentUser)

  return <h1>Landing Page</h1>
}

LandindgPage.getIntialProps = async () => {
  const response = await axios.get('/api/users/currentuser')

  return response.data
}

export default LandindgPage