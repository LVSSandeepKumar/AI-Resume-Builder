import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between shadow-md items-center p-3 px-5">
      <Link to={"/"}>
        <div className="flex items-center justify-center gap-2">
          <img src="/logo.svg" height={60} width={60} />
          <span className="text-xl text-primary font-bold">
            AI Resume <br />
            Builder
          </span>
        </div>
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
