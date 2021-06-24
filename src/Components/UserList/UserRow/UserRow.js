import React from 'react'
import classes from './UserRow.module.scss'
import Button from "../../UI/Button/Button";

const UserRow = (props) => {
    return(
        <div className={classes.UserRow} id={props.id}>
            <img className={classes.Avatar} src={props.avatar}/>
            <div className={classes.Name}>{props.name} {props.lastName}</div>
            <div className={classes.Email}>{props.email}</div>
            <div className={classes.ButtonBlock}>
                <div className={classes.ButtonEdit}>
                    <Button
                       text='Редактировать'
                       id={props.id}
                       click={props.OpenEditUser}
                    />
                </div>
                <div className={classes.ButtonDelete}>
                    <Button
                        text='Удалить'
                        id={props.id}
                        click={props.deleteUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserRow