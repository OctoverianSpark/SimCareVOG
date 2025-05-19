import axios from 'axios'
import React from 'react'

export default function LogIn() {



  const logIn = e => {

    e.preventDefault()

    const data = new FormData(e.target)

    const user = data.get('user')
    const password = data.get('password')

    axios.post('https://apisim.asistentevirtualsas.com/login', {
      user, password
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        location.href = '/admin'
      })
      .catch(res => {
        console.log('Error', res)
      })


  }


  return (
    <form method='POST' className='login-form' onSubmit={logIn}>
      <h2 className="section-title">Inicio de sesi&oacute;n</h2>

      <label htmlFor="user" className="label-input">
        <span>Usuario</span>
        <input type="text" name="user" id="user" required />
      </label>
      <label htmlFor="password" className="label-input label-password">
        <span>Contraseña</span>
        <input type="password" name="password" id="password" required />
      </label>

      <button type="submit" className="blue-btn">Iniciar Sesion</button>


    </form>
  )
}
