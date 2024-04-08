import { useShow } from "@refinedev/core";

export const ShowProduct = () => {
  const { queryResult: { data, isLoading } } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Product name: {data?.data.name}</div>;
};