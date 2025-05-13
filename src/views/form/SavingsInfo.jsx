import React, { useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"



const client = getSessionToJSON('client')



export default function SavingsInfo() {

  const [option, setOption] = useState(localStorage.getItem("saving-option"));

  const sendInformation = (e) => {

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.entries().forEach(([key, value]) => {
      console.log(key, value);

      sessionStorage.setItem(key, value);
    })


    location.href = '/about-me'

  }





  return (
    <form method="POST" onSubmit={e => sendInformation(e)} className="savings-info">
      <h2 className='section-title'>Opciones de ahorro</h2>
      <label className="bordered-container-gray" htmlFor="check-all">
        <input type="radio" name="saving-option" id="check-all" value="marcar todas las opciones" required={true} defaultChecked={option === "marcar todas las opciones"} className='w-40 h-10' />
        <div className="container-text">
          <p>Marcar todas las opciones (Recomendado)</p>
          <p className="caption">
            Verá sus resultados después de completar y enviar su solicitud. <br />
            Si es elegible para inscribirse, puede aplicar estos ahorros al plan
            que seleccione
          </p>
        </div>
      </label>
      <label className="bordered-container-gray" htmlFor="not-check">
        <input type="radio" name="saving-option" id="not-check" value="continuar sin verificar las opciones" required={true} defaultChecked={option === "continuar sin verificar las opciones"} className='w-40 h-10' />
        <div className="container-text">
          <p>Continuar sin verificar las opciones de ahorro</p>
          <p className="caption">
            Aun puedes llenar y enviar tu apliacacion.  <br />Si eres elegible para
            inscribirse, pagará el precio completo de tu seguro de salud
            premium en el plan que elijas
          </p>
        </div>
      </label>
      <label className="bordered-container-gray" htmlFor="help-me">
        <input type="radio" name="saving-option" id="help-me" value="ayudame a decidir" required={true} defaultChecked={option === "ayudame a decidir"} className='w-40 h-10' />
        <div className="container-text">
          <p htmlFor="check-all">Ayudame a decidir</p>
          <p className="caption">
            Vas a reponder un par de preguntas para verificar si tu hogar es
            elegible para ahorro
          </p>
        </div>
      </label>
      <button className="green-btn" id="link-about-me">
        Continuar
      </button>
    </form>
  )
}