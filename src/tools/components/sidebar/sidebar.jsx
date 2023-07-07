import { navigations } from "@/constants/navigations";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ sidebar, handleSidebar, toggleSidebar, user }) => {
    console.log(user)
    const shouldGrantAccess = (menu) => {
        return menu
    }
  return (
    <aside
      className={`${
        sidebar ? "left-0 duration-50 " : "left-[100%] duration-200 ease-in"
      } md:fixed w-[100%] h-[100%] fixed left-0 top-0 md:w-[260px] py-4 bg-blue-600 z-50 flex flex-col transition-all`}
    >
      <IoMdClose
        onClick={() => toggleSidebar()}
        className="md:hidden absolute top-5 right-5 xs:top-3 xs:right-3 text-white w-8 h-8 cursor-pointer"
      />
      <div className="flex flex-row items-center space-x-4 mx-10 my-12">
        <p className="text-sideBarInActiveItem font-black text-2xl">MyAssembly</p>
      </div>
      <div className="flex flex-col w-full h-full justify-between">
        <div className=" sidebar w-full flex flex-col mt-5 space-y-0 pl-10 md:items-start md:pl-0">
          {/* eslint-disable-next-line array-callback-return */}
          {navigations.map((menu, index) => {
            if (shouldGrantAccess(menu)) {
              return (
                <Link
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row space-x-4 items-center bg-sideBarActiveItemBg w-full md:pl-10 md:bg-sideBarActiveItemBg py-3 border-l-4"
                      : "flex flex-row space-x-4 items-center hover:bg-sideBarActiveItemBg w-full hover:pl-64 md:hover:pl-5 md:hover:bg-sideBarActiveItemBg py-3 md:pl-10 md:hover:border-l-4"
                  }
                //   href={menu.link}
                  onClick={handleSidebar}
                >
                  {/* {menu.icon} */}
                  <p className="text-white text-md">{menu.name}</p>
                </Link>
              );
            }
          })}
        </div>
        <div className="">
          <h1 className="text-white text-center font-bold w-full">
            Powered by{" "}
            <a
              target="_blank"
              href="https://www.casanteybusinesssystems.com"
              className="text-orange-400"
              rel="noreferrer"
            >
              Casantey
            </a>
          </h1>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
