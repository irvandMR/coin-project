// import Link from "react-dom"

import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
      <div className="card position-relatives" style={{height : "150px"}}>
        <div className="d-flex ">
        <div className="position-absolute bottom-0 start-50 translate-middle-x">
          <div className="d-flex gap-3">
            <Link to={"/"} style={{textDecorationLine: "none"}}>
            <div className="p-3 fw-bold" style={{color: "#8597AC"}} >Home</div>
            </Link>
            <div className="p-3 fw-bold border-bottom border-5 border-primary" style={{color: "#1E5387"}}>Coin List</div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Navbar