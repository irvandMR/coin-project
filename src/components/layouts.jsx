import '../App.css'
import Navbar from './navbar'
export const Layouts = ({children}) => {
  return(
    <>
    <Navbar/>
    <div className="body-layout">
    {children}
    </div>
    </>
  )
}

export default Layouts