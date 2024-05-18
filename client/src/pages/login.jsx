
import Navbar from "../components/navbar"
import Panel from '../components/panel'

export default function Login(){
  return (
    <>
      <Navbar/>
      <div id="login-content">
        <Panel content={<span>hello</span>}/> 
      </div>
    </>
  )
}
