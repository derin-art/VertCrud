import useFirebaseAuth from "../Hooks/useFireBaseAuth";
import { createContext, useContext } from "react";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  SignInWithEmailAndPassword: async () => {},
  CreateUserWithEmailAndPassword: async () => {},
  SignOut: async () => {},
});

function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  useEffect(() => {
    if (auth.authUser) {
      console.log(auth.authUser);
      if (auth.authUser.email) {
        console.log(auth.authUser.email);
        if (!auth.userData) {
          auth.getUserData(auth.authUser.email);
        }
      }
    } else {
    }
  }, []);
  return (
    <authUserContext.Provider
      value={auth}
      children={children}
    ></authUserContext.Provider>
  );
}

const useAuth = () => useContext(authUserContext);

export { useAuth, AuthUserProvider };
