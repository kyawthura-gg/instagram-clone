import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth, Hub } from "aws-amplify";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = CognitoUser | null | undefined;
interface AuthContextType {
  user: UserType;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  const checkUser = async (ignore?: boolean) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      !ignore && setUser(currentUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    let ignore = false;
    checkUser(ignore);
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
      if (event === "signIn") {
        checkUser(false);
      }
    };
    Hub.listen("auth", listener);

    return () => Hub.remove("auth", listener);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
