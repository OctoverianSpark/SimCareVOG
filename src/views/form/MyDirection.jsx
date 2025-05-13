import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function MyDirection() {

   const [state, setState] = useState(null)
   const [params] = useSearchParams()
   const [residential, setResidential] = useState(true);

   const states = [
      { value: "AL", label: "Alabama" },
      { value: "AK", label: "Alaska" },
      { value: "AZ", label: "Arizona" },
      { value: "AR", label: "Arkansas" },
      { value: "CA", label: "California" },
      { value: "CO", label: "Colorado" },
      { value: "CT", label: "Connecticut" },
      { value: "DE", label: "Delaware" },
      { value: "FL", label: "Florida" },
      { value: "GA", label: "Georgia" },
      { value: "HI", label: "Hawái" },
      { value: "ID", label: "Idaho" },
      { value: "IL", label: "Illinois" },
      { value: "IN", label: "Indiana" },
      { value: "IA", label: "Iowa" },
      { value: "KS", label: "Kansas" },
      { value: "KY", label: "Kentucky" },
      { value: "LA", label: "Luisiana" },
      { value: "ME", label: "Maine" },
      { value: "MD", label: "Maryland" },
      { value: "MA", label: "Massachusetts" },
      { value: "MI", label: "Míchigan" },
      { value: "MN", label: "Minnesota" },
      { value: "MS", label: "Misisipi" },
      { value: "MO", label: "Misuri" },
      { value: "MT", label: "Montana" },
      { value: "NE", label: "Nebraska" },
      { value: "NV", label: "Nevada" },
      { value: "NH", label: "New Hampshire" },
      { value: "NJ", label: "Nueva Jersey" },
      { value: "NM", label: "Nuevo México" },
      { value: "NY", label: "Nueva York" },
      { value: "NC", label: "Carolina del Norte" },
      { value: "ND", label: "Dakota del Norte" },
      { value: "OH", label: "Ohio" },
      { value: "OK", label: "Oklahoma" },
      { value: "OR", label: "Oregón" },
      { value: "PA", label: "Pensilvania" },
      { value: "RI", label: "Rhode Island" },
      { value: "SC", label: "Carolina del Sur" },
      { value: "SD", label: "Dakota del Sur" },
      { value: "TN", label: "Tennessee" },
      { value: "TX", label: "Texas" },
      { value: "UT", label: "Utah" },
      { value: "VT", label: "Vermont" },
      { value: "VA", label: "Virginia" },
      { value: "WA", label: "Washington" },
      { value: "WV", label: "Virginia Occidental" },
      { value: "WI", label: "Wisconsin" },
      { value: "WY", label: "Wyoming" }
   ];


   const sendInformation = e => {

      e.preventDefault();
      const form = e.target;

      const formData = new FormData(form);


      formData.append('state', state.value)
      let body = client;

      body["house-direction"] = {};

      formData.entries().forEach(([key, value]) => {


         body["house-direction"][key] = value.toLowerCase();


      })


      sessionStorage.setItem("client", JSON.stringify(body))


      if (params.get('final-check')) {
         location.href = "/postaldir?final-check=true"
      } else {

         location.href = "/postaldir"


      }
   }

   return (
      <form
         className="my-direction"
         id="my-direction"
         onSubmit={sendInformation}
      >
         <h2 className='section-title'>Cual es su direccion residencial</h2>
         <a className="back-button" href="#about-me" id="link-about-me">
            <i className="bi bi-caret-left-fill" />
            Atras
         </a>
         <label className="label-input" htmlFor="client-first-direction">
            <span>Direccion</span>
            <input
               type="text"
               id="client-first-direction"
               name="first-direction" disabled={!residential}
               defaultValue={params.get('final-check') ? client['house-direction']['first-direction'] : ''}
               required
            />
         </label>
         <label className="label-input" htmlFor="client-second-direction">
            <span>Direccion 2</span>
            <p className="caption">Opcional</p>
            <input
               type="text"
               id="client-second-direction"
               name="second-direction" disabled={!residential}
               defaultValue={params.get('final-check') ? client['house-direction']['second-direction'] : ''}
            />
         </label>
         <label className="label-input" htmlFor="client-city">
            <span>Ciudad</span>
            <input type="text" id="client-city" name="city" disabled={!residential} required defaultValue={params.get('final-check') ? client['house-direction']['city'] : ''} />
         </label>
         <label className="label-input" htmlFor="client-state">
            <span>Estado</span>
            <Select
               options={states}
               placeholder='Selecciona un estado'
               name='state'
               onChange={setState}
               className='select'
               classNamePrefix={'select'}
            />
         </label>
         <label className="label-input" htmlFor="client-zipcode">
            <span>Codigo Postal</span>
            <input type="text" id="client-zipcode" name="zipcode" disabled={!residential} required defaultValue={params.get('final-check') ? client['house-direction']['zipcode'] : ''} />
         </label>
         <label className="checkbox-label" htmlFor="client-have-home">
            <input type="checkbox" id="client-have-home" onChange={() => setResidential(!residential)} />
            <span>No tengo una direccion residencial</span>
         </label>

         <button className="green-btn">Continuar</button>

      </form>
   )
}
