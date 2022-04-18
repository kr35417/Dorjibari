import * as React from "react";
import { Link } from "react-router-dom";
import "./products.scss";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../../firebase";
import { ProductsContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Tagbox = ({ setTags, tags, label }) => {
  const [val, setVal] = React.useState("");

  const handleEnterPress = () => {
    setTags([...tags, val]);
    setVal("");
  };

  return (
    <div className="mb-3">
      <label>{label}</label>
      <div className="tagbox">
        {tags.map((tag, i) => (
          <span className="tag" key={i}>
            {tag}
            <span
              className="close"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            >
              &times;
            </span>
          </span>
        ))}
        <input
          type="text"
          name="tagbox"
          value={val}
          className="tag-input"
          placeholder="Press Enter to add tag"
          onChange={(e) => setVal(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleEnterPress()}
        />
      </div>
    </div>
  );
};

const Add = () => {
  const [colors, setColors] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { products, setProducts } = React.useContext(ProductsContext);
  const navigate = useNavigate();

  // handle change
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const store = getStorage(app);
    const fireStore = getFirestore(app);
    const imgRef = ref(store, `images/${image.name}`);
    uploadBytes(imgRef, image).then((uploadTask) => {
      getDownloadURL(uploadTask.ref).then((url) => {
        // const productRef = doc(fireStore, "products");
        // local product add
        let data = {
          name,
          price,
          description,
          discount,
          category,
          rating: Math.floor(Math.random() * 5),
          available_color: colors,
          available_size: sizes,
          image: url,
        };

        // set server
        addDoc(collection(fireStore, "products"), data).then((res) => {
          setProducts([...products, { ...data, id: res.id }]);
          setLoading(false);
          setName("");
          setPrice(0);
          setDescription("");
          setDiscount(0);
          setCategory("");
          setColors([]);
          setSizes([]);
          setImage(null);
          setPreviewUrl(null);
          navigate("/admin");
        });
      });
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="form-container">
          <div className="d-flex align-items-center">
            <h5>Product</h5>
            <Link to="/admin" className="ms-auto btn btn-primary">
              Back
            </Link>
          </div>
          <form action="" className="py-3">
            <div className="row mb-3">
              <div className="col-8">
                <div className="mb-3">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="form-control"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="">Price</label>
                    <input
                      type="Number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col mb-3">
                    <label htmlFor="">Discount</label>
                    <input
                      type="Number"
                      name="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div>
                  <label htmlFor="">Image</label>
                  <div className="image-holder">
                    {previewUrl && <img src={previewUrl} alt="" />}
                    <input type="file" name="image" onChange={onChangeImage} />
                    {previewUrl ? (
                      <span style={{ color: "#fff" }}> Change Image </span>
                    ) : (
                      <span> Upload Image</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Tagbox setTags={setColors} tags={colors} label="Colors" />
            <Tagbox setTags={setSizes} tags={sizes} label="Sizes" />

            <div className="mb-3">
              <label htmlFor="">Descreption</label>
              <textarea
                type="text"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Add;
