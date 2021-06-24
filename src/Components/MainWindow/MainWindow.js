import React, {useState, useEffect} from 'react'
import classes from './MainWindow.module.scss'
import LogWindow from "../LogWindow/LogWindow"
import UserList from "../UserList/UserList"
import axios from "axios"

let windowScrollStartFunction = false

const MainWindow = () => {
    const [state, setState] = useState({
        checkUser: false,
        colorRed: true,
        login: '',
        password: '',
        content: [],
        page: 1,
        totalPages: 0,
        openNewUser: false,
        newUser: {},
        editUser: {}
    })

    function onWindowScroll(content) {
        if (window.scrollY >= window.innerHeight - 100) {
            const stateCopy = {...state}
            if (stateCopy.page < stateCopy.totalPages) {
                stateCopy.page++
                setState(stateCopy)
                getScrollUser()
            }
        }
    }

    const windowScrollStart = (data) => {
        windowScrollStop()

        windowScrollStartFunction = onWindowScroll.bind(null, data)
        window.addEventListener('scroll', windowScrollStartFunction)
    }

    const windowScrollStop = () => {
        if (windowScrollStartFunction) {
            window.removeEventListener('scroll', windowScrollStartFunction)
        }
    }

    const checkUser = async () => {
        const stateCopy = {...state}
        const response = await axios.post(
            `https://reqres.in/api/login`
            ,
            {
                "email": state.login,
                "password": state.password
            }).then(response => {
            console.log(response)
            stateCopy.checkUser = true
            stateCopy.colorRed = true
            getContent(stateCopy)
            windowScrollStop()
        }).catch(err => {
            stateCopy.checkUser = false
            stateCopy.colorRed = false
            setState(stateCopy)
        })
    }

    const getContent = async (stateCopy) => {
        const response = await axios.get(`https://reqres.in/api/users`)
        console.log(response)
        stateCopy.content = response.data.data
        stateCopy.totalPages = response.data.total_pages
        setState(stateCopy)
    }

    const getScrollUser = async () => {
        const stateCopy = {...state}
        stateCopy.page++
        const response = await axios.get(`https://reqres.in/api/users?page=${stateCopy.page}`)
        console.log(response)
        stateCopy.content = stateCopy.content.concat(response.data.data)
        setState(stateCopy)
    }

    const changeLogin = (e) => {
        const stateCopy = {...state}
        stateCopy.login = e
        setState(stateCopy)
    }

    const changePass = (e) => {
        const stateCopy = {...state}
        stateCopy.password = e
        setState(stateCopy)
    }

    const addNewName = (e) => {
        const stateCopy = {...state}
        stateCopy.newUser.name = e
        setState(stateCopy)
    }

    const addNewEmail = (e) => {
        const stateCopy = {...state}
        stateCopy.newUser.email = e
        setState(stateCopy)
    }

    const deleteUser = async (id) => {
        const response = await axios.delete(`https://reqres.in/api/users/${id}`)
        console.log(response)
    }

    const clickButtonAddUser = () => {
        const stateCopy = {...state}
        stateCopy.openNewUser = true
        setState(stateCopy)
    }

    const addNewUser = async () => {
        if (state.newUser.name && state.newUser.email) {
            const stateCopy = {...state}
            const response = await axios.post(
                `https://reqres.in/api/users`
                ,
                {
                    "name": state.newUser.name,
                    "email": state.newUser.email
                }).then(response => {
                console.log(response)
                stateCopy.openNewUser = false
                setState(stateCopy)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const OpenEditUser = (id) => {
        const stateCopy = {...state}
        stateCopy.editUser.id = id
        stateCopy.editUser.first_name = ''
        stateCopy.editUser.email = ''
        setState(stateCopy)
    }

    const AddNameEditUser = (e) => {
        const stateCopy = {...state}
        stateCopy.editUser.first_name = e
        setState(stateCopy)
    }

    const AddEmailEditUser = (e) => {
        const stateCopy = {...state}
        stateCopy.editUser.email = e
        setState(stateCopy)
    }

    const ClickEditUser = async () => {
        const stateCopy = {...state}
        if ((state.editUser.id && state.editUser.first_name) || (state.editUser.id && state.editUser.email)) {
            const response = await axios.put(
                `https://reqres.in/api/users/${state.editUser.id}`
                ,
                {
                    "name": state.editUser.first_name,
                    "email": state.editUser.email
                }).then(response => {
                console.log(response)
                stateCopy.editUser.id = ''
                setState(stateCopy)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        windowScrollStart()
    })

    return (
        <div className={classes.MainWindow}>
            {
                !state.checkUser
                    ? <LogWindow
                        login={state.login}
                        password={state.password}
                        colorRed={state.colorRed}
                        checkUser={checkUser}
                        changePass={changePass}
                        changeLogin={changeLogin}
                    />
                    : <UserList
                        data={state.content}
                        newUser={state.newUser}
                        openNewUser={state.openNewUser}
                        editUser={state.editUser}
                        windowScrollStart={windowScrollStart}
                        getScrollUser={getScrollUser}
                        deleteUser={deleteUser}
                        addNewName={addNewName}
                        addNewEmail={addNewEmail}
                        addNewUser={addNewUser}
                        clickButtonAddUser={clickButtonAddUser}
                        OpenEditUser={OpenEditUser}
                        AddNameEditUser={AddNameEditUser}
                        AddEmailEditUser={AddEmailEditUser}
                        ClickEditUser={ClickEditUser}
                    />

            }

        </div>
    )
}

export default MainWindow