import {
    ENDPOINTS,
    METABASE_SECRET_KEY,
    METABASE_SITE_URL,
  } from "@/constants/endpoints";
  import { restrictedUsers } from "@/constants/ui-data";
  import { axiosPayment } from "@/tools/libraries/axios";
  import jwt from "jsonwebtoken";
  
  const { createContext, useContext } = require("react");
  
  const DashboardContext = createContext(undefined);
  const DashboardProvider = ({ children }) => {
    const getDashboard = async () => {
      return await axiosPayment.get(ENDPOINTS.getDashboard).then((response) => {
        if (!!response && response.data.code === 200) {
          return response?.data;
        }
      });
    };
  
    const getDashboardData = async (user) => {
      if (restrictedUsers.includes(user?.role?.toLowerCase())) {
        return await axiosPayment
          .get(`${ENDPOINTS.getDashboard}?assembly=${user?.assembly}`)
          .then((response) => {
            if (!!response) {
              return response?.data;
            }
          });
      }
      return await axiosPayment.get(ENDPOINTS.getDashboard).then((response) => {
        if (!!response) {
          return response?.data;
        }
      });
    };
  
    const getMetabaseUrl = (user) => {
      const payload = {
        resource: { dashboard: 3 },
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
      };
      if (restrictedUsers.includes(user?.role?.toLowerCase())) {
        payload.resource.dashboard = 4;
        payload.params.id = user?.assembly;
      }
  
      const METABASE_TOKEN = jwt.sign(payload, METABASE_SECRET_KEY);
      return `${METABASE_SITE_URL}${ENDPOINTS.metabaseDashboard}/${METABASE_TOKEN}#bordered=false&titled=false`;
    };
    return (
      <DashboardContext.Provider
        value={{ getDashboard, getDashboardData, getMetabaseUrl }}
      >
        {children}
      </DashboardContext.Provider>
    );
  };
  
  export const useDashboardContext = () => useContext(DashboardContext);
  export default DashboardProvider;
  