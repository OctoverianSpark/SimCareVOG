import React from 'react'

export default function HRAInfo() {
  return (
    <div className='section-welcome w-180'>

      <h2 className="section-title">Acuerdos de reembolso de salud (HRA)</h2>

      <p>
        Algunos empleadores ofrecen beneficios de salud llamados Acuerdos de Reembolso de Salud de cobertura individual (ICHRA) o HRA de Pequeños Empleadores Calificados (QSEHRA) que no son planes de salud tradicionales basados en el empleo. Un empleador elige una cantidad en d&oacute;lares que pondr&aacute; a disposici&oacute;n para reembolsar los gastos de atenci&oacute;n m&eacute;dica en lugar de forecer un plan de salud.
      </p>


      <h2 className="section-title">Documentos que puede necesitar</h2>
      <hr />
      <p>En esta secci&oacute;n s&oacute;lo necesitamos saber si alguien en su solicitud tiene o se le ofrece una HRA</p>

      <p>Si alguien tiene una HRA, tendr&aacute; un aviso del empleador que incluir&aacute;:</p>

      <ul>
        <li>
          El tipo de HRA, por ejemplo, si es una HRA de cobertura individual o una QSEHRA
        </li>
        <li>
          Si la HRA est&aacute; disponible s&oacute;lo para el empleado, o si otros miembros del hogar tambi&eacute;n pueden inscribirse
        </li>
        <li>
          Las fechas de cobertura y las cantidades de reembolso de la HRA
        </li>
      </ul>

      <h2 className="section-title">Qu&eacute; pasa si mi hogar tiene otro tipo de ofertas de atenci&oacute;n m&eacute;dica a trav&eacute;s de un empleo?</h2>
      <p>Le preguntaremos sobre otros tipos de planes de salud ofrecidos por un empleador (llamamos cobertura de salud basada en el empleo) m&aacute;s adelante en la solicitud.</p>


      <button type="button" className="green-btn" onClick={() => location.href = '/hra-individual-cover'}>Continuar</button>
    </div>
  )
}
