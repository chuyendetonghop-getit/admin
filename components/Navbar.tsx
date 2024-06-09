"use client";

import ThemeToggler from "@/components/ThemeToggler";
import { logoutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/get-it-logo.png";

const Navbar = () => {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <div className="bg-slate-500 dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link href="/">
        <Image
          src={logo}
          alt="Get IT - Admin Dashboard"
          width={40}
          className="rounded-lg cursor-pointer"
        />
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        <Link href="/auth" onClick={handleLogout}>
          <LogOut className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
