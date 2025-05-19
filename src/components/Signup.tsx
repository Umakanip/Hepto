import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post('/auth/signup', { username, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
