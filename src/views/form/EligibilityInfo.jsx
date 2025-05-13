import React from 'react'

export default function EligibilityInfo() {
  return (
    <div className='section-welcome w-180'>


      <h2 className="section-title">Elegibilidad del Per&iacute;odo Especial de Inscripci&oacute;n</h2>

      <p>Un Per&iacute;odo Especial de Inscripci&oacute;n le permite a una persona inscribirse en una nueva cobertura o cambiar de plan fuera del Per&iacute;odo de Inscripci&oacute;n Abierta anual de 1 de noviembre al 15 de enero. Alguien podr&iacute;a ser elebigble si ha tenido ciertos eventos de vida.</p>

      <h2><b>Informaci&oacute; o documentos que pueda necesitar</b></h2>


      <ul>
        <li>Avisos de oferta de HRA o QSEHRA</li>
        <li>Un aviso de una compañia de seguros, empleador o agencia estatal que muestre la fecha en que se perdi&oacute; o se perder&aacute; la cobertura de salud</li>
        <li>Las fechas en que alguien en el hogar se mud&oacute;, se cas&oacute;, acogi&oacute; a un nuevo dependiente, sali&oacute; de la c&aacute;rcel u obtuvo recientemente un estado migratorio elegible</li>
      </ul>


      <button type="button" className="green-btn" onClick={() => location.href = '/med-refund-offers'}>Continuar</button>

    </div>
  )
}
