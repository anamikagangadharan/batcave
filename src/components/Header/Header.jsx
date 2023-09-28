import React from 'react'
import css from "./Header.module.css"
import Logo from "../../assets/VectorBat.svg"
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className={css.container}>
        <div className={css.left}>
            <img src={Logo} alt="" />
            
        </div>

        <div className={css.right}>
       <Link to="/register"><button className={css.registermainbtn}>REGISTER</button> </Link>    

        </div>
      
    </div>
  )
}

export default Header
