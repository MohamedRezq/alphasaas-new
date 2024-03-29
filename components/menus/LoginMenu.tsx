import React from "react";
import { useRouter } from "next/navigation";
//-----> Components <-----------------------------------------//
import Menu, { Item as MenuItem } from "rc-menu";
//-----> Redux <----------------------------------------------//
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/slices/user";
//-----> Assets <---------------------------------------------//

//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//

const LoginMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //----------------------------------------------------------------------------------//
  const handleUserLogout = () => {
    dispatch(removeUser());
    router.push("/");
  };
  //----------------------------------------------------------------------------------//

  return (
    <Menu className="px-4" onSelect={() => {}}>
      <MenuItem className="hover:bg-hippiegreen hover:text-white text-dovegray cursor-pointer text-xs font-semibold">
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleUserLogout}
        className="hover:bg-hippiegreen hover:text-white text-dovegray cursor-pointer text-xs font-semibold"
      >
        Sign out
      </MenuItem>
    </Menu>
  );
};

export default LoginMenu;
