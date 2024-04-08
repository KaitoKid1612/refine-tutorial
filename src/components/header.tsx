import React from "react";
import { useLogout } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
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