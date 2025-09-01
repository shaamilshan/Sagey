import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import CustomFileInput from "../../Components/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import ConfirmModal from "../../../../components/ConfirmModal";
import axios from "axios";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import { URL } from "@common/api";
import toast from "react-hot-toast";
import LogoutConfirmation from "@/components/LogoutConfimationModal";
import imageCompression from "browser-image-compression";



const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [statusList, setStatusList] = useState([
    "draft",
    "published",
    "unpublished",
    "out of stock",
    "low quantity",
  ]);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [duplicateFetchData, setDuplicateFetchData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    category: "",
    imageURL: "",
    status: "",
    attributes: [],
    price: "",
    markup: "",
    moreImageURL: [],
    offer: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFetchedData({
      ...fetchedData,
      [name]: value,
    });
  };

  const handleAttributeChange = (index, attributeName, value) => {
    setFetchedData((prevData) => {
      const updatedAttributes = [...prevData.attributes];
      updatedAttributes[index] = {
        ...updatedAttributes[index],
        [attributeName]: value,
      };
      return {
        ...prevData,
        attributes: updatedAttributes,
      };
    });
  };

  const handleDeleteAttribute = (index) => {
    setFetchedData((prevData) => {
      const updatedAttributes = [...prevData.attributes];
      updatedAttributes.splice(index, 1);
      return {
        ...prevData,
        attributes: updatedAttributes,
      };
    });
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`${URL}/admin/product/${id}`, {
          withCredentials: true,
        });

        setFetchedData({ ...data.product });
        setDuplicateFetchData({ ...data.product });
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, []);

  const [newThumb, setNewThumb] = useState("");
  const handleSingleImageInput = (img) => {
    setNewThumb(img);
  };

  const [newMoreImage, setNewMoreImage] = useState([]);
  const handleMultipleImageInput = (files) => {
    setNewMoreImage(files);
  };


  // const handleDeleteProduct = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.delete(`${URL}/admin/product/${id}`, {
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       toast.success("Product deleted successfully");
  //       // Optionally, you can redirect or update the UI after the product is deleted
  //       // e.g., navigate to another page or update the state
  //     }
  //     setTimeout(() => {
  //       navigate(-1);
  //     }, 500);
  //   } catch (error) {
  //     toast.error("Failed to delete product");
  //   } finally {
  //     setLoading(false);
  //     setShowConfirm(false); // Hide the confirmation dialog after deletion attempt
  //   }
  // };

  const handleSave = async () => {
    const formData = new FormData();
  
    // Iterate over fetchedData to check for changes and prepare formData
    for (const key in fetchedData) {
      if (duplicateFetchData[key] !== fetchedData[key]) {
        if (key === "attributes") {
          formData.append("attributes", JSON.stringify(fetchedData.attributes));
        } else if (key === "moreImageURL") {
          // Append existing images
          fetchedData[key].forEach((item) => {
            formData.append("moreImageURL", item);
          });
        } else {
          formData.append(key, fetchedData[key]);
        }
      }
    }
  
    // Compression settings for 5 MB
    const compressionOptions = {
      maxSizeMB: 5, // Maximum file size (5 MB)
      maxWidthOrHeight: 1920, // Resize the image if width/height exceeds 1920px
      useWebWorker: true, // Use web worker for better performance
    };
  
    try {
      // Compress and append new images
      if (newMoreImage.length > 0) {
        for (const file of newMoreImage) {
          const compressedFile = await imageCompression(file, compressionOptions);
          formData.append("moreImageURL", compressedFile);
        }
      }
  
      // Compress and append the thumbnail image
      if (newThumb) {
        const compressedThumb = await imageCompression(newThumb, compressionOptions);
        formData.append("imageURL", compressedThumb);
      }
  
      // Dispatch the update product action
      dispatch(updateProduct({ id: id, formData: formData }));
      navigate(-1);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress images. Please try again.");
    }
  };

  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributeImageIndex, setAttributeImageIndex] = useState("");
  const [attributeQuantity, setAttributeQuantity] = useState("");
  const [attributeHighlight, setAttributeHighlight] = useState(false);

  const attributeHandler = (e) => {
    e.preventDefault();
    if (attributeName.trim() === "" || attributeValue.trim() === "") {
      return;
    }
    const attribute = {
      name: attributeName,
      value: attributeValue,
      imageIndex: attributeImageIndex,
      quantity: attributeQuantity,
      isHighlight: attributeHighlight,
    };
    setFetchedData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, attribute],
    }));
    setAttributeHighlight(false);
    setAttributeName("");
    setAttributeValue("");
    setAttributeQuantity("");
    setAttributeImageIndex(""); // Reset the index
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    if (fetchedData.offer && fetchedData.offer < 1) {
      toast.error("Offer can't go below 1");
      return;
    }
    if (fetchedData.offer && fetchedData.offer > 100) {
      toast.error("Offer can't exceed 100");
      return;
    }
    setShowConfirm(!showConfirm);
  };

  const deleteOneProductImage = (index) => {
    const updatedImages = [...fetchedData.moreImageURL];
    updatedImages.splice(index, 1);
    setFetchedData((prevData) => ({
      ...prevData,
      ["moreImageURL"]: updatedImages,
    }));
  };

  return (
    <>
      {/* Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Confirm Save?"
          negativeAction={toggleConfirm}
          positiveAction={handleSave}
        />
      )}
      {/* Product edit page */}
      <div className="p-5 w-full overflow-y-scroll text-sm">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Edit Products</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Category List", "Edit Products"]}
            />
          </div>
          <div className="flex gap-3">
          {/* <button
              className="admin-button-fl bg-red-500 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlineDelete />
              Delete
            </button>
            <LogoutConfirmation
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDeleteProduct}
              headerText="Confirm Deletion"
              descriptionText="Are you sure you want to delete this product? This action cannot be undone."
              confirmButtonText="Delete"
              cancelButtonText="Cancel"
            /> */}
            <button
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={toggleConfirm}
            >
              <AiOutlineSave />
              Update
            </button>
          </div>
        </div>
        {/* Product Section */}
        <div className="lg:flex ">
          {/* Product Information */}
          <div className="lg:w-4/6 lg:mr-5">
            <div className="admin-div lg:flex gap-5">
              <div className="lg:w-1/3 mb-3 lg:mb-0">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                {fetchedData.imageURL ? (
                  <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                    <div className="h-56">
                      <img
                        src={`${URL}/img/${fetchedData.imageURL}`}
                        alt="im"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <button
                      className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        setFetchedData({
                          ...fetchedData,
                          ["imageURL"]: "",
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <CustomSingleFileInput onChange={handleSingleImageInput} />
                )}
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  name="name"
                  value={fetchedData.name || ""}
                  onChange={handleInputChange}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-36"
                  placeholder="Type product description here..."
                  value={fetchedData.description || ""}
                  onChange={handleInputChange}
                ></textarea>
                <p className="admin-label">Quantity</p>
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Type product quantity here"
                  className="admin-input"
                  value={fetchedData.stockQuantity || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              {fetchedData.moreImageURL &&
              fetchedData.moreImageURL.length > 0 ? (
                <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {fetchedData.moreImageURL.map((img, index) => (
                      <div
                        className="bg-white p-2 rounded-lg shadow-lg mb-2 w-28 h-28 relative"
                        key={index}
                      >
                        <img
                          src={`${URL}/img/${img}`}
                          alt="img"
                          className="h-full w-full object-contain"
                        />
                        <button
                          onClick={() => deleteOneProductImage(index)}
                          className="absolute -top-2 -right-2 text-xl p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      setFetchedData({
                        ...fetchedData,
                        ["moreImageURL"]: [],
                      })
                    }
                  >
                    Delete All
                  </button>
                </div>
              ) : (
                <>
                  <p className="admin-label my-2">Drop Here</p>
                  <CustomFileInput onChange={handleMultipleImageInput} />
                </>
              )}
            </div>
            {/* Add Additional Images */}
            <div className="admin-div">
              <h1 className="font-bold">Add Additional Images</h1>
              <p className="admin-label my-2">
                Upload additional product images
              </p>
              <CustomFileInput onChange={handleMultipleImageInput} />
            </div>
            {/* Attributes */}
            <div className="admin-div">
              <h1 className="font-bold mb-2">Product Attributes</h1>
              <form
                className="flex flex-col lg:flex-row items-center gap-3"
                onSubmit={attributeHandler}
              >
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Name"
                  value={attributeName}
                  onChange={(e) => setAttributeName(e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Value"
                  value={attributeValue}
                  onChange={(e) => setAttributeValue(e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Image Index"
                  value={attributeImageIndex}
                  onChange={(e) => setAttributeImageIndex(e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input-no-m w-full"
                  placeholder="Quantity"
                  value={attributeQuantity}
                  onChange={(e) => setAttributeQuantity(e.target.value)}
                />
                <div className="admin-input-no-m w-full lg:w-auto shrink-0">
                  <input
                    type="checkbox"
                    checked={attributeHighlight}
                    onChange={() => setAttributeHighlight(!attributeHighlight)}
                  />{" "}
                  Highlight
                </div>
                <input
                  type="submit"
                  className="admin-button-fl w-full lg:w-auto bg-blue-700 text-white cursor-pointer"
                  value="Add"
                />
              </form>
              <table className="border mt-5 rounded-lg w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 w-2/6">Name</th>
                    <th className="px-2 py-1 w-2/6">Value</th>
                    <th className="px-2 py-1 w-1/6">Image Index</th>
                    <th className="px-2 py-1 w-1/6">Quantity</th>
                    <th className="px-2 py-1 w-1/6">Highlighted</th>
                    <th className="px-2 py-1 w-1/6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedData.attributes.map((at, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1">
                        <input
                          className="admin-input-no-m w-full"
                          type="text"
                          value={at.name}
                          onChange={(e) =>
                            handleAttributeChange(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          className="admin-input-no-m w-full"
                          type="text"
                          value={at.value}
                          onChange={(e) =>
                            handleAttributeChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          className="admin-input-no-m w-full"
                          type="text"
                          value={at.imageIndex || ""}
                          onChange={(e) =>
                            handleAttributeChange(
                              index,
                              "imageIndex",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          className="admin-input-no-m w-full"
                          type="text"
                          value={at.quantity || ""}
                          onChange={(e) =>
                            handleAttributeChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          className="admin-input-no-m w-full"
                          type="checkbox"
                          checked={at.isHighlight}
                          onChange={(e) => {
                            handleAttributeChange(
                              index,
                              "isHighlight",
                              e.target.checked
                            );
                          }}
                        />
                      </td>
                      <td className="px-2 py-1 text-center">
                        <button
                          onClick={() => handleDeleteAttribute(index)}
                          className="text-xl text-gray-500 hover:text-gray-800 active:text-black"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pricing */}
          <div className="lg:w-2/6">
            <div className="admin-div">
              <h1 className="font-bold">Product Pricing</h1>
              <p className="admin-label">Amount</p>
              <input
                type="number"
                name="price"
                placeholder="Type product price here"
                className="admin-input"
                value={fetchedData.price || ""}
                onChange={handleInputChange}
              />
              <p className="admin-label">Markup</p>
              <input
                type="number"
                name="markup"
                placeholder="Type product markup here"
                className="admin-input"
                value={fetchedData.markup || ""}
                onChange={handleInputChange}
              />
              {/* <p className="admin-label">Offer</p>
              <input
                type="number"
                name="offer"
                placeholder="Type product offer here"
                className="admin-input"
                value={fetchedData.offer || ""}
                min={1}
                max={99}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Category</h1>
              <p className="admin-label">Product Category</p>
              <select
                name="category"
                id="categories"
                className="admin-input"
                value={fetchedData.category || ""}
                onChange={handleInputChange}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Product Status</h1>
              <p className="admin-label">Status</p>
              <select
                name="status"
                id="status"
                className="admin-input capitalize"
                value={fetchedData.status || ""}
                onChange={handleInputChange}
              >
                {statusList.map((st, index) => (
                  <option key={index} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;