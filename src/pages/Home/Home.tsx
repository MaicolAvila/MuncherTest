import { useEffect } from "react";
import "./Home.scss";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import DeveloperItem from "../../components/ProductItem/ProductItem";
import { productContentState } from "../../state/productState";
import { db, logout } from "../../firebase";
import Product from "../../types/product";
import { BlueLink, List, Title } from "../../styles/styles";

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
        <Title>Lista de productos</Title>
      </div>
      <div className="column body">
        <List>
          {products.map((product) => {
            return <DeveloperItem key={product.id} {...product} />;
          })}
        </List>
      </div>
      <div className="footer row">
        <BlueLink to="/add" className="btn1">
          Crear
        </BlueLink>
      </div>
    </div>
  );
}
