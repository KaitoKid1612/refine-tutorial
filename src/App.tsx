import { Refine, WelcomePage } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProduct } from "./pages/products/list";

function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/*<ShowProduct />*/}
      {/*<EditProduct />*/}
      <ListProduct />
    </Refine>
  );
}

export default App;
