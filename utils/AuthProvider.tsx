import { useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
//-----> Redux <----------------------------------------------//
import { useSelector } from "react-redux";
import { RootState } from "@/store";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//

type AuthProviderProps = {
  children: ReactElement<any, any>;
  redirectUrl?: string;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user.token) router.push("/login");
    if (user.token && user.info.applications.length === 0)
      router.push("/welcome/select");
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
