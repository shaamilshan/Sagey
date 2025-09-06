import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CustomFileInput from "../../Components/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../Components/BreadCrumbs";
import toast from "react-hot-toast";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";
import imageCompression from "browser-image-compression";


const AddProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state) => state.categories
  );
  const { loading: productsLoading, error: productsError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // Show error messages from Redux state
  useEffect(() => {
    if (productsError) {
      toast.error(`Product Error: ${productsError}`);
    }
    if (categoriesError) {
      toast.error(`Categories Error: ${categoriesError}`);
    }
  }, [productsError, categoriesError]);

  const [statusList, setStatusList] = useState([
    "Draft",
    "Published",
    "Unpublished",
    "Out of Stock",
    "Low Quantity",
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState();
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("Published");
  const [attributes, setAttributes] = useState([]);
  const [price, setPrice] = useState("");
  const [markup, setMarkup] = useState("");
  const [moreImageURL, setMoreImageURL] = useState("");
  const [offer, setOffer] = useState("");

  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const handleMultipleImageInput = (files) => {
    setMoreImageURL(files);
  };

  const handleSave = async () => {
    // Prevent multiple submissions
    if (productsLoading) {
      toast.error("Please wait, product is being created...");
      return;
    }

    // Validation
    if (!name || name.trim() === "") {
      toast.error("Product name is required");
      return;
    }
    if (!description || description.trim() === "") {
      toast.error("Product description is required");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!imageURL) {
      toast.error("Product thumbnail image is required");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Price should be greater than 0");
      return;
    }

    var newStockQuantity = stockQuantity;
    if (stockQuantity <= 0) {
      newStockQuantity = 100;
    }
  
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("stockQuantity", newStockQuantity);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("price", price);
    formData.append("markup", markup || 0);
    formData.append("category", category);
    formData.append("offer", offer || 0);
    formData.append("status", status.toLowerCase());

    try {
      // Compress the main image more aggressively for production
      if (imageURL && imageURL instanceof File) {
        const compressedImageURL = await imageCompression(imageURL, {
          maxSizeMB: 2, // Reduced to 2MB for better upload reliability
          maxWidthOrHeight: 1600, // Reduced resolution for smaller file size
          useWebWorker: true,
          maxIteration: 10, // More compression iterations
          initialQuality: 0.8 // Start with lower quality
        });
        formData.append("imageURL", compressedImageURL);
        console.log("Main image compressed:", {
          original: `${(imageURL.size / (1024 * 1024)).toFixed(2)}MB`,
          compressed: `${(compressedImageURL.size / (1024 * 1024)).toFixed(2)}MB`,
          reduction: `${(((imageURL.size - compressedImageURL.size) / imageURL.size) * 100).toFixed(1)}%`
        });
      }
  
      // Compress additional images if they exist
      if (moreImageURL && Array.isArray(moreImageURL) && moreImageURL.length > 0) {
        for (const file of moreImageURL) {
          if (file instanceof File) {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 2, // Reduced to 2MB for better upload reliability
              maxWidthOrHeight: 1600, // Reduced resolution
              useWebWorker: true,
              maxIteration: 10,
              initialQuality: 0.8
            });
            formData.append("moreImageURL", compressedFile);
            console.log("Additional image compressed:", {
              original: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
              compressed: `${(compressedFile.size / (1024 * 1024)).toFixed(2)}MB`,
              reduction: `${(((file.size - compressedFile.size) / file.size) * 100).toFixed(1)}%`
            });
          }
        }
      }

      // Calculate total payload size
      let totalSize = 0;
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          totalSize += pair[1].size;
        }
      }
      console.log(`Total payload size: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
      
      if (totalSize > 45 * 1024 * 1024) { // 45MB limit check
        toast.error("Total file size too large. Please reduce image sizes or quantity.");
        return;
      }

      // Debug FormData contents
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], `File: ${pair[1].name} (${(pair[1].size / (1024 * 1024)).toFixed(2)}MB)`);
        } else {
          console.log(pair[0], pair[1]);
        }
      }
  
      const result = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(result)) {
        toast.success("Product created successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Product creation error:", error);
      if (error.response && error.response.status === 413) {
        toast.error("Files too large. Please reduce image sizes and try again.");
      } else {
        toast.error(`Failed to create product: ${error.message}`);
      }
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
      quantity: attributeQuantity,
      isHighlight: attributeHighlight,
      imageIndex: attributeImageIndex,
    };
    setAttributes([...attributes, attribute]);
    setAttributeHighlight(false);
    setAttributeName("");
    setAttributeValue("");
    setAttributeImageIndex("");
    setAttributeQuantity("");
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
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
      {/* Product add page */}
      <div className="p-5 w-full overflow-y-scroll text-sm">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Add Products</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs
              list={["Dashboard", "Products List", "Add Products"]}
            />
          </div>
          <div className="flex gap-3">
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
              disabled={productsLoading}
            >
              <AiOutlineSave />
              {productsLoading ? "Saving..." : "Save"}
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
                <CustomSingleFileInput onChange={handleSingleImageInput} />
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-36"
                  placeholder="Type product description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <p className="admin-label">Quantity</p>
                <input
                  type="number"
                  placeholder="Type product quantity here"
                  className="admin-input"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                />
              </div>
            </div>
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              <p className="admin-label my-2">Drop Here</p>
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
              <div className="border mt-5 rounded-lg">
                {attributes.map((at, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex px-2 py-1 ${
                        index % 2 === 0 && "bg-gray-200"
                      }`}
                    >
                      <p className="w-2/6">{at.name}</p>
                      <p className="w-3/6">{at.value}</p>
                      <p className="w-3/6">{at.imageIndex}</p>
                      <p className="w-3/6">{at.quantity}</p>
                      <p className="w-1/6">
                        {at.isHighlight ? "Highlighted" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Pricing */}
          <div className="lg:w-2/6">
            <div className="admin-div">
              <h1 className="font-bold">Product Pricing</h1>
              <p className="admin-label">Amount</p>
              <input
                type="number"
                placeholder="Type product Price here"
                className="admin-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="admin-label">Markup</p>
              <input
                type="number"
                placeholder="Type product markup here"
                className="admin-input"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
              />
              {/* <p className="admin-label">Offer</p>
              <input
                type="number"
                placeholder="Type product offer here"
                className="admin-input"
                value={offer}
                min={1}
                max={100}
                onChange={(e) => setOffer(e.target.value)}
              />*/}
            </div> 
            <div className="admin-div">
              <h1 className="font-bold">Category</h1>
              <p className="admin-label">Product Category</p>
              <select
                name="categories"
                id="categories"
                className="admin-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
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
                className="admin-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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

export default AddProducts;