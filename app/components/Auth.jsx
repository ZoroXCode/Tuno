"use client";

import { useState, useEffect } from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const { getUser } = useKindeBrowserClient();
  const [session, setSession] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch user data when the component is mounted
    const fetchUser = async () => {
      const userSession = await getUser();
      setSession(userSession);
    };

    fetchUser();
  }, [getUser]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {session ? (
        <div className="relative">
          {/* User Icon Button */}
          <img
            src={session?.picture}
            alt="User Icon"
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary/50 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg p-4">
              <div className="text-md">
                {session?.given_name} {session?.family_name}
              </div>
              <div className="text-xs text-muted-foreground">
                {session?.email}
              </div>
              <div className="mt-2">
                <LogoutLink>
                  <Button variant="destructive" size="sm" className="w-full">
                    <LogOutIcon />
                    Log Out
                  </Button>
                </LogoutLink>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden gap-2 lg:flex">
          <RegisterLink>
            <Button>Sign In</Button>
          </RegisterLink>
          <LoginLink>
            <Button variant="secondary">Sign Up</Button>
          </LoginLink>
        </div>
      )}
    </>
  );
}
