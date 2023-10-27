import { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const GlobalContext = createContext()
const GlobalProvider = GlobalContext.Provider

export function useGlobalContext() {
	return useContext(GlobalContext)
}

export function GlobalProviderComponent({ children }) {
	// Users
	const [users, setUsers] = useState([])
	// InitialValue with useEffect
	useEffect(() => {
		axios.get(`https://jsonplaceholder.typicode.com/users`)
			.then(res => {
				setUsers(res.data)
			})
	}, [])
	// Delete user by ID
	function deleteUserByID(id) {
		axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
			.then(res => {
				if (res.status === 200) {
					console.log('status 200')
					newArrayUser(id, false)
				}
				else
					console.log('status != 200')
			})
	}
	// Add new user
	function addUser(name) {
		const body = {
			id: users.length + 1,
			name: name
		}
		axios.post(`https://jsonplaceholder.typicode.com/users`, {
			body,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
			.then((res) => {
				if (res.status === 201) {
					console.log('status 201')
					newArrayUser(res.data.body.id, res.data.body.name)
				}
				else
					console.log('status != 201')
			})
	}
	// New array user by ID
	function newArrayUser(idUser, nameUser) {
		var newArray
		if (!nameUser) {
			newArray = users.filter((user) => user.id != idUser)
			setUsers(newArray)
		} else {
			const newUser = { id: idUser, name: nameUser }
			setUsers((prevUsers) => [...prevUsers, newUser])
		}
	}

	// Global Values
	const globalValues = {
		// Users
		users,
		deleteUserByID,
		addUser
	}

	return <GlobalProvider value={ globalValues }>{ children }</GlobalProvider>
}

GlobalProviderComponent.propTypes = {
	children: PropTypes.any
}
