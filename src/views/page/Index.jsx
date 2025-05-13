import React from 'react'

export default function Index() {
  const startSimulator = () => {


    window.open(
      location.href + 'record',
      '_blank',
      'width=600,height=600,resizable=no,toolbar=no,location=no,menubar=no,status=no',)

    location.href = '/terms'
  }

  return (
    <div>


      <button className='green-btn' onClick={() => startSimulator()}>Iniciar Simulador</button>


    </div>
  )
}
