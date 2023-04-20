import { useEffect, useState } from 'react';
import { getUsers } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import User from './icons/User';

export default function SignIn() {
  const [storedUser, setStoredUser] = useState(null);
  const { handleSignInUser, user } = useAuth();

  const handleChangeUser = () => {
    // Prevent signing in if users failed to fetch.
    if (!storedUser) return;

    handleSignInUser(storedUser);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await getUsers();
      setStoredUser(users[1]);
    };

    fetchUsers();
  }, []);

  return (
    <button className="hover:underline sm:text-xl" onClick={handleChangeUser}>
      {!user ? (
        <>
          <User className="mb-1 ml-auto h-7 w-7 rounded-full sm:h-10 sm:w-10" />
          <span>Sign in</span>
        </>
      ) : (
        <>
          <img
            src={user.avatar_url}
            alt=""
            className="mb-1 ml-auto h-8 w-8 rounded-full sm:h-10 sm:w-10"
          />
          <div className="xs:w-auto w-[5rem] overflow-hidden text-ellipsis">
            {user.username}
          </div>
        </>
      )}
    </button>
  );
}
