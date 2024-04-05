import { Refine, WelcomePage } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";

function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/*<ShowProduct />*/}
      <EditProduct />
    </Refine>
  );
}

export default App;
