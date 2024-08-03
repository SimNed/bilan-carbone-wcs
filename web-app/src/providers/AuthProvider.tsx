import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT_USER } from "@/api-gql/mutations/user.mutations";
import { User } from "@/gql/graphql";
import { GET_USER_PROFIL } from "../api-gql/queries/user.queries";
import { enqueueSnackbar } from "notistack";

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [logoutMutation] = useMutation(LOGOUT_USER);
  const { data } = useQuery(GET_USER_PROFIL);

  useEffect(() => {
    if (!user && data && data.getUserProfile) {
      setUser(data.getUserProfile);
    }
  }, [data]);

  const logout = async () => {
    await logoutMutation({
      onCompleted: () => {
        setUser(null);
        router.push("/");
        enqueueSnackbar("Déconnecté du compte.", { variant: "info" });
      },
      onError: () => {
        enqueueSnackbar("Il y a eu une erreur lors de la déconnexion.", {
          variant: "error",
        });
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
