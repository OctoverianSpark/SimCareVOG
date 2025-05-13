import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function MyContact() {

   const [client, setClient] = useState(JSON.parse(sessionStorage.getItem("client")))
   const [params] = useSearchParams()

   const sendInformation = e => {

      e.preventDefault();
      const form = e.target;

      const formData = new FormData(form);


      let body = client;

      body["contact"] = {};

      formData.entries().forEach(([key, value]) => {


         body["contact"][key] = value.toLowerCase();


      })


      sessionStorage.setItem("client", JSON.stringify(body))

      if (params.get('final-check')) {
         location.href = "/final-check"

      } else {
         location.href = "/preferred-lang"

      }




   }

   return (
      <form method="POST"
         className="container-form-section"
         id="my-contact"
         onSubmit={sendInformation}
      >
         <h2 className='section-title'>Cual es su informacion de contacto?</h2>
         <label className="label-input" htmlFor="client-email">
            <span>Direccion de correo electronico</span>
            <input type="email" id="client-email" name="email" required />
         </label>
         <label className="label-input" htmlFor="client-phone">
            <span>Telefono</span>
            <input type="tel" id="client-phone" name="phone" required />
         </label>
         <label className="label-input" htmlFor="client-ext">
            <span>Extension</span>
            <p className="caption">Opcional</p>
            <input type="text" id="client-ext" name="ext" />
         </label>
         <p className='label-title'>Tipo de telefono</p>
         <label htmlFor='mobile' className="radio-label">
            <input
               type="radio"
               name="phone-type"
               id="mobile"
               defaultValue="movil"
               required
            />
            <span>Movil</span>
         </label>
         <label htmlFor='home' className="radio-label">
            <input
               type="radio"
               name="phone-type"
               id="home"
               defaultValue="hogar"
               required
            />
            <span>Hogar</span>
         </label>
         <label htmlFor='work' className="radio-label">
            <input
               type="radio"
               name="phone-type"
               id="work"
               defaultValue="trabajo"
               required
            />
            <span>Trabajo</span>
         </label>

         <button type='submit' className="green-btn">Continuar</button>
      </form>
   )
}