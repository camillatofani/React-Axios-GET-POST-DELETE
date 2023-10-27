import PropTypes from 'prop-types'
import styles from './UserSingle.module.css'
import { useGlobalContext } from './../GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function UserSingle({ item, index }) {
	const { deleteUserByID } = useGlobalContext()

	return (
		<div className={ styles.userSingle } key={ index } onClick={ () => deleteUserByID(item.id) }>
			<span>
				{ item.id } - { item.name }
			</span>
			<span className={styles.delete}>
				<FontAwesomeIcon icon={ faTrash } />
			</span>
		</div>
	)
}

UserSingle.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.node
}

export default UserSingle
