import { useShow } from "@refinedev/core";

export const ShowProduct = () => {
  const { queryResult: { data, isLoading } } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data?.data.name}</h1>
      <p>{data?.data.description}</p>
      <p>{data?.data.price}</p>
      <p>{data?.data.material}</p>
      <p>{data?.data.category.name}</p>
    </div>
  )
};