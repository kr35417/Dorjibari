import * as React from "react";
import Layout from "../components/Layout";
import "./payment.scss";

const Payment = () => {
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [payment, setPayment] = React.useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPayment(true);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="pay-wrap">
          <div className="payments">
            {payment ? (
              <div className="success">
                <img
                  src="https://img.icons8.com/flat-round/64/000000/checkmark.png"
                  alt=""
                />
                <h3>Payemnt Success</h3>
              </div>
            ) : (
              <>
                <h5 className="py-3">Payment</h5>
                <div className="payment-option">
                  <button
                    className={`pay-op-btn ${tab === 0 ? "active" : ""}`}
                    onClick={() => setTab(0)}
                  >
                    <span>BKash</span>
                  </button>
                  <button
                    className={`pay-op-btn ${tab === 1 ? "active" : ""}`}
                    onClick={() => setTab(1)}
                  >
                    <span>Rocket</span>
                  </button>
                  <button
                    className={`pay-op-btn ${tab === 2 ? "active" : ""}`}
                    onClick={() => setTab(2)}
                  >
                    <span>Nagad</span>
                  </button>
                </div>

                <div className="mt-3">
                  <div className="form-group mb-2">
                    <label htmlFor="">
                      <h6>Phone:</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: 01XXXX-XXXXXX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      <h6>TrxID:</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: XXXXXXXXXXX"
                    />
                  </div>
                </div>

                <center>
                  <button
                    className="btn btn-success mt-3 col-6"
                    onClick={handlePay}
                  >
                    {loading ? <span>Paying...</span> : <span>Pay</span>}
                  </button>
                </center>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
