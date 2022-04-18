import * as React from "react";
import Layout from "../components/Layout";
import "./home.scss";

const Index = () => {
  return (
    <Layout>
      <div className="bg-img-wrapper">
        <img src="/images/index.jpg" alt="bg" className="bg-img" />
      </div>
      <div className="container">
        <div className="home-welcome-text">
          <h1>Welcome To Dorjibari</h1>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
