import { useAuthValue } from '../../src/components/AuthContext/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../src/components/Api/firebase-config';

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
