import React from 'react'

export default function IncomeInfo() {
  return (
    <div className='section-3 w-180 text-left'>

      <h2 className="section-title text-left">Ingresos del hogar</h2>

      <p>Los ingresos del hogar incluyen todos los ingresos estimados y algunos gastos tanto para el mes actual como para todo el 2025. Deber&aacute; ingresar la informaci&oacute;n de ingresos de cada persona en el hogar.</p>

      <br />
      <h3 className='font-bold'>Documentos que puede necesitar</h3>

      <ul>
        <hr />
        <br />
        <li>Tablones de pago</li>
        <br />
        <li>Registros personales de ingresos del negocio propio de una persona o de otro empleo por cuenta propia, como servicios de entrega o transporte</li>
        <br />
        <li>Las declaraciones de impuestos del año pasado, si es probable que los ingresos de este año sean aproximadamente iguales</li>

      </ul>
      <br />
      <h2 className='section-title'>Por qu&eacute; necesito ingresar esta   informaci&oacute;n?</h2>
      <br />
      <p>Usaremos los ingresos anuales para ayudar a verificar la elegibilidad de su hogar para ahorros a trav&eacute;s del Mercado, como un cr&eacute; tributario para la prima para reducir las facturas mensuales de seguro o reducir los gastos de bolsillo en ciertos planes. Tambi&eacute;n utilizaremos los ingresos del mes actual para verificar la elegibilidad para la cobertura de cuidado m&eacute;dico gratuito o de bajo costo a trav&eacute;s de programas como Medicaid y el Programa de Seguro M&eacute;dico para Niños (CHIP)</p>

      <br />
      <h2 className="section-title">Qu&eacute; sucede si los ingresos cambian de un mes a otro o a lo largo del año?</h2>
      <br />
      <p>Estimar los ingresos puede ser dificil, especialmente si los ingresos de una persona cambian o var&iacute;an.</p>
      <br />
      <p><b>Ingrese su mejor estimaci&oacute;n por ahora.</b> Si los ingrresos de alguien cambian durante el año, regrese y actualice su solicitud lo antes posible. Los cambios en los ingresos pueden afectar las opciones de ahorro y cobertura para las que califica su hogar.</p>

      <br />

      <button type="button" className='green-btn' onClick={() => location.href = '/income?k=0'}>Continuar</button>

    </div>
  )
}
