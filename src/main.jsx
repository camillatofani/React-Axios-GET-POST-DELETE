import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import style from './index.css'
import { GlobalProviderComponent } from './GlobalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<GlobalProviderComponent>
		<App />
	</GlobalProviderComponent>,
)
