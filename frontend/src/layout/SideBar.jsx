import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUserPlus,
  faUser,
  faTableColumns,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { BsCalendar2Day } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [openResignMenu, setOpenResignMenu] = useState(false);
  const [openLeaveMenu, setOpenLeaveMenu] = useState(false);  const { user } = useAuth();
  const isAdmin = user?.role?.name?.toLowerCase() === "admin";
  const isHR = user?.role?.name?.toLowerCase() === "hr";
  const toggleLeaveMenu = () => setOpenLeaveMenu((prev) => !prev);
  const toggleResignMenu = () => setOpenResignMenu((prev) => !prev);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white bg-gray-700 p-2 rounded-lg shadow-lg hover:bg-blue-800 transition"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 min-h-screen bg-gradient-to-r from-neutral-900 to-gray-600 text-white z-50
    border-r border-white/20 rounded-r-2xl shadow-lg
    transform duration-300 ease-in-out
    w-64
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:static
  `}
      >
        {/* Header */}
        <div className=" flex justify-center items-center gap-2 p-4 border-b border-white/20">
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQEuzb6ataN1hw/company-logo_200_200/company-logo_200_200/0/1631339165284?e=2147483647&v=beta&t=Fd4mXIlVPsDtv3wyd5AxPhroQ7FZrY9DZEdkASmPVUc"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl text-center font-bold tracking-wide">
              Fixl
            </h1>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-white lg:hidden"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-6 flex flex-col gap-2">
          <SidebarLink
            to="/dashboard"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="Dashboard"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/attendance"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="Attendance"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/leave"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="Leave"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/daily-attendacne"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="Daily-attendacne"
            current={location.pathname}
            expanded={expanded}
          />
          <SidebarLink
            to="/userlist"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            label="User"
            current={location.pathname}
            expanded={expanded}
          />
        </div>
      </div>
    </>
  );
};

// Reusable Sidebar Link
const SidebarLink = ({ to, icon, label, current, expanded }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
      ${current === to ? "bg-blue-700 text-white font-semibold shadow-lg" : "hover:bg-blue-800/50"}
    `}
  >
    {icon}
    {expanded && <span>{label}</span>}
  </Link>
);

export default Sidebar;
