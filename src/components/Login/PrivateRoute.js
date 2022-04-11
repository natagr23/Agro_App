import { Navigate } from 'react-router-dom';
import { useAuthValue } from '../AuthContext/AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthValue();

  if (!currentUser?.emailVerified) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
}
