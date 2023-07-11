import { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "@/constants/endpoints";
import { axiosInternal, axiosPayment } from "@/tools/libraries/axios";
import { toast } from "react-hot-toast";
import { restrictedUsers } from "@/constants/ui-data";

const PaymentContext = createContext(undefined);
const PaymentProvider = ({ children }) => {
  const [assemblies, setAssemblies] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(false);

  //fetch all assemblies since most pages use assemblies
  useEffect(() => {
    getAssemblies();
  }, []);

  const getPaymentsByAssembly = async ([assemblyId, limit]) => {
    return await axiosPayment
      .get(
        `${ENDPOINTS.getPaymentsByAssembly}/${assemblyId}/payments?limit=${limit}`
      )
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getCustomersByAssembly = async (assemblyId) => {
    return await axiosPayment
      .get(`${ENDPOINTS.getCustomersByAssembly}/${assemblyId}/customers`)
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getCustomerByNiaTin = async (query) => {
    setLoading(true);
    return await axiosPayment
      .get(`${ENDPOINTS.getCustomerByNiaTin}/${query}/find-data`)
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      })
      .finally(() => setLoading(false));
  };

  const getCustomerOnAccByNiaTin = async (query) => {
    setLoading(true);
    return await axiosPayment
      .get(
        `${ENDPOINTS.getCustomerOnAccByNiaTin}/${query}/find-data-on-account`
      )
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      })
      .finally(() => setLoading(false));
  };

  const getBillsByCustomerId = async (customerId) => {
    return await axiosPayment
      .get(`${ENDPOINTS.getBillsByCustomerId}/${customerId}/bills`)
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getPropertiesByAssembly = async ([assemblyId, limit]) => {
    return await axiosPayment
      .get(
        `${ENDPOINTS.getPropertiesByAssembly}/${assemblyId}/properties?limit=${limit}`
      )
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getOnAccChequePayments = async ([user, limit]) => {
    if (restrictedUsers.includes(user?.role?.toLowerCase())) {
      return await axiosPayment
        .get(`${ENDPOINTS.getOnAccChequePayments}?limit=${limit}`)
        .then((response) => {
          if (!!response.data && response.data.code === 200) {
            toast.success(response.data.message);
            return response.data.data;
          }
        });
    }

    return await axiosPayment
      .get(`${ENDPOINTS.getOnAccChequePayments}?limit=${limit}`)
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getBillChequePayments = async ([assemblyId, limit]) => {
    return await axiosPayment
      .get(
        `${ENDPOINTS.getBillChequePayments}?assembly=${assemblyId}&limit=${limit}`
      )
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getBanks = async () => {
    return await axiosPayment.get(ENDPOINTS.getBanks).then((response) => {
      if (!!response.data && response.data.code === 200) {
        return response.data.data.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }
    });
  };

  const addChequePayment = async (data) => {
    return await axiosPayment
      .post(ENDPOINTS.addChequePayment, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
        }
      });
  };

  const addChequeOnAcc = async (data) => {
    return await axiosPayment
      .post(ENDPOINTS.addChequeOnAcc, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
        }
      });
  };

  const approveBillChequePayment = async (chequeId) => {
    toast.loading("Approving cheque");
    return await axiosPayment
      .put(`${ENDPOINTS.approveBillCheque}/${chequeId}/approve`)
      .finally(() => toast.dismiss());
  };

  const approveOnAccChequePayment = async (chequeId) => {
    toast.loading("Approving cheque");
    return await axiosPayment
      .put(`${ENDPOINTS.approveOnAccCheque}/${chequeId}/on-account/approve`)
      .finally(() => toast.dismiss());
  };

  async function getAssemblies() {
    return await axiosPayment.get(ENDPOINTS.getAssemblies).then((response) => {
      if (!!response.data && response.data.data && response.data.code === 200) {
        setAssemblies(response.data.data);
      }
    });
  }

  const getAssemblyPayments = async (assemblyId) => {
    return await axiosPayment
      .get(`${ENDPOINTS.getAssemblyPayments}/${assemblyId}/assembly-payments`)
      .then((response) => {
        if (!!response.data && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const addAssemblyPayment = async (data) => {
    return await axiosPayment
      .post(ENDPOINTS.addAssemblyPayment, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
        }
      });
  };

  const getCustomerDetails = async (data) => {
    setLoading(true);
    return await axiosInternal
      .post(ENDPOINTS.getCustomerDetails, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      })
      .finally(() => setLoading(false));
  };

  const payBill = async ([billId, payment]) => {
    if (billId) {
      return await axiosPayment
        .put(`${ENDPOINTS.payBill}/${billId}/pay`, payment)
        .then((response) => {
          if (!!response && response.data.code === 200) {
            return response.data;
          }
        });
    }
  };
  const payProperty = async ([propertyId, payment]) => {
    if (propertyId) {
      return await axiosPayment
        .put(`${ENDPOINTS.payProperty}/${propertyId}/third-party`, payment)
        .then((response) => {
          if (!!response && response.data.code === 200) {
            toast.success(response.data.message);
            return response.data;
          } else {
            toast.error(response.data.message);
          }
        });
    }
  };
  return (
    <PaymentContext.Provider
      value={{
        loading,
        assemblies,
        payBill,
        setLoading,
        getPaymentsByAssembly,
        addChequePayment,
        addChequeOnAcc,
        approveBillChequePayment,
        approveOnAccChequePayment,
        getAssemblies,
        getCustomersByAssembly,
        getPropertiesByAssembly,
        getCustomerByNiaTin,
        getCustomerOnAccByNiaTin,
        getBillsByCustomerId,
        getBanks,
        getOnAccChequePayments,
        getBillChequePayments,
        getAssemblyPayments,
        getCustomerDetails,
        addAssemblyPayment,
        payProperty,
        paymentDetails,
        setPaymentDetails,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
export default PaymentProvider;
