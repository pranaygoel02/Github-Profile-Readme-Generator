import React from 'react'
import {IoIosAddCircle} from 'react-icons/io'

function Select({text, secondary, onClick, selected}) {
  return (
    <button onClick={onClick} className={`btn text-xs hover:drop-shadow-[0_10px_16px_rgba(34,197,94,0.3)] ${selected && !secondary ? 'btn-primary':'btn-secondary'}`}>{text} <span className={`${selected ? 'rotate-45' : 'rotate-0'} duration-300 transition-all`}><IoIosAddCircle/></span></button>
  )
}

export default Select