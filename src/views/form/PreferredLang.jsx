import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import Select from 'react-select'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')

export default function PreferredLang() {

  const [writenpref, setwritenpref] = useState(null)
  const [spokenpref, setspokenpref] = useState(null)

  const [params] = useSearchParams()
  const langs = [
    {
      value: 'es', label: 'Español'
    },
    {
      value: 'en', label: 'Inglés'
    }
  ]


  function goTo(e) {
    e.preventDefault()
    const data = new FormData(e.target)

    let body = {}

    data.append('writen-preferred-lang', writenpref.value)
    data.append('spoken-preferred-lang', spokenpref.value)

    data.entries().forEach(([key, value]) => {
      client[key] = value
    })


    sessionStorage.setItem('client', JSON.stringify(client))

    if (params.get('final-check')) {

      location.href = '/final-check'
    } else {

      location.href = '/contact-preferences'
    }



  }


  return (
    <form method="post" className="preferred-lang" onSubmit={goTo}>

      <h2 className="section-title">Cu&aacute;l es tu idioma preferido?</h2>
      <p className="section-description">Seleccionar su idioma preferido ayudara al Departamento de Salud y Servicios
        Humanos de los Estados Unidos a mejorar el servicio para todos usuarios del
        Mercado. Proporcionar esta informacion no afectara su elegibilidad, opciones o
        costos.
      </p>


      <label htmlFor="writen-preferred-lang" className="label-input">
        <span><b>Idioma escrito preferido</b></span>
        <Select
          options={langs}
          onChange={setwritenpref}
          className='select'
          classNamePrefix={'select'}
        />
      </label>
      <label htmlFor="spoken-preferred-lang" className="label-input">
        <span><b>Idioma hablado preferido</b></span>
        <Select
          options={langs}
          onChange={setspokenpref}
          className='select'
          classNamePrefix={'select'}
        />
      </label>


      <button type="submit" className='green-btn'>Guardar y continuar</button>

    </form>
  )
}
