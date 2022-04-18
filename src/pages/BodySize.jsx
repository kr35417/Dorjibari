import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./body-size.scss";

const FormInput = ({ label, name, onChange, value }) => {
  return (
    <div className="form-group d-flex align-items-center mb-3">
      <label htmlFor="" className="input-label" style={{ minWidth: "150px" }}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="form-control"
        placeholder={label}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

const BodySize = () => {
  const { collar, setCollar } = React.useState("");
  const { length, setLength } = React.useState("");
  const { sleeveLength, setSleeveLength } = React.useState("");
  const { chest, setChest } = React.useState("");
  const { shoulder, setShoulder } = React.useState("");
  const { hips, setHips } = React.useState("");
  const { cuff, setCuff } = React.useState("");
  const { tummy, setTummy } = React.useState("");

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-6">
            <div className="sz-form-wrapper">
              <h5 className="sz-form-header">BODY SIZE</h5>
              <p className="mb-3">Need help. Watch Video</p>
              <form className="sz-form">
                <FormInput
                  label="Collar"
                  onChange={(e) => {
                    setCollar(e.target.value);
                  }}
                  value={collar}
                />
                <FormInput
                  label="Length"
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                  value={length}
                />
                <FormInput
                  label="Sleeve Length"
                  onChange={(e) => {
                    setSleeveLength(e.target.value);
                  }}
                  value={sleeveLength}
                />
                <FormInput
                  label="Shoulders"
                  onChange={(e) => {
                    setShoulder(e.target.value);
                  }}
                  value={shoulder}
                />
                <FormInput
                  label="Chest"
                  onChange={(e) => {
                    setChest(e.target.value);
                  }}
                  value={chest}
                />
                <FormInput
                  label="Tummy"
                  onChange={(e) => {
                    setTummy(e.target.value);
                  }}
                  value={tummy}
                />
                <FormInput
                  label="Hips"
                  onChange={(e) => {
                    setHips(e.target.value);
                  }}
                  value={hips}
                />
                <FormInput
                  label="Cuff"
                  onChange={(e) => {
                    setCuff(e.target.value);
                  }}
                  value={cuff}
                />
                <div className="text-center">
                  <Link
                    to="/payment"
                    className="btn btn-primary btn-block col-3"
                  >
                    Next
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-6">
            <div className="video-con">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/74MwrDCzeBU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BodySize;
