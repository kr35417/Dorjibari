import * as React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const Secret = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default Secret;
