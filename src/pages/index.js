import { URLS } from "@/constants/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const router = useRouter();
  const [cookies] = useCookies(["admin"]);
  const admin = cookies.admin;

  useEffect(() => {
    if (admin) {
      router.push(URLS.protected.dashboard);
    } else {
      router.push(URLS.protected.dashboard);
    }
  }, [router, admin]);

  return null;
};

export default Home;
