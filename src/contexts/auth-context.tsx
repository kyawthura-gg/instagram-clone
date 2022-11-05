import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth, Hub } from "aws-amplify";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = CognitoUser | null | undefined;
interface AuthContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    let ignore = false;
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        !ignore && setUser(currentUser);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const listener = (data) => {
      const { event } = data.payload;
      if (event === "signOut") {
        setUser(null);
      }
    };
    Hub.listen("auth", listener);

    return () => Hub.remove("auth", listener);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
