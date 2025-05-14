"use client";

import { BadgePlus, BriefcaseBusiness, ListTree } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const routes = [
    {
      label: "Jobs",
      path: "/jobs",
      icon: <ListTree />,
    },
    {
      label: "Add Job",
      path: "/newjob",
      icon: <BadgePlus />,
    },

  ];

  const currentPath = usePathname();
  const activeStyle = (path: string) => {
    return currentPath === path ? "text-blue-500" : "text-gray-800";
  };

  return (
    <div className="flex items-center justify-between bg-white p-5 shadow-md">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <BriefcaseBusiness className="text-blue-500"/>
          <div className="font-sans text-xl font-bold text-blue-500">
            <span>Choli - Job seeker</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-5">
        {routes.map((route) => {
          return (
            <Link key={route.label} href={route.path}>
              <div className="flex items-center space-x-2 hover:cursor-pointer justify-between px-3">
                <div className={activeStyle(route.path)}>{route.icon}</div>
                <div
                  className={
                    "hover:text-blue-500 text-md font-sans " +
                    activeStyle(route.path)
                  }
                >
                  {route.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
