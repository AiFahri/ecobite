import React from "react";
import { Link } from "@inertiajs/react";

import DashboardIcon from "../../../assets/dashboard.svg";
import AdminIcon from "../../../assets/admin.svg";
import TenantIcon from "../../../assets/tenant.svg";
import LogoutIcon from "../../../assets/logout.svg";
import SearchIcon from "../../../assets/Search.svg";
import LogoIcon from "../../../assets/Logo.png";
import BellIcon from "../../../assets/bell.svg";
import CalendarIcon from "../../../assets/calendar.svg";
import HelpIcon from "../../../assets/help.svg";
import SettingIcon from "../../../assets/setting.svg";
import PeopleIcon from "../../../assets/people.svg";
import RefreshIcon from "../../../assets/material-symbols_refresh.svg";
import DeleteIcon from "../../../assets/assets/delete.svg";
import TaskIcon from "../../../assets/task.svg";
import ArrowUpDownIcon from "../../../assets/arrow-updown.svg";

const SuperAdmin = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white">
                {/* Logo */}
                <div className="p-4">
                    <div className="flex items-center">
                        <img src={LogoIcon} alt="EcoBite" className="h-8 w-8" />
                        <span className="ml-2 text-xl font-semibold">
                            EcoBite
                        </span>
                    </div>
                </div>

                {/* Menu */}
                <div className="mt-8">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                    >
                        <img
                            src={DashboardIcon}
                            alt="Dashboard"
                            className="w-5 h-5 mr-3"
                        />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin"
                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                    >
                        <img
                            src={AdminIcon}
                            alt="Admin"
                            className="w-5 h-5 mr-3"
                        />
                        Admin
                    </Link>
                    <Link
                        href="/tenants"
                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                    >
                        <img
                            src={TenantIcon}
                            alt="Tenants"
                            className="w-5 h-5 mr-3"
                        />
                        Tenants
                    </Link>
                </div>

                {/* Footer Sidebar */}
                <div className="absolute bottom-0 w-64 p-4">
                    <Link
                        href="/logout"
                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800"
                    >
                        <img
                            src={LogoutIcon}
                            alt="Logout"
                            className="w-5 h-5 mr-3"
                        />
                        Log Out
                    </Link>
                    <div className="px-4 py-2 text-sm text-gray-400">
                        v0.0.1
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-white p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                <img
                                    src={DashboardIcon}
                                    alt="Dashboard"
                                    className="w-5 h-5"
                                />
                                <span>Dashboard</span>
                            </Link>
                            <button className="relative">
                                <img
                                    src={BellIcon}
                                    alt="Notifications"
                                    className="w-5 h-5"
                                />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    2
                                </span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={CalendarIcon}
                                    alt="Calendar"
                                    className="w-5 h-5"
                                />
                                <span>Wednesday, 03 June</span>
                            </div>
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <img
                                    src="/path/to/avatar.png"
                                    alt="User"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span>Raymond</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                                <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Logout
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        {/* Breadcrumb & Title */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <span>Menu</span>
                                    <span className="mx-2">/</span>
                                    <span>Admin</span>
                                </div>
                                <h1 className="text-2xl font-semibold">
                                    Admin Page
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <img
                                        src={HelpIcon}
                                        alt="Help"
                                        className="w-5 h-5"
                                    />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <img
                                        src={SettingIcon}
                                        alt="Settings"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="relative w-96">
                                <img
                                    src={SearchIcon}
                                    alt="Search"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Cari sesuatu ..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <img
                                        src={PeopleIcon}
                                        alt="People"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    />
                                    <select className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white">
                                        <option>Diubah Oleh</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <img
                                        src={TaskIcon}
                                        alt="Task"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    />
                                    <select className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white">
                                        <option>Tipe Workspace</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <img
                                        src={CalendarIcon}
                                        alt="Calendar"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    />
                                    <select className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white">
                                        <option>Mei</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center">
                                                <span>Nama Task</span>
                                                <img
                                                    src={ArrowUpDownIcon}
                                                    alt="Sort"
                                                    className="ml-2 w-4 h-4"
                                                />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center">
                                                <span>Dihapus Pada</span>
                                                <img
                                                    src={ArrowUpDownIcon}
                                                    alt="Sort"
                                                    className="ml-2 w-4 h-4"
                                                />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center">
                                                <span>
                                                    Terakhir Diubah Oleh
                                                </span>
                                                <img
                                                    src={ArrowUpDownIcon}
                                                    alt="Sort"
                                                    className="ml-2 w-4 h-4"
                                                />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center">
                                                <span>Status</span>
                                                <img
                                                    src={ArrowUpDownIcon}
                                                    alt="Sort"
                                                    className="ml-2 w-4 h-4"
                                                />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <div className="flex items-center">
                                                <span>Aksi</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            Script Video Daily Vlog
                                        </td>
                                        <td className="px-6 py-4">
                                            03 Mei 2024
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src="/path/to/avatar.png"
                                                    alt="Ahsanta Imany"
                                                    className="w-6 h-6 rounded-full mr-2"
                                                />
                                                <span>Ahsanta Imany</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                Selesai
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={RefreshIcon}
                                                        alt="History"
                                                        className="w-4 h-4"
                                                    />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        className="w-4 h-4"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            Blog Content Update
                                        </td>
                                        <td className="px-6 py-4">
                                            03 Mei 2024
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src="/path/to/avatar.png"
                                                    alt="Ahsanta Imany"
                                                    className="w-6 h-6 rounded-full mr-2"
                                                />
                                                <span>Ahsanta Imany</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                Selesai
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={RefreshIcon}
                                                        alt="History"
                                                        className="w-4 h-4"
                                                    />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        className="w-4 h-4"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdmin;
