import React from 'react'
import { getSessionToJSON } from '../../utils/functions'
import { MONTHS } from '../../utils/helpers'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const helper = getSessionToJSON('professional-help', {})

const all = [client, ...dependents]

export default function FinalCheck() {
  return (
    <div className='final-check'>

      <h2 className="section-title">Revise su solicitud</h2>

      <h2 className='subtitle-blue'>Revise su configuraci&oacute;n de ahorros</h2>

      <div className="brief-block">
        <div className="text">
          <p><b>Configuraci&oacute;n de ahorros</b></p>
          <p>Ver las opciones de ahorro</p>
        </div>
        <a href="/savings-info?final-check=true">Editar</a>
      </div>
      <hr />
      <h2 className="subtitle-blue">Revise su informaci&oacute;n de contacto</h2>

      <div className="brief-block">
        <div className="text">
          <p><b>Nombre Completo</b></p>
          <p>{`${client['first-name']} ${client['middle-name']} ${client['last-name']} ${client['suffix']}`}</p>
        </div>
        <a href="/about-me?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>Direcci&oacute;n postal</b></p>
          <p>{`${client['postal-direction']['first-direction']} ${client['postal-direction']['second-direction']} ${client['postal-direction']['city']} ${client['postal-direction']['state']} ${client['postal-direction']['zipcode']}`}</p>
        </div>
        <a href="/direction?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>Direcci&oacute;n de correo electr&oacute;nico</b></p>
          <p>{client['contact']['email']}</p>
        </div>
        <a href="/mycontact?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>N&uacute;meros de tel&eacute;fono</b></p>
          <p>{client['contact']['phone-type']} {client['contact']['phone']}</p>
        </div>
        <a href="/mycontact?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>Idioma escrito preferido</b></p>
          <p>{client['writen-preferred-lang'] === 'es' ? 'Español' : 'Ingles'}</p>
        </div>
        <a href="/preferred-lang?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>Idioma hablado preferido</b></p>
          <p>{client['spoken-preferred-lang'] === 'es' ? 'Español' : 'Ingles'}</p>
        </div>
        <a href="/preferred-lang?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>M&eacute;todo preferido para recibir avisos</b></p>
          <p>{client['contact-method']}</p>
        </div>
        <a href="/contact-preferences?final-check=true">Editar</a>
      </div>
      <hr />


      <h2 className="subtitle-blue">Revise la informaci&oacute;n de su hogar</h2>


      <div className="brief-block">
        <div className="text">
          <p><b>Personas solicitando cobertura medica</b></p>
          {
            all.filter(x => x['cover'] === true || x['cover'] == 'true').map((x, i) => (
              <p key={i}>{x['first-name']} {x['last-name']}</p>
            ))
          }
        </div>
        <a href="/household?final-check=true">Editar</a>
      </div>
      <hr />
      <div className="brief-block">
        <div className="text">
          <p><b>Personas que no necesitan cobertura medica</b></p>
          {
            all.filter(x => x['cover'] === false || x['cover'] == 'false').map((x, i) => (
              <p key={i}>{x['first-name']} {x['last-name']}</p>
            ))
          }
        </div>
        <a href="/household?final-check=true">Editar</a>
      </div>
      <hr />


      {
        all.map((x, i) => (

          <div key={i} className='grid gap-3'>
            <h2 className="subtitle-blue">{`${x['first-name']} ${x['last-name']}`.toUpperCase()}</h2>
            <div className="brief-block">

              <div className="text">
                <p><b>Nombre</b></p>
                <p>{`${x['first-name']} ${x['middle-name']} ${x['last-name']} ${x['suffix']}`}</p>
              </div>


            </div>
            <hr />

            <div className="brief-block">
              <div className="text">

                <p><b>Fecha de nacimiento</b></p>
                <p>{`${x['dob-day']}/${x['dob-month']}/${x['dob-year']}`}</p>
              </div>
            </div>
            <hr />
            <div className="brief-block">
              <div className="text">

                <p><b>Tiene una fecha de inicio de Medicare</b></p>
                <p>No</p>
              </div>
            </div>
            <hr />
            <div className="brief-block">
              <div className="text">

                <p><b>Sexo</b></p>
                <p>{x['genre']}</p>
              </div>

            </div>
            <div className="brief-block">
              <div className="text">
                <p><b>Direcci&oacute;n Residencial</b></p>
                <p>{`${x['house-direction']['first-direction'] ?? ''} ${x['house-direction']['second-direction'] ?? ''} ${x['house-direction']['city'] ?? ''} ${x['house-direction']['state'] ?? ''} ${x['house-direction']['zipcode'] ?? ''}`}</p>
              </div>
            </div>
            <div className="brief-block">
              <div className="text">
                <p><b>Numero de Seguro Social</b></p>
                <p>{x['has-ssn'] == 'true' ? '********' : 'No tiene seguro social'}</p>
              </div>
            </div>
            <div className="brief-block">
              <div className="text">
                <p><b>Ciudadano o nacional estadounidense</b></p>
                <p>{x['citizen'] == 'true' ? 'Si' : 'No'}</p>
              </div>
            </div>
            {
              x['citizen'] == 'false' && (
                <div className="brief-block">
                  <div className="text">
                    <p><b>Tiene estatus de inmigracion elegible</b></p>
                    <p>{x['elegible-mig-status']}</p>
                    <p><b>Tipo de documento de inmigraci&oacute;n</b></p>
                    <p>{x['mig-status']}</p>
                  </div>

                </div>
              )
            }
            <hr />
            <h2 className='subtitle-blue'><b>Ingresos</b></h2>
            <p><b>El ingreso de este mes</b></p>

            <div className="brief-block">
              <div className='text'>

                {
                  x['incomes'].map((income, i) => (
                    <>
                      <p><b>{income['type']['value']} : {income['description']}</b></p>

                      <p className='flex justify-between w-150'>$ {income['value'] ?? 0} </p>
                    </>
                  ))
                }
                <br />
                <p><b>Ingreso total de este mes ({MONTHS[new Date().getMonth()]})</b></p>
                <p>$ {x['total-income'] / 12}</p>
              </div >

              <a href={`/income?k=${i}&final-check=true`}>Editar</a>


            </div>

            <div className="brief-block">
              <div className="text">
                <p><b>Ingresos para este año {new Date().getFullYear()}</b></p>

                <p>$ {x['total-income']}</p>
              </div>

            </div>
            <hr />

          </div>

        ))
      }


      <h2 className="subtitle-blue">Revise la informaci&oacute;n adicional</h2>

      {
        helper['is-helping'] === 'si' && (
          <>

            <div className="brief-block">
              <div className="text">

                <p><b>{`${helper['professional-type'].join(',')}`.toUpperCase()}</b></p>
                <p>{`${helper['first-name']} ${helper['initial-second-name']} ${helper['last-name']}`}</p>
                <p>{helper['npn']}</p>
              </div>

              <a href="/professional-help?final-check=true">Editar</a>
            </div>
            <hr />
          </>

        )
      }


      <button type="button" className="green-btn" onClick={() => location.href = '/final-terms'}>Guardar y continuar</button>
    </div>
  )
}
