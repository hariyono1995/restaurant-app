import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.config";

import { useStateValue } from "context/StateProvider";
import { actionType } from "context/reducer";

import Logo from "assets/images/logo.png";
import Avatar from "assets/images/avatar.png";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData, refreshToken },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
      console.log(user);
    } else {
      setIsMenu(!isMenu);
    }
  };

  return (
    <header className="w-screen fixed p-2 px-4  md:p-6  md:px-16  z-50">
      {/* Desktop & Tablet */}
      <div className="h-full w-full md:flex hidden  justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="restaurant logo" />
          <p className="text-textColor font-bold">City</p>
        </Link>

        <nav className="flex gap-8 ">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex gap-8 ml-auto items-center "
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              service
            </li>
          </motion.ul>

          <div className="flex justify-center items-center relative">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="flex justify-center items-center w-4 h-4 rounded-full bg-cartNumBg absolute -top-2 -right-2">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="flex items-center justify-center drop-shadow-xl relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user?.photoURL : Avatar}
              alt="user profile"
              className="w-8 h-8 min-w-[32px] min-h-[32px] cursor-pointer rounded-full"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute text-sm rounded-lg w-32 bg-gray-50 shadow-lg  py-2 right-0 top-10"
              >
                {user && user.email === "akunbarusaya1995@gmail.com" && (
                  <Link to="/create">
                    <p
                      className="flex gap-3
                 items-center text-xs text-textColor  hover:text-green-700 hover:bg-slate-100 transition-all duration-150 cursor-pointer
                px-4 py-2
              "
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="flex 
                 items-center text-xs text-textColor gap-7 hover:text-green-700 hover:bg-slate-100 transition-all duration-150 cursor-pointer
                px-4 py-2
              "
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile */}
      <div className="h-full w-full md:hidden flex justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="restaurant logo" />
          <p className="text-textColor font-bold">City</p>
        </Link>

        <div className="flex items-center justify-center drop-shadow-xl relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user?.photoURL : Avatar}
            alt="user profile"
            className="w-8 h-8 min-w-[32px] min-h-[32px] cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute text-sm rounded-lg w-32 bg-gray-50 shadow-lg  py-2 right-0 top-10"
            >
              {user && user.email === "akunbarusaya1995@gmail.com" && (
                <Link to="/create">
                  <p
                    className="flex gap-3
                 items-center text-xs text-textColor  hover:text-green-700 hover:bg-slate-100 transition-all duration-150 cursor-pointer
                px-4 py-2
              "
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex  flex-col  p-2 px-4 ">
                <li className="text-xs text-textColor hover:text-headingColor  ease-in-out cursor-pointer hover:bg-slate-200 transition-all   duration-150 py-2">
                  Home
                </li>
                <li className="text-xs text-textColor hover:text-headingColor  ease-in-out cursor-pointer hover:bg-slate-200 transition-all   duration-150 py-2">
                  Menu
                </li>
                <li className="text-xs text-textColor hover:text-headingColor  ease-in-out cursor-pointer hover:bg-slate-200 transition-all   duration-150 py-2">
                  About Us
                </li>
                <li className="text-xs text-textColor hover:text-headingColor  ease-in-out cursor-pointer hover:bg-slate-200 transition-all   duration-150 py-2">
                  service
                </li>
              </ul>
              <p
                className="flex 
                 items-center text-xs text-textColor  hover:text-green-700 hover:bg-slate-300 transition-all duration-150 cursor-pointer justify-center
                px-4 py-2 bg-slate-200
              "
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
