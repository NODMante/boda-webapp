import { createContext, useContext } from "react"
import { ENDPOINTS } from "@/constants/endpoints";
import { axiosAuth } from "@/tools/libraries/axios";

const AuthContext = createContext(undefined);
const AuthProvider = ({ children }) => {
  const verifyLogin = async (data) => {
    return await axiosAuth.post(ENDPOINTS.verifyLogin, data);
  };

  const adminLogin = async (data) => {
    return await axiosAuth.post(ENDPOINTS.adminLogin, data);
  };

  return (
    <AuthContext.Provider value={{ adminLogin, verifyLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
