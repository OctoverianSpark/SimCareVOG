import React from 'react'
import { setSessionToText } from '../../utils/functions'

export default function Index() {
  const startSimulator = () => {

    const prompt = window.prompt('Ingresa tu nombre')

    setSessionToText('user', prompt)

    window.open(
      `${window.location.origin}/record`,
      '_blank',
      'width=600,height=600,resizable=no,toolbar=no,location=no,menubar=no,status=no',)

    setTimeout(() => {
      location.href = '/terms';
    }, 500); // deja que el canal se inicialice primero
  }

  return (
    <div className='container-form-section h-100 flex align-center flex-col justify-center'>

      <h2 className="section-title">Bienvenido a SimCare!</h2>


      <p className='text-2xl text-center'>Para iniciar con la simulacion presiona el boton de abajo</p>
      <p className='text-2xl text-center'>Esta simulacion será grabada</p>

      <button className='green-btn' onClick={() => startSimulator()}>Iniciar Simulador</button>


      <button type="button" className='blue-btn log-in-btn' onClick={() => location.href = '/admin/login'}> Iniciar Sesion</button>


    </div>
  )
}
