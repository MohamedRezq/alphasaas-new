import { LoginForm } from "@/components/forms";
import { PageLoading } from "@/components/loaders";
import { RootState } from "@/store";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
//-----> Assets <----------------------------------------------//
import logo from "@/public/assets/img/AlphaS wordmark.svg";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
const Login = () => {
  //----------------------------------------------------------------------------------//
  const { theme, setTheme } = useTheme();
  //----------------------------------------------------------------------------------//
  const { isLoading } = useSelector((state: RootState) => state.loading);
  //----------------------------------------------------------------------------------//
  // useEffect(() => setTheme("light"), []);
  //----------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------//

  //-------------------------------------------------------------------------//

  //-------------------------------------------------------------------------//
  //-------------------------------------------------------------------------//
  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <main className="flex w-full bg-[#F8F8F8] relative h-[100vh] flex-col items-center justify-center md:py-[56px] md:px-[41px]">
          <div className="bg-white rounded-2xl w-full h-full max-w-[1179px] md:max-h-[608px] flex flex-col items-center py-10 justify-center">
            <LoginForm />
            <div className="relative mt-24">
              <Image width={105} src={logo} alt="AlphaSaas" />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Login;
