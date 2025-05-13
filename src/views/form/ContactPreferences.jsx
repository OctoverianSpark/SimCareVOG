import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom';
const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function ContactPreferences() {

  const [client, setClient] = useState(JSON.parse(sessionStorage.getItem("client")));
  const [params] = useSearchParams()
  const goTo = (e) => {

    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {

      client[key] = value


    })

    sessionStorage.setItem('client', JSON.stringify(client))


    if (params.get('final-check')) {

      location.href = '/final-check'
    } else {

      location.href = '/professional-help'
    }


  }

  return (
    <form method="post" className="contact-preferences" onSubmit={goTo}>
      <h2 className="section-title">Diganos como le gustaria ser contactado</h2>

      <label htmlFor="electronic" className="radio-label">
        <input type="radio" name="contact-method" id="electronic" value={'Envieme un correo electronico o un mensaje de texto cuando haya un nuevo aviso en mi cuenta del Mercado'} />
        <span>Envieme un correo electronico o un mensaje de texto cuando haya un nuevo aviso en mi cuenta del Mercado</span>
      </label>
      <label htmlFor="paper" className="radio-label">
        <input type="radio" name="contact-method" id="paper" value={'Enviarme avisos en papel por correo'} />
        <span>Enviarme avisos en papel por correo</span>
      </label>


      <button type="submit" className="green-btn">Continuar</button>

    </form>
  )
}
