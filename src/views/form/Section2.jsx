import React from 'react'
import {getSessionToJSON,setSessionToJSON} from "../../utils/functions"

export default function Section2() {
  return (
    <div className='section-welcome'>

      <div className="section-header">
        <p className="section-num">SECCI&Oacute;N 2</p>
        <h2 className='section-title'>Informaci&oacute;n personal y del hogar</h2>
        <p>Proporcione detalles sobre todas las personas en su hogar</p>
      </div>

      <div className="section-body">
        <h3><b>Sobre qu&eacute; preguntaremos y por qu&eacute;</b></h3>
        <p>En esta seccion le pediremos informacion sobre cada persona de su hogar, incluso aquellas que no solicitan cobertura médica. Esto podria incluir un conyuge o pareja o cualquier dependiente tributario. </p>
        <p>La elegibilidad para programas y ahorros se basa en los ingresos de su hogar y el tamano de su familia, por lo que es importante responder preguntas sobre todas las parsonas que preguntamos, incluso las personas que no necesitan cobertura médica.</p>

        <h3><b>Informacion que puede necesitar</b></h3>
        <p>Para cada persona en su hogar: </p>
        <ul>
          <li>Informaci&oacute;n de presenta&oacute;n de impuestos</li>
          <li>Direcciones</li>
          <li>N&uacute;meros de Seguro Social</li>
          <li>Informaci&oacute;n de ciudadan&iacute;a o inmigraci&oacute;n</li>
          <li>Ingresos actuales y anuales</li>
        </ul>

        <p>Esta bien si necesita hacer una pausa para recopilar cualquier documento que le ayude a proporcionar esta informaci&oacute;. Todas sus respuestas hasta este punto han sido guardadas</p>
      </div>


      <button className='green-btn' onClick={e => location.href = "/civil-state"}>Continuar</button>




    </div>
  )
}
