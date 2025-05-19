import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const token = localStorage.getItem('token')
export default function Admin() {
  const [profile, setProfile] = useState({})

  useEffect(() => {

    axios.get('https://apisim.asistentevirtualsas.com/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setProfile(res.data)
    })


  }, [])

  return (

    <div className="admin-section">

      <h2 className="section-title">Bienvenido {profile['name']}</h2>
      <button className="blue-btn w-150" onClick={() => location.href = '/admin/simulations'}>Examinar</button>
    </div>


  )
}
