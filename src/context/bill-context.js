import { BILLING_URL, ENDPOINTS } from "@/constants/endpoints";
import { axiosBilling } from "@/tools/libraries/axios";
import { toast } from "react-hot-toast";
import {useState} from 'react'

const { createContext, useContext } = require("react");

const BillContext = createContext(undefined);
const BillProvider = ({ children }) => {
   const [showPayment, setShowPayment] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({});
  const getCustomerBills = async (customerId) => {
    return await axiosBilling
      .get(`${ENDPOINTS.getCustomerBills}/${customerId}/customer`)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data.data;
        }
      });
  };

  const getBillById = async (billId) => {
    if (billId) {
      return await axiosBilling
        .get(`${ENDPOINTS.getBillById}/${billId}`)
        .then((response) => {
          if (!!response && response.data.code === 200) {
            toast.success(response.data.message);
            return response.data.data;
          } else {
            toast.error(response.data.message);
          }
        });
    } else {
      // toast.error("No bill id found");
    }
  };

  const downloadBill = async (billId) => {
    window.open(`${BILLING_URL}${ENDPOINTS.downloadBill}/${billId}/pdf`);
  };

  return (
    <BillContext.Provider
      value={{
        getCustomerBills,
        getBillById,
        downloadBill,
        showPayment, setShowPayment,paymentDetails, setPaymentDetails
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBillContext = () => useContext(BillContext);
export default BillProvider;
