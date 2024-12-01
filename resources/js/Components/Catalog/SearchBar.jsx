import React, { useEffect, useRef } from "react";
import CommandIcon from "../../../assets/ph_command-bold.svg";
import KIcon from "../../../assets/K.svg";
import RefreshIcon from "../../../assets/material-symbols_refresh.svg";
import WindowIcon from "../../../assets/material-symbols_window.svg";
import GridIcon from "../../../assets/uis_window-grid.svg";
import SearchIcon from "../../../assets/search.svg";
import { router } from "@inertiajs/react";

const SearchBar = ({
    value,
    onChange,
    onEnter,
    placeholder = "Cari...",
    className = "",
    currentPath = "/catalog",
    showIcons = true,
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Windows: Ctrl + F, Mac: Cmd + K
            if ((e.ctrlKey && e.key === "f") || (e.metaKey && e.key === "k")) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleRefresh = () => {
        router.get(
            currentPath,
            {},
            {
                preserveState: false,
                preserveScroll: false,
            }
        );
    };

    return (
        <div className="flex items-center">
            {showIcons && (
                <div
                    className="py-4 px-4 inline-block border border-slate-400 rounded-lg mr-4 cursor-pointer hover:bg-gray-50"
                    onClick={handleRefresh}
                >
                    <img src={RefreshIcon} alt="Refresh" />
                </div>
            )}

            <div
                className={`flex border border-slate-400 rounded-lg py-4 px-4 flex-1 ${className}`}
            >
                <img src={SearchIcon} alt="Search" className="w-5 h-5 mr-2" />
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full outline-none"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && onEnter) {
                            onEnter();
                        }
                    }}
                />
                <div className="flex">
                    <div className="py-1 px-2 bg-[#F0F0F0] flex items-center justify-center rounded-lg mr-2">
                        <img
                            src={CommandIcon}
                            className="w-3 h-3 flex items-center justify-center"
                            alt="Command"
                        />
                    </div>
                    <div className="py-1 px-2 bg-[#F0F0F0] flex items-center justify-center rounded-lg">
                        <img
                            src={KIcon}
                            className="w-3 h-3 flex items-center justify-center"
                            alt="K"
                        />
                    </div>
                </div>
            </div>

            {showIcons && (
                <span className="flex items-center justify-center border border-slate-400 py-4 px-4 rounded-lg box-border ml-4">
                    <img
                        src={WindowIcon}
                        className="w-5 h-5 mr-2"
                        alt="Window"
                    />
                    <img
                        src={GridIcon}
                        className="bg-slate-200 rounded-lg w-6 h-6 p-[2px]"
                        alt="Grid"
                    />
                </span>
            )}
        </div>
    );
};

export default SearchBar;
