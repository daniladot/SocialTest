import React from 'react'
import classes from './UserRowEdit.module.scss'
import Button from "../../UI/Button/Button";

const UserRowEdit = (props) => {
    return(
        <div className={classes.UserRow} id={props.id}>
            <img className={classes.Avatar} src={props.avatar}/>
            <input type="text"
                   className={classes.Name}
                   value={props.name && props.lastName ? `${props.name} ${props.lastName}` : props.name}
                    onChange={(e) => props.addNewName(e.target.value)}
            />
            <input type="text" className={classes.Email}
                   value={props.email ? props.email : props.email}
                   onChange={(e) => props.addNewEmail(e.target.value)}
            />
            <div className={classes.ButtonBlock}>
                <div className={classes.ButtonAdd}>
                    <Button
                       text='Добавить'
                       click={props.click}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserRowEdit