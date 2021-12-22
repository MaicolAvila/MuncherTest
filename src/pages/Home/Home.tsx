import { useEffect } from "react";
import "./Home.scss";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import DeveloperItem from "../../components/ProductItem/ProductItem";
import { productContentState } from "../../state/productState";
import { db, logout } from "../../firebase";
import Product from "../../types/product";

export default function Home() {
  const [products, setProducts] = useRecoilState(productContentState);
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot: any) => {
      const products = snapshot.docs.map((doc: any) => doc.data()) as Product[];
      setProducts(products);
    });
  }, [setProducts]);
  return (
    <div className="Home column">
      <div className="header">
        <div className="title">Lista de productos</div>
      </div>
      <div className="column body">
        <div className="frontends  column">
          <div className="title">Products</div>
          <div className="list">
            {products.map((product) => {
              return <DeveloperItem key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
      <div className="footer row">
        <Link to="/add" className="btn1">
          Crear
        </Link>
        <button onClick={logout} className="btn2">
          SignOut
        </button>
      </div>
    </div>
  );
}
