import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';


const client = getSessionToJSON('client')

export default function MyPostalDirection() {
   const [showPostalForm, setShow] = useState(false)
   const [state, setState] = useState(null)

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

   const [params] = useSearchParams()

   const sendInformation = e => {

      e.preventDefault();
      const form = e.target;

      const formData = new FormData(form);


      let body = client;

      body["postal-direction"] = {};

      if (showPostalForm) {

         formData.entries().forEach(([key, value]) => {

            if (key === 'is-this-postal') return
            body["postal-direction"][key] = value.toLowerCase();


         })
      } else {
         body['postal-direction'] = client['house-direction']
      }


      sessionStorage.setItem("client", JSON.stringify(body))
      if (params.get('final-check')) {
         location.href = '/final-check'
      } else {

         location.href = "/mycontact"
      }
   }


   return (



      <form
         className='postal-direction space-y-4' id="postal-direction"
         method="POST"
         onSubmit={sendInformation}

      >
         <h2 className='section-title'>Cual es su direccion postal?</h2>

         <a href="#" id="link-my-direction" className="back-button">
            <i className="bi bi-caret-left-fill" />
            Atras
         </a>
         <div className="is-this-postal-container">
            <p><b>Es esta tambien su direccion postal?</b></p>
            <div className="gray-container">
               <p>
                  <b>
                     {`${client['house-direction']['first-direction']} ${client['house-direction']['second-direction']} ${client['house-direction']['city']} ${client['house-direction']['state']} ${client['house-direction']['zipcode']}`.toUpperCase()}
                  </b>
               </p>
            </div>
            <div className="container-inputs">
               <label htmlFor="si" className="radio-label">
                  <input type="radio" name="is-this-postal" id="si" value={'si'} onChange={e => setShow(false)} />
                  <span>Si</span>
               </label>
               <label htmlFor="no" className="radio-label">
                  <input type="radio" name="is-this-postal" id="no" value={'no'} onChange={e => setShow(true)} />
                  <span>No</span>
               </label>
            </div>
         </div>

         {
            showPostalForm && (

               <div className='postal-direction-form'>

                  <h2 className='section-title'>Ingrese su direccion postal</h2>
                  <div className="label-input">
                     <label htmlFor="client-first-direction">Direccion</label>
                     <input
                        type="text"
                        id="client-postal-direction"
                        name="direction"
                        required
                     />
                  </div>
                  <div className="label-input">
                     <label htmlFor="client-postal-city">Ciudad</label>
                     <input
                        type="text"
                        id="client-postal-city"
                        name="city"
                        required
                     />
                  </div>
                  <div className="label-input">
                     <label htmlFor="client-postal-state">Estado</label>
                     <Select
                        options={states}
                        placeholder='Selecciona un estado'
                        name='state'
                        onChange={setState}
                        className='select'
                        classNamePrefix={'select'}
                     />
                  </div>
                  <div className="label-input">
                     <label htmlFor="client-postal-zipcode">Codigo Postal</label>
                     <input type="text" id="client-postal-zipcode" name="client[zipcode]" required />
                  </div>
               </div>
            )
         }
         <button className="green-btn">Continuar</button>
      </form>
   )
}
