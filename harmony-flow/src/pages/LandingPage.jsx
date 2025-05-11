import React, { useState} from 'react'

import { APP_FEATURES } from "../utils/data"
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate()

  const [openAuthModel, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("Login")
  
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage