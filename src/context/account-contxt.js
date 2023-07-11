import { ENDPOINTS } from "@/constants/endpoints";
import { restrictedUsers } from "@/constants/ui-data";
import { axiosAuth, axiosInternal } from "@/tools/libraries/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const { createContext, useContext } = require("react");

const AccountContext = createContext(undefined);
const AccountProvider = ({ children }) => {
  const [isUpdating, setIsUpdating] = useState({ loading: false, id: null });
  const [customerDetails, setCustomerDetails] = useState({});
  const [addPropertyState, setAddPropertyState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [showPayBill, setShowPayBill] = useState(false);
  const [showBill, setShowBill] = useState(true);
  const [renterForm, setRenterForm] = useState(false);
  const [propertyDetailState, setPropertyDetailState] = useState(false);
  const [addRenterState, setAddRenterState] = useState(false);
  const [showPayBillState, setShowPayBillState] = useState(false);

  const closeAllModals = () => {
    setAddPropertyState(false);
    setAddState(false);
    setShowPayBill(false);
    setShowBill(false);
    setRenterForm(false);

    setPropertyDetailState(false);

    setAddRenterState(false);

    setShowPayBillState(false);
  };
  const addUser = async (data) => {
    if (data) {
      return await axiosAuth.post(ENDPOINTS.addUser, data).then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data;
        }
      });
    }
  };
  const addRole = async (data) => {
    if (data) {
      return await axiosAuth.post(ENDPOINTS.addRole, data).then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data;
        }
      });
    }
  };
  const getAssemblies = async () => {
    return await axiosAuth.get(ENDPOINTS.getAssemblies).then((response) => {
      if (!!response && response.data.code === 200) {
        return response.data;
      }
    });
  };
  const getUsers = async () => {
    return await axiosAuth
      .get(ENDPOINTS.getUsers)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data;
        }
      })
      .catch((error) => {});
  };
  const getAgents = async (user) => {
    if (restrictedUsers.includes(user?.role?.toLowerCase())) {
      return await axiosAuth
        .get(`${ENDPOINTS.getUsers}?assembly=${user?.assembly}&role=Agent`)
        .then((response) => {
          if (!!response && response.data.code === 200) {
            return response.data;
          }
        });
    }

    return await axiosAuth
      .get(`${ENDPOINTS.getUsers}?role=Agent`)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data;
        }
      });
  };
  const getRoles = async () => {
    return await axiosAuth.get(ENDPOINTS.getRoles).then((response) => {
      if (!!response && response.data.code === 200) {
        return response.data;
      }
    });
  };
  const UpdateUserStatus = async ([id, status]) => {
    const userToast = toast.loading("updating user");
    setIsUpdating({ loading: true, id: id });
    return await axiosAuth
      .put(`${ENDPOINTS.updateStatus}/${id}/${status}`)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data;
        }
      })
      .finally(() => {
        toast.dismiss(userToast);
        setIsUpdating({ loading: false, id: null });
      });
  };

  const getRatepayerDetails = async (data) => {
    return await axiosInternal
      .post(ENDPOINTS.getRatepayerDetails, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const getRatepayerDetailsByPhone = async (data) => {
    return await axiosAuth
      .post(ENDPOINTS.getRatepayerDetailsByPhone, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  return (
    <AccountContext.Provider
      value={{
        isUpdating,
        addUser,
        getAssemblies,
        getUsers,
        addRole,
        getRoles,
        UpdateUserStatus,
        setIsUpdating,
        getAgents,
        getRatepayerDetails,
        getRatepayerDetailsByPhone,
        customerDetails,
        setCustomerDetails,
        addPropertyState,
        setAddPropertyState,
        showPayBill,
        setShowPayBill,
        addState,
        setAddState,
        renterForm,
        setRenterForm,
        showBill,
        setShowBill,
        propertyDetailState,
        setPropertyDetailState,
        addRenterState,
        setAddRenterState,
        showPayBillState,
        setShowPayBillState,
        closeAllModals,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
export default AccountProvider;
