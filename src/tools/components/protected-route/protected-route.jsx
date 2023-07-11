import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../sidebar/sidebar";
import { useCookies } from "react-cookie";
import { URLS } from "@/constants/routes";
import TopNav from "../top-nav/top-nav";

const ProtectedRoute = (Page, roles) => {
  const PageWrapper = (props) => {
    const [sidebar, setSidebar] = useState(true);
    const router = useRouter();
    const [cookies] = useCookies(["admin"]);

    const [shouldRender, setShouldRender] = useState(false);

    // Access the cookies as needed
    const adminData = cookies.admin;

    const handleSidebar = () => {
      if (window && window.innerWidth < 900) setSidebar(false);
    };

    useEffect(() => {
      // if (!adminData) {
      //   router.replace(URLS.login);
      // }
      if (window && window.innerWidth < 900) setSidebar(false);
    }, [router, adminData]);

    useEffect(() => {
      if (
        Array.isArray(roles) &&
        ![...roles, "superuser"].includes(adminData?.role?.toLowerCase())
      ) {
        router.replace(URLS.protected.dashboard);
      } else {
        setShouldRender(true);
      }
    }, [router, adminData]);

    if (!shouldRender) {
      return null;
    }

    return (
      <div className="h-[100%] w-[100%] overflow-x-hidden">
        <Sidebar
          sidebar={sidebar}
          handleSidebar={handleSidebar}
          toggleSidebar={() => setSidebar(!sidebar)}
          // user={adminData}
        />
        <div
          className={`${
            sidebar && "ml-[300px]"
          } flex flex-col flex-1 h-[100%] transition-all duration-500`}
        >
          <TopNav
            user={{ ...adminData, email: adminData?.email }}
            sidebar={sidebar}
            toggleSidebar={() => setSidebar(!sidebar)}
          />
          <main className="flex flex-col p-0 mt-5 lg:mt-0 md:p-10  mx-auto w-full lg:max-w-[1380px]">
            <Page {...props} user={{ ...adminData, email: adminData?.email }} />
          </main>
        </div>
      </div>
    );
  };
  return PageWrapper;
};

export default ProtectedRoute;
