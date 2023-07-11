import { ENDPOINTS } from "@/constants/endpoints";
import { axiosProperty } from "@/tools/libraries/axios";
import React, { useState } from "react";
import axios from "axios";
const { createContext, useContext } = require("react");
import { toast } from "react-hot-toast";
const PropertyContext = createContext(undefined);
const PropertyProvider = ({ children }) => {
  const [ownership, setOwnership] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [showOwnership, setShowOwnership] = useState(false);
  const [property, setProperty] = useState({});
  const [featureInfo, setFeatureInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 5.60655694631231,
    lng: -0.18698226863323716,
  });

  const getCustomerProperties = async (customerId) => {
    return await axiosProperty
      .get(`${ENDPOINTS.getCustomerProperties}/${customerId}/properties`)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          return response.data.data;
        }
      });
  };

  const addRentedProperty = async (data) => {
    return await axiosProperty
      .post(ENDPOINTS.addRentedProperty, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        } else {
          toast.error(response.data.message);
        }
      });
  };

  const addOwnerProperty = async (property) => {
    return await axiosProperty
      .post(ENDPOINTS.addOwnerProperty, property)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          if (response.data.error) {
            toast.error(response.data.message);
            return undefined;
          } else {
            toast.success(response.data.message);
            return response.data.data;
          }
        }
      });
  };

  const findPropertyByValuation = async (valuation) => {
    setLoading(true);
    if (valuation) {
      return await axiosProperty
        .get(`${ENDPOINTS.findPropertyByValuation}/${valuation}`)
        .then((response) => {
          if (!!response && response.data.data && response.data.code === 200) {
            toast.success(response.data.message);
            return response.data.data;
          } else if (response.data.code === 200 && !response.data.data) {
            toast.success(
              "The valuation number for this property is " +
                valuation +
                ". Please fill the details below"
            );
          }
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("No valuation number found");
    }
  };

  const findByValuation = async (valuation) => {
    setLoading(true);
    if (valuation) {
      return await axiosProperty
        .get(`${ENDPOINTS.findPropertyByValuation}/${valuation}`)
        .then((response) => {
          if (!!response && response.data.data) {
            toast.success(response.data.message);
            return response.data.data;
          }
          toast.error(response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getPropertyById = async (id) => {
    if (id) {
      return await axiosProperty
        .get(`${ENDPOINTS.getPropertyById}/${id}`)
        .then((response) => {
          return response.data.data;
        });
    }
  };

  const getProperties = async (id) => {
    if (id) {
      return await axiosProperty
        .get(`${ENDPOINTS.getProperties}/${id}/properties`)
        .then((response) => {
          return response.data.data;
        });
    }
  };
  const getRentersByProperty = async (id) => {
    if (id) {
      return await axiosProperty
        .get(`${ENDPOINTS.getRenters}/${id}/renters`)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {});
    }
  };
  const validateRenter = async (payload) => {
    const { id, status } = payload;
    const validateToast = toast.loading("updating");
    return await axiosProperty
      .put(`${ENDPOINTS.validateRenter}/${id}/${status}/update-validation`)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        toast.dismiss(validateToast);
      });
  };

  const getFeatureInfo = async (featureInfoUrl) => {
    return await axios.get(featureInfoUrl).then((response) => {
      if (!!response && response.data) {
        if (response.data.features[0].properties.valuation_number !== null) {
          setFeatureInfo(response.data.features[0]);
          toast.success(
            `The valuation number for this: ${response.data.features[0].properties.valuation_number}`
          );
          return response.data.features[0];
        }
      }
    });
  };

  const getProvisionalFields = async () => {
    return await axiosProperty
      .get(ENDPOINTS.getProvisionalFields)
      .then((response) => {
        if (!!response && response.data.data) return response.data.data;
      });
  };

  const getProvisionalSubCategory = async (code) => {
    if (code) {
      setLoading(true);
      setSubCategories([]);
      return await axiosProperty
        .get(
          `${ENDPOINTS.getProvisionalSubCategory}/${code}/get-provisional-sub-category`
        )
        .then((response) => {
          if (!!response && response.data.data)
            setSubCategories(response.data.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const addProvisionalRate = async (data) => {
    return axiosProperty
      .post(ENDPOINTS.addProvisionalRate, data)
      .then((response) => {
        if (!!response && response.data.code === 200) {
          toast.success(response.data.message);
          return response.data.data;
        }
      });
  };

  const findPropertyByGid = async (data) => {
    return axiosProperty.post(ENDPOINTS.findGid, data).then((response) => {
      if (!!response && !response.data.error) {
        toast.success(response.data.message);
        return response.data.data;
      }
    });
  };
  return (
    <PropertyContext.Provider
      value={{
        getCustomerProperties,
        loading,
        coordinates,
        featureInfo,
        ownership,
        showOwnership,
        subCategories,
        property,
        setProperty,
        findPropertyByGid,
        setSubCategories,
        setShowOwnership,
        setOwnership,
        setFeatureInfo,
        setCoordinates,
        addOwnerProperty,
        addRentedProperty,
        findPropertyByValuation,
        getProperties,
        getPropertyById,
        getFeatureInfo,
        getProvisionalFields,
        getProvisionalSubCategory,
        addProvisionalRate,
        findByValuation,
        getRentersByProperty,
        validateRenter,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
export default PropertyProvider;
