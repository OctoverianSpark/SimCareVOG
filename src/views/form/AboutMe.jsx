import React, { useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions';
import { useSearchParams } from 'react-router-dom';


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

console.log(client)


export default function AboutMe() {

   const [params] = useSearchParams()


   const sendInformation = (e) => {

      e.preventDefault();

      const form = e.target;

      const formData = new FormData(form);

      

      formData.entries().forEach(([key, value]) => {

         client[key] = value.toLowerCase();

      })

      setSessionToJSON("client", client);

      if (params.get('final-check')) {
         location.href = '/final-check'
      } else {
         if (dependents.length != []) {
            location.href = "/household";
         } else {
            location.href = "/direction";
         }


      }


   }

   return (

      <form method="POST" className="about-me" onSubmit={sendInformation}>
         <button type='button'>Atras</button>

         <h2 className="section-title">Diganos sobre usted</h2>
         <div className="container-inputs">
            <p>Necesita esta cobertura para usted</p>
            <label className='radio-label' htmlFor="for-me-yes">
               <input
                  type="radio"
                  name="cover"
                  id="for-me-yes"
                  defaultValue={true}
                  defaultChecked={client['cover'] || false}
                  required
               />
               <span>Si</span>
            </label>
            <label className='radio-label' htmlFor="for-me-no">
               <input
                  type="radio"
                  name="cover"
                  id="for-me-no"
                  defaultValue={false}
                  defaultChecked={client['cover'] === false || false}
                  required
               />
               <span>No</span>
            </label>
         </div>
         <label className="label-input" htmlFor="client-first-name">
            <span>Nombre</span>
            <p className="caption">Este campo es requerido</p>
            <input type="text" id="client-first-name" name="first-name" required defaultValue={client['first-name'] || ""} />
         </label>
         <label className="label-input" htmlFor="client-middle-name">
            <span>Segundo nombre</span>
            <p className="caption">Opcional</p>
            <input type="text" id="client-middle-name" name="middle-name" defaultValue={client['middle-name'] || ""} />
         </label>
         <label className="label-input" htmlFor="client-last-name">
            <span>Apellido</span>
            <p className="caption">Este campo es requerido</p>
            <input type="text" id="client-last-name" name="last-name" required defaultValue={client['last-name'] || ""} />
         </label>
         <label className="label-input" htmlFor="client-suffix">
            <span>Sufijo</span>
            <p className="caption">Opcional</p>
            <input type="text" id="client-suffix" name="suffix" defaultValue={client['suffix'] || ""} />
         </label>
         <div className="container-inputs">
            <label className="label-input" htmlFor="client-dob">
               Fecha de nacimiento
               <p className="caption">Este campo es requerido</p>
               <div className="dob-inputs">
                  <input
                     type="number"
                     id="dob-month"
                     name="dob-month"
                     placeholder="MM"
                     min="1"
                     max="12"
                     required
                     defaultValue={client['dob-month'] || null}
                  />
                  <input
                     type="number"
                     id="dob-day"
                     name="dob-day"
                     placeholder="DD"
                     min="1"
                     max="31"
                     required
                     defaultValue={client['dob-day'] || null}
                  />
                  <input
                     type="number"
                     id="dob-year"
                     name="dob-year"
                     placeholder="YYYY"
                     min="1900"
                     max={new Date().getFullYear()}
                     required
                     defaultValue={client['dob-year'] || null}
                  />
               </div>
            </label>
         </div>
         <p className='label-title'>Sexo</p>
         <label className="radio-label" htmlFor="client-gender-female">
            <input
               type="radio"
               name="gender"
               id="client-gender-female"
               defaultValue="femenino"
               required
               defaultChecked={client['genre'] || '' == 'femenino'}
            />
            <span>Femenino</span>
         </label>
         <label className="radio-label" htmlFor="client-gender-male">
            <input
               type="radio"
               name="gender"
               id="client-gender-male"
               defaultValue="masculino"
               required
               defaultChecked={client['genre'] || '' === 'masculino'}
            />
            <span>Masculino</span>
         </label>
         <button type="submit" className="green-btn">
            Continuar
         </button>
      </form>
   )
}
