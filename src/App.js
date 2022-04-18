import * as React from "react";
import "bootstrap/scss/bootstrap.scss";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import { CartContext, ProductsContext, UserContext } from "./context";

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [cart, setCart] = React.useState([]);

  const auth = getAuth(app);
  const db = getFirestore(app);

  // fatching products
  const fatchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const pro = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (pro.length > 0) {
      setProducts(pro);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loading && fatchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fatch user
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fatch cart

  const fatchCart = async () => {
    const snapshot = await getDocs(collection(db, "carts"));
    const cart = snapshot.docs.map((doc) => ({
      cid: doc.id,
      ...doc.data().product,
      uid: doc.data().uid,
    }));
    if (cart.length > 0) {
      setCart(cart);
    }
  };

  React.useEffect(() => {
    loading && fatchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <h5>Loading...</h5>
        </div>
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          <ProductsContext.Provider value={{ products, setProducts }}>
            <CartContext.Provider value={{ cart, setCart }}>
              <AppRoutes />
            </CartContext.Provider>
          </ProductsContext.Provider>
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;
