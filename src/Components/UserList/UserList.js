import React, {useEffect} from 'react'
import classes from './UserList.module.scss'
import UserRow from "./UserRow/UserRow"
import Button from "../UI/Button/Button"
import UserRowEdit from "./UserRowEdit/UserRowEdit"

const UserList = (props) => {

    useEffect(() => {
        props.windowScrollStart()
    }, [])

    return (
        <div className={classes.UserList}>
            <div className={classes.BtnWrapper}>
                <div className={classes.AddUser}>
                    <Button
                        text='Добавить'
                        click={props.clickButtonAddUser}
                    />
                </div>
            </div>
            {props.openNewUser
                ? <UserRowEdit
                    addNewName={props.addNewName}
                    addNewEmail={props.addNewEmail}
                    name={props.newUser.name ? props.newUser.name : ''}
                    email={props.newUser.email ? props.newUser.email : ''}
                    click={props.addNewUser}
                />
                : null
            }

            {props.data.map((elem, index) => (
                elem.id === props.editUser.id
                    ? <UserRowEdit
                        key={index}
                        addNewName={props.AddNameEditUser}
                        addNewEmail={props.AddEmailEditUser}
                        name={props.editUser.first_name ? props.first_name : elem.first_name}
                        email={props.editUser.email ? props.email : elem.email}
                        addNewUser={props.addNewUser}
                        editUser={props.editUser}
                        click={props.ClickEditUser}
                    />
                    : <UserRow
                        key={index}
                        avatar={elem.avatar}
                        email={elem.email}
                        name={elem.first_name}
                        id={elem.id}
                        deleteUser={props.deleteUser}
                        OpenEditUser={props.OpenEditUser}
                    />
            ))}
        </div>
    )
}

export default UserList