import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  console.log(identity);

  return (
    <>
      <span>Welcome, </span>
      <span>{identity?.name ?? ""}</span>
      <button
        type="button"
        disabled={isLoading}
        onClick={mutate}
      >
        Logout
      </button>
    </>
  )
}