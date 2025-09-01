import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard2 from "../Cards/ProductCard2";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "@/redux/actions/user/userProductActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import JustLoading from "../JustLoading";
import AOS from "aos";
import "aos/dist/aos.css";



import top from '../../assets/topp.svg';
import dress from '../../assets/dress.svg';
import ethnic from '../../assets/ethnic.svg';
import hijab from '../../assets/hijab.svg';

const NewArrivals = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userProducts, loading } = useSelector((state) => state.userProducts);
  const dispatch = useDispatch();

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item._id === product._id)
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product]
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    dispatch(getUserProducts(searchParams));
  }, [searchParams, dispatch]);

  return (
    <div className="bg-[#065c63] px-4 py-10" id="newArrival" data-aos="fade-up">
      <div className="bg-white rounded-[30px] p-6 sm:p-10 max-w-7xl mx-auto shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#065c63] text-2xl sm:text-xl md:text-3xl font-bold mb-6">
              NEW ARRIVALS
            </h1>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userProducts && userProducts.length > 0 ? (
                userProducts.slice(0, 4).map((product, index) => {
                  const isWishlisted = wishlist.some(
                    (item) => item._id === product._id
                  );

                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-[20px] p-4 text-center"
                    >
                      <ProductCard2
                        product={product}
                        isWishlisted={wishlist.some((item) => item._id === product._id)}
                        onToggleWishlist={toggleWishlist}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="h-96 flex items-center justify-center col-span-full">
                  <p>Nothing to show</p>
                </div>
              )}
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate(`/collections`)}
                className="bg-[#00bfa6] hover:bg-[#00a897] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md"
              >
                VIEW MORE
              </button>
            </div>
          </>
        )}
      </div>

      {/* Category Grid */}
      <div className="mt-8 px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {[
            { label: "TOPS & TEES", icon: top, category: "tops" },
            { label: "DRESSES", icon: dress, category: "dresses" },
            { label: "ETHNIC WEAR", icon: ethnic, category: "ethnic" },
            { label: "HIJABS", icon: hijab, category: "hijabs" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/collections?search=${item.category}`)}
              className="flex flex-col items-center justify-center bg-white rounded-[25px] px-6 py-5 w-full hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-10 h-10 mb-2"
              />
              <p className="text-[#065c63] text-sm font-semibold text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
