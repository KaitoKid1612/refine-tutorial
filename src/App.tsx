import { Refine, WelcomePage } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";

function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      <ShowProduct />
    </Refine>
  );
}

export default App;
