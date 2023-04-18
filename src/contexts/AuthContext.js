import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const handleSignInUser = useCallback((newUser) => setUser(newUser), []);

  const value = useMemo(
    () => ({
      user,
      handleSignInUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be wrapped in an <AuthProvider />');
  }

  return context;
}
