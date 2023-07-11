import { Fragment } from "react";
import { URLS } from "@/constants/routes";
import {
  AiOutlineClose,
  AiOutlineFileDone,
  // AiOutlineFileDone,
  AiOutlineHome,
  AiOutlineIdcard,
  AiOutlineShop,
} from "react-icons/ai";
import { HiOutlineDocumentText, HiOutlineTicket } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { BsCreditCard2Front, BsPeople, BsPerson } from "react-icons/bs";
import RoleChecker from "../role-checker/role-checker";
import Link from "next/link";
import MenuItem from "../menu-items/menu-items";

const Sidebar = ({ sidebar, toggleSidebar, user }) => {
  return (
    <aside
      className={`${
        sidebar
          ? "left-0 duration-50 "
          : "md:left-[-50%] left-[-100%] duration-200 ease-in"
      } md:fixed w-[100%] h-[100%] fixed left-0 top-0 md:w-[300px] p-5 bg-[#151567] z-50 flex flex-col transition-all`}
    >
      <AiOutlineClose
        onClick={() => toggleSidebar()}
        className="md:hidden absolute top-5 right-5 xs:top-3 xs:right-3 text-white w-8 h-8 cursor-pointer"
      />
      <div className="grid place-items-center mb-10">
        <Link href={URLS.protected.dashboard}>
          {/* < src={coa} width={50} height={50} alt="logo" /> */}
        </Link>
      </div>
      <div className="flex flex-col w-full h-full justify-between overflow-y-auto scroll-bar">
        <div className="w-full flex flex-col mt-5 space-y-8 pl-8 md:items-start md:pl-0">
          <MenuItem
            url={URLS.protected.dashboard}
            Icon={AiOutlineHome}
            text="Dashboard"
          />
          <MenuItem
            url={URLS.protected.properties}
            Icon={AiOutlineShop}
            text="Properties"
          />

          {/* Accounts */}
          <RoleChecker
            roles={[
              "operations",
              "tso",
              "collaborator",
              "call center",
              "mce",
              "mcd",
              "mfo",
              "mbo",
              "audit",
              "mis",
              "stakeholders",
            ]}
          >
            <Menu>
              <Menu.Button className="flex space-x-2 items-center justify-between w-full text-sm">
                <MenuItem Icon={BsPeople} text="Accounts" />
                <FiChevronDown className="text-white" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-800"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="flex flex-col space-y-8 pl-5">
                  <Menu.Item>
                    <MenuItem
                      url={URLS.protected.ratePayer}
                      Icon={BsPerson}
                      text="Rate Payer"
                    />
                  </Menu.Item>
                  <RoleChecker roles={[]}>
                    <Menu.Item>
                      <MenuItem
                        url={URLS.protected.agents}
                        Icon={AiOutlineIdcard}
                        text="Agents"
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <MenuItem
                        url={URLS.protected.users}
                        Icon={BsPeople}
                        text="Users"
                      />
                    </Menu.Item>
                  </RoleChecker>
                </Menu.Items>
              </Transition>
            </Menu>
          </RoleChecker>

          {/* Payment Operations */}
          <Menu>
            <Menu.Button className="flex space-x-2 items-center justify-between w-full text-sm">
              <MenuItem Icon={BsCreditCard2Front} text="Payment Operations" />
              <FiChevronDown className="text-white" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-800"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="flex flex-col space-y-8 pl-5">
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.payments}
                    Icon={HiOutlineDocumentText}
                    text="Payments"
                  />
                </Menu.Item>
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.reconciliation}
                    Icon={AiOutlineIdcard}
                    text="Cheque Reconciliation"
                  />
                </Menu.Item>
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.assemblyPayments}
                    Icon={BsPeople}
                    text="Payments To Assembly"
                  />
                </Menu.Item>
                <RoleChecker roles={[]}>
                  <Menu.Item>
                    <MenuItem
                      url={URLS.protected.paymentVerification}
                      Icon={MdDoneAll}
                      text="Payment Verification"
                    />
                  </Menu.Item>
                </RoleChecker>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* 
          <MenuItem
            url={URLS.protected.bills}
            Icon={HiOutlineDocumentText}
            text="Bills"
          /> */}

          {/* Bill Operations */}
          {/* <Menu>
            <Menu.Button className="flex space-x-2 items-center justify-between w-full text-sm">
              <MenuItem Icon={BsCreditCard2Front} text="Bill Operations" />
              <FiChevronDown className="text-white" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-800"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="flex flex-col space-y-8 pl-5">
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.billGeneration}
                    Icon={BsListTask}
                    text="Bill Generation"
                  />
                </Menu.Item>
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.bulkMessaging}
                    Icon={BsEnvelope}
                    text="Bulk Messaging"
                  />
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu> */}
          <RoleChecker roles={["stakeholders", "operations", "call center"]}>
            <MenuItem
              url={URLS.protected.assemblies}
              Icon={AiOutlineShop}
              text="Assemblies"
            />
          </RoleChecker>

          {/* <MenuItem
            url={URLS.protected.reports}
            Icon={MdOutlineAnalytics}
            text="Reports"
          /> */}

          {/* Ticketing */}
          <Menu>
            <Menu.Button className="flex space-x-2 items-center justify-between w-full text-sm">
              <MenuItem Icon={HiOutlineTicket} text="Ticketing" />
              <FiChevronDown className="text-white" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-800"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="flex flex-col space-y-8 pl-5">
                {/* <Menu.Item>
                  <MenuItem
                    url={URLS.protected.callLogs}
                    Icon={BsListTask}
                    text="Call Logs"
                  />
                </Menu.Item> */}
                <Menu.Item>
                  <MenuItem
                    url={URLS.protected.concerns}
                    Icon={AiOutlineFileDone}
                    text="Concerns"
                  />
                </Menu.Item>
                {/* <Menu.Item>
                  <MenuItem
                    url={URLS.protected.agents}
                    Icon={BsPersonX}
                    text="Defaulters"
                  />
                </Menu.Item> */}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* <MenuItem
            url={URLS.protected.nationalDistributionOfProperties}
            Icon={HiOutlineLocationMarker}
            text="National Distribution of Properties"
          /> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
