import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      
        {role === 'Admin' && (
        <div>
          <h2>Admin Dashboard</h2>
          <ul>
            <li>View all users</li>
            <li>Add books</li>
            <li>Remove books</li>
            <li>Manage issues</li>
          </ul>
        </div>
      )}

       {role === 'User' && (
        <div>
          <h2>User Dashboard</h2>
          <ul>
            <li>Browse books</li>
            <li>My issued books</li>
            <li>Request new book</li>
          </ul>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
