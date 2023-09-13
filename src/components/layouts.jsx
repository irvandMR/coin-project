import '../App.css'
import Navbar from './navbar'
export const Layouts = ({children}) => {
  return(
    <>
    <Navbar/>
    <div className="body-layout">
    {children}
    </div>
    <div className="footer">
        Dibuat oleh : Muhamad Rizky Irvandi
    </div>

    </>
  )
}

export default Layouts