import * as React from "react";

export const ProductsContext = React.createContext({
  products: [],
  addProduct: () => {},
});
