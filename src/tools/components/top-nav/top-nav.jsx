import { useEffect, useState, Fragment } from "react";
import { BsPerson } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useCookies } from "react-cookie";
import ConfirmationModal from "../confirmation-modal/confirmation-maodal";

const TopNav = ({ user, toggleSidebar, sidebar }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);

  useEffect(() => setUserData(user ? user : {}), [user]);

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          handleCancel={() => setShowConfirmation(false)}
          handleConfirm={() => {
            removeCookie("admin", { path: "/" });
            setShowConfirmation(false);
          }}
        />
      )}
      <div className="sticky top-0 flex w-full justify-between items-center p-5">
        <HiArrowLeft
          onClick={() => toggleSidebar()}
          className={`${
            sidebar ? "rotate-0" : "rotate-180"
          } text-blue-800 w-8 h-8 font-bold cursor-pointer transition-all duration-700`}
        />
        <div className="border-l-2 w-14 md:w-[20%] flex items-center justify-center ">
          <div className="w-[70%] hidden md:flex flex-col items-center justify-center">
            <Menu as="div" className="relative">
              <Menu.Button className="flex flex-col space-y-0.5 text-xs items-center py-3 w-full sm:text-sm">
                {/* <FiChevronDown /> */}
                <h4 className="text-[12px]">{userData?.name}</h4>
                <h6 className="text-[10px] font-light flex items-center ">
                  {userData?.role ?? ""} <FiChevronDown className="ml-1" />{" "}
                </h6>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-800"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute shadow-md left-1 w-[150px] z-400 flex flex-col rounded-full bg-white">
                  <Menu.Item>
                    {({ active }) => (
                      <div className="flex flex-cols">
                        <button
                          onClick={() => {
                            setShowConfirmation(true);
                          }}
                          className={`${
                            active && "bg-red-500 rounded-full text-white"
                          } text-center text-sm w-full text-red-500 py-2`}
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex items-center justify-center rounded-full">
            <BsPerson className="hidden md:block text-red-500 text-3xl" />
            <Menu as="div" className="relative md:hidden">
              <Menu.Button className="flex space-y-0.5 text-xs items-center py-3 w-full sm:text-sm">
                <BsPerson className="text-red-500 text-3xl" />
                <FiChevronDown className="text-red-500 text-lg" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-800"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute shadow-md right-1 w-[150px] z-400 flex flex-col rounded h-fit bg-white ">
                  <Menu.Item>
                    {({ active }) => (
                      <div>
                        <div className="bg-gray-200 w-full flex flex-col items-center justify-center py-1 md:hidden">
                          <h4 className="text-[12px] text-center">
                            Hello {userData?.name}
                          </h4>
                          <h6 className="text-[10px] font-light flex items-center ">
                            {userData?.role ?? ""}
                            <FiChevronDown className="ml-1" />{" "}
                          </h6>
                        </div>
                        <button
                          onClick={() => {
                            setShowConfirmation(true);
                          }}
                          className={`${
                            active && " bg-red-400 text-white"
                          } text-center text-sm w-full  py-2`}
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <FiChevronDown /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
