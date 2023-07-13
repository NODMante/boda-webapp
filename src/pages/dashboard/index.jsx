import ProtectedRoute from "@/tools/components/protected-route/protected-route";
import { TbFileCertificate } from "react-icons/tb";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BsCreditCard2BackFill } from "react-icons/bs";
import Link from "next/link";

const Dashboard = () => {
  const dashCards = [
    {
      value: 141978364.22,
      name: "Total Bill Amount (GHS)",
      icon: <TbFileCertificate className="text-4xl text-indigo-100" />,
    },
    {
      value: 13674.94,
      name: "Total Payments Made (GHS)",
      icon: <BsCreditCard2FrontFill className="text-4xl text-indigo-100" />,
    },
    {
      value: 141964689.27,
      name: "Outstanding amount (GHS)",
      icon: <BsCreditCard2BackFill className="text-4xl text-indigo-100" />,
    },
  ];
  return (
    <>
      {" "}
      <div className=" flex w-full">
        {dashCards.map((card, index) => {
          return (
            <div
              key={index}
              className="w-[100%] flex flex-col items-center justify-around"
            >
              <Link
                href=""
                className="h-32 w-72 rounded-md flex items-center justify-between p-10 bg-white shadow-md space-x-5"
              >
                <div className="flex flex-col space-y-2">
                  <h1
                    className={`text-2xl font-bold text-primary text-indigo-900`}
                  >
                    {card?.value}
                  </h1>
                  <h1
                    className={`text-xs text-indigo-900 font-light ${card?.color}`}
                  >
                    {card?.name}
                  </h1>
                </div>
                <h1 className="text-sm text-gray-400">{card?.icon}</h1>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-between items-center mt-10 space-x-10">
        <div className="h-60 w-full rounded-md flex items-center justify-between p-10 bg-white shadow-md space-x-5">
          <div className="flex flex-col space-y-1">
            <h1 className={`text-2xl font-bold text-primary text-indigo-900`}>
            Resolved: 8
            </h1>
            <h1>Unresolved: 118</h1>
            <h1>Total: 126</h1>
          </div>
          <h1 className="text-sm text-gray-400">me</h1>
        </div>
        <div className="h-60 w-full rounded-md flex items-center justify-between p-10 bg-white shadow-md space-x-5">
          <div className="flex flex-col space-y-2">
            <h1 className={`text-2xl font-bold text-primary text-indigo-900`}>
            Total: 0
            </h1>
            <h1 className="text-xs text-indigo-900 font-light">william</h1>
          </div>
          <h1 className="text-sm text-gray-400">me</h1>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ProtectedRoute(Dashboard);

