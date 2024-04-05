import { useList } from "@refinedev/core";

export const ListProduct = () => {
  const { data, isLoading } = useList({
    resource: "products" ,
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "price", order: "esc" }],
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product?.id}>
            <p>
              {product.name}
              <br/>
              Description: {product.description}
              <br/>
              Price: {product.price}
              <br/>
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}