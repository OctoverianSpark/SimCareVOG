import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"

export default function Terms() {
   const [accepted, Accept] = useState(false)
   const [understanded, Understand] = useState(false)
   const goTo = () => {
      if (accepted && understanded) {

         window.location.href = '/savings'
      } else {
         console.log('NUH!!!')
      }
   }
   return (
      <main className='conditions'>
         <div className='verified-box'>
            <h1>Su identidad ha sido verificada</h1>
            <p>
               Ahora puede llenar su solicitud de cobertura medica a traves del Mercado
               de seguros
            </p>
         </div>
         <div className='mail-marketplace-box'>
            <h1>Correos electronicos importantes del Mercado</h1>
            <p>
               Si el Mercado tiene su direccion de correo electronico, le enviaremos
               automaticamente informacion importante, actualizaciones y recordatorios
               sobre la inscripcion en el Mercado. Puede dejar de recibir estas
               comunicaciones en cualquier momento. Haga click en el enlace 'cancelar
               suscripcion' al final de cualquier correo electronico del Mercado
            </p>
         </div>
         <div className='privacy-box'>
            <h1>Privacidad y el uso de su informacion</h1>
            <p>
               Vamos a mantener su informacion privada como lo requiere la ley. Sus
               respuestas en este formulario solo se utilizaran para determinar la
               elegibilidad para la cobertura medica o ayuda para pagar la cobertura.
               Vamos a comprobar sus respuestas con la informacion de nuestras bases de
               datos y las bases de datos de otras agencias federales. Si la
               informacion no coincide, podemos pedirle que nos envie pruebas. No vamos
               a hacer preguntas sobre su historial medico. No se haran preguntas sobre
               ciudadania o estatus migratorio a los miembros del hgar que no esten
               solicitando la cobertura
            </p>
            <p>
               Como parte del proceso de solicitud, es posible que necesitemos
               recuperar su informacion del Servicio de Rentas Internas(IRS), el Seguro
               Social, el Departamento de Seguridad Nacional (DHS), y/o una agencia de
               informacion. Necesitamos esta informacion para comprobar su elegibilidad
               para la cobertura y la ayuda para pagar la cobertura si usted lo desea y
               para darle el mejor servicio posible. Tambien podemos revisar su
               informacion luego para asegurarnos de que su informacion esta
               actualizada. Le notificaremos si encontramos algun cambio
            </p>
            <div className='info-accepted'>
               <label htmlFor='accept-info' className='checkbox-label'>
                  <input type='checkbox' name='accept-info' id='accept-info' onChange={() => Accept(!accepted)} />
                  <p>
                     Acepto que mi informacion sea usada y recuperada de fuentes de datos
                     para esta solicitud. He consentido que la informacion de todas las
                     personas en la solicitud sea recuperada de las fuentes de datos y
                     utilizada</p>
               </label>
               <label htmlFor='understand-info' className='checkbox-label'>
                  <input type='checkbox' name='understand-info' id='understand-info' onChange={() => Understand(!understanded)} />
                  <p>
                     Entiendo que estoy obligado a proveer respuestas verdaderas y que se
                     me puede pedir proveer informacion adicional, incluyendo una prueba
                     de mi elegibilidad para un Periodo Especial de Inscripcion, si
                     califico para uno. Puedo enfrentar penalidades incluyendo perder mi
                     elegibilidad para la cobertura si incumplo mis obligaciones
                  </p>
               </label>
            </div>
         </div>
         <button className='green-btn' onClick={() => goTo()}>
            LLEVEME A LA SOLICITUD
         </button>
      </main>
   )
}