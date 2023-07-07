import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TopNav from "../top-nav/top-nav";
import Sidebar from "../sidebar/sidebar";

const ProtectedRoute = (Page) => {
  const PageWrapper = (props) => {
    const [sidebar, setSidebar] = useState(true);
    const router = useRouter();
    const { data: session } = useSession();

    const handleSidebar = () => {
      if (window && window.innerWidth < 900) setSidebar(false);
    };

    useLayoutEffect(() => {
      // if (!session) {
      //   router.push(URLS.login);
      // }
      if (window && window.innerWidth < 900) setSidebar(false);
    }, [router, session]);

    return (
      <div className="h-[100%] w-[100%] overflow-x-hidden">
        <Sidebar
          sidebar={sidebar}
          handleSidebar={handleSidebar}
          toggleSidebar={() => setSidebar(!sidebar)}
          user={session}
        />
        <div
          className={`${
            sidebar && "ml-[300px]"
          } flex flex-col flex-1 h-[100%] transition-all duration-500`}
        >
          <TopNav sidebar={sidebar} toggleSidebar={() => setSidebar(!sidebar)} />
          <main className="flex  flex-col p-0 mt-5 lg:mt-0 md:p-10">
            <Page {...props} user={session} />
          </main>
        </div>
      </div>
    );
  };
  return PageWrapper;
};

export default ProtectedRoute;
