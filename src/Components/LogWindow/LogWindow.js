import React from 'react'
import classes from './LogWindow.module.scss'
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const LogWindow = (props) => {

    return(
        <div className={classes.LogWindow}>
            <div className={classes.Log}>
                <Input
                    placeholder='Введите логин'
                    value={props.login}
                    change={props.changeLogin}
                    colorRed={props.colorRed}
                />
            </div>
            <div className={classes.PassWindow}>
                <Input
                    placeholder='Введите пароль'
                    value={props.password}
                    change={props.changePass}
                    colorRed={props.colorRed}
                />
            </div>
            <div className={classes.Button}>
                <Button
                    text='Авторизоваться'
                    click={props.checkUser}
                />
            </div>
        </div>
    )
}

export default LogWindow