import React, {useState} from 'react';
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons';


const SignInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // handle submit fn
    const handleSubmit = async (e) => {
        e.preventDefault()
        // authenticate first
        const authObject = { 'Project-ID': "be54b254-b566-4c4f-8be0-6babeb8f8274", 'User-Name': username, 'User-Secret': password }
        try {
            // get messages once I get the user
            await axios.get('https://api.chatengine.io/chats', {headers: authObject})
            // save the user in local storage
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            // reload the page
            window.location.reload()
        } catch (error) {
            // catch the error
            setError('Sorry...incorrect credentials')
        }
        
    }

    return ( 
        <div className="wrapper">
            <div className="dropdown">
                <button className="dropbtn"><UserOutlined className="test-user-icon"/></button>
                <div className="dropdown-content">
                    <li>johnwick - 123123</li>
                    <li>wendyweber - pass</li>
                    <li>mrbean - admin</li>
                </div>
            </div>
            <div className="form">
                <h1 className="title">Banter</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                    placeholder="Username"
                    required
                    />
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="Password"
                    required
                    />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Texting</span>
                        </button>
                    </div>
                    <h3 className="error">{error}</h3>
                </form>
            </div>
        </div>
     );
}
 
export default SignInForm;