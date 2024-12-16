import { useState, useEffect } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function MobAuth() {
  const { getUser } = useKindeBrowserClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch user data when the component is mounted
    const fetchUser = async () => {
      const userSession = await getUser();
      setSession(userSession);
    };

    fetchUser();
  }, [getUser]);

  return (
    <>
      {session ? (
        <div className="flex flex-col mx-4 mt-2 gap-2 lg:hidden text-center text-lg fr">
          tuno.bd
        </div>
      ) : (
        <div className="flex flex-col mx-4 mt-2 gap-2 lg:hidden">
          <RegisterLink>
            <Button className="w-full" size={"lg"}>
              Sign In
            </Button>
          </RegisterLink>
          <LoginLink>
            <Button variant={"secondary"} className="w-full" size={"lg"}>
              Sign Up
            </Button>
          </LoginLink>
        </div>
      )}
    </>
  );
}
