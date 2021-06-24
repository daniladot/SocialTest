import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => {

    return (
        <input className={classes.Input}
               type="text"
               placeholder={props.placeholder}
               value={props.value}
               onChange={(e) => props.change(e.target.value)}
               data-color={!props.colorRed ? props.colorRed : null}
        />
    )
}

export default Input