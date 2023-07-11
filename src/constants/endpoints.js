export const AUTH_URL = process.env.AUTH_URL;
export const PAYMENT_URL = process.env.PAYMENT_URL;
export const PROPERTY_URL = process.env.PROPERTY_URL;
export const BILLING_URL = process.env.BILLING_URL;
export const DASHBOARD_URL = process.env.DASHBOARD_URL;
export const EGCR_URL = process.env.EGCR_URL;
export const VERSION = process.env.VERSION;
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLEMAPS_API_KEY;
export const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
export const DIGITALPAYMENT_URL = process.env.DIGITALPAYMENT_URL;
export const INTERNAL_URL = process.env.INTERNAL_URL;
export const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

export const ENDPOINTS = {
  // Accounts
  addUser: "/api/admin/auth/users",
  getUsers: "/api/admin/auth/users",
  getRatepayerDetails: "/api/high-level/ratepayer",
  getRatepayerDetailsByPhone: "/api/admin/auth/customer",
  getCustomerByPhone: "/api/admin/auth/customer",

  // getAssemblies: "/api/admin/auth/assemblies",
  addRole: "/api/admin/auth/users/roles",
  getRoles: "/api/admin/auth/users/roles",
  updateStatus: "/api/admin/auth/user",

  //Dashboard
  getDashboard: "api/admin/dashboard",

  // Authentication
  adminLogin: "api/admin/auth/users/login",
  verifyLogin: "/api/admin/auth/users/verify-otp",

  // Payment
  getPaymentsByAssembly: "/api/admin", // append assembly id
  addChequePayment: "/api/admin/payments/cheque",
  addChequeOnAcc: "/api/admin/payments/cheque-on-account",
  approveChequePayment: "/api/admin/cheque", // append cheque payment id
  getAssemblies: "",
  //  "/api/admin/assemblies",
  getCustomersByAssembly: "/api/admin",
  getPropertiesByAssembly: "/api/admin",
  getCustomerByNiaTin: "/api/admin",
  getCustomerOnAccByNiaTin: "/api/admin",
  getBillsByCustomerId: "/api/admin",
  getBanks: "/api/admin/banks",
  getBillChequePayments: "/api/admin/payments/cheque",
  getOnAccChequePayments: "/api/admin/payments/cheque-on-account",
  approveBillCheque: "/api/admin/cheque",
  approveOnAccCheque: "/api/admin/cheque",
  getAssemblyPayments: "/api/admin",
  addAssemblyPayment: "/api/admin/assembly-payments",
  getCustomerDetails: "/api/high-level/ratepayer",
  payBill: "/api/payments", // append bill id
  findGid: "/map_service/find-gid",
  payProperty: "/api/payments",

  // Metabase dashboard
  metabaseDashboard: "/embed/dashboard",

  //  Bills
  getCustomerBills: "/api/billing",
  getBillById: "/api/billing",

  downloadBill: "/api/billing",
  // Properties
  getCustomerProperties: "/api/customer",

  //digital payment
  fetchEgcr: "/payment/dcs/fetch-egcr",
  addOwnerProperty: "/api/properties/customer/add-property",
  addRentedProperty: "/api/properties/customer/rented-property",
  getPropertyById: "/api/properties", // append property id
  findPropertyByValuation: "/api/properties/find-by-valuation", // append valuation number
  getProperties: "/api/customer",
  getRenters: "/api/properties", // append property id
  getProvisionalFields: "/api/get-provisional-fields",
  getProvisionalSubCategory: "/api", // append sub category code
  addProvisionalRate: "api/properties/provisional-rate",
  validateRenter: "/api/properties",
};
