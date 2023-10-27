import { useState } from 'react'
import { useGlobalContext } from './../GlobalContext'
import PropTypes from 'prop-types'
import UserSingle from '../UserSingle/UserSingle'
import styles from './UsersList.module.css'

function UsersList({title}) {
	const { users, addUser } = useGlobalContext()
	const [form, setForm] = useState(false)
	const [newUser, setNewUser] = useState('')
	const [error, setError] = useState(false)

	function addUserLocal() {
		if (newUser.length < 1) {
			setError(true)
		} else {
			addUser(`${ newUser }`)
			setForm(!form)
			setNewUser('')
			setError(false)
		}
	}

	return (
		<>
			<h1>{title}</h1>
			<div className={styles.usersList}>
				{ users.map((item, index) => (
					<UserSingle item={item} key={index} />
				)) }
			</div>
			<button onClick={ () => { setForm(!form), setError(false) } }>{ !form ? 'Add user' : 'Cancel'}</button>
			{ form && <div>
				<input type='text' placeholder='Name' onInput={ (e) => setNewUser(e.target.value) } onKeyDown={ (e) => {if (e.key === 'Enter') addUserLocal()} } />
				<button onClick={ addUserLocal }>Done</button>
			</div> }
			{ error && <p className={ styles.error }>Please, add a Name</p> }
		</>
	)
}

UsersList.propTypes = {
	title: PropTypes.string.isRequired
}

export default UsersList
