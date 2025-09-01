import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronDown, Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import "animate.css"; // Import Animate.css for animations
import SageLogo from "../assets/sage-logo.png";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import CarouselTextSlider from "./CarouselTextSlider";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    {
      title: "TOP",
      subcategories: ["length tops", "Long tops (Maxi gowns)"],
    },
    {
      title: "ETHNIC WEARS",
      subcategories: ["Cotton wears", "Partywears", "Regular wears"],
    },
    {
      title: "HIJAB",
      subcategories: [],
    },
    {
      title: "CORD SETS",
      subcategories: [],
    },
  ];

  const handleNavigation = (category) => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/collections?search=${formattedCategory}`);
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const page = searchParams.get("page");

    setCategory(categoryParam ? categoryParam.split(",") : []);
    setPrice(priceParam || "");
    setSort(sortParam || "");
    setPage(page || 1);
    setSearch(searchParam || "");
  }, []);

  const handleClick = (param, value) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "" || (param === "page" && value === 1)) {
      params.delete(param);
      if (param === "price") {
        setPrice("");
      }
      if (param === "sort") {
        setSort("");
        params.delete("page");
        setPage(1);
      }
    } else {
      if (param === "category" && value) {
        let cat = params.get("category");
        if (!cat) {
          params.append("category", value);
          setCategory([value]);
        } else {
          let temp = cat.split(",");
          if (temp.length > 0) {
            if (temp.includes(value)) {
              temp = temp.filter((item) => item !== value);
            } else {
              temp.push(value);
            }

            if (temp.length > 0) {
              params.set("category", temp.join(","));
              setCategory(temp);
            } else {
              params.delete("category");
              setCategory([]);
            }
          } else {
            params.delete("category");
            setCategory([]);
          }
        }
      } else {
        params.set(param, value);
        if (param === "price") {
          setPrice(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "sort") {
          setSort(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "search") {
          params.delete("page");
          setPage(1);
        }
      }
    }

    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

    // If the user is logged in, return null to hide the link
    // if (user) {
    //   return null;
    // }
  
  const [showSideNavbar, setShowSideNavbar] = useState(false);

  return (
    <header className="border-b">
      {/*<CarouselTextSlider/>*/}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Search Bar */}
          <div className="flex items-center gap-8 flex-1 pr-3">
            <a href="/" className="flex-shrink-0">
              <img src={SageLogo} width={120} height={90} alt="Logo" />
            </a>
          
            {/* Categories container */}
            
            <nav className="hidden lg:flex flex-1 justify-center gap-12 text-xl font-semibold text-gray-700 pr-5">
              <button onClick={() => handleNavigation("TOPS & TEES")} className="hover:text-primary transition">
                TOPS & TEES
              </button>
              <button onClick={() => handleNavigation("DRESSES")} className="hover:text-primary transition">
                DRESSES
              </button>
              <button onClick={() => handleNavigation("BOTTOMS")} className="hover:text-primary transition">
                BOTTOMS
              </button>
              <button onClick={() => handleNavigation("ETHNIC WEAR")} className="hover:text-primary transition">
                ETHNIC WEAR
              </button>
            </nav>

            {/* Search bar */}
            <div className="relative w-40 ml-auto hidden lg:block">
              <SearchBar
                handleClick={handleClick}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>

          {/* Right-side Buttons */}
          <div className="flex items-center gap-4 sm:gap-10 md:gap-10 pr-25 ml-12">
            {/* Hidden on smaller screens */}
            {/*!user && (
  <Link
    to="/login"
    className="px-4 py-2 bg-primary rounded-none text-sm font-medium text-white hover:bg-white hover:text-primary hover:border transition hidden sm:block"
  >
    SIGN IN / SIGN UP
  </Link>
)*/}
            <Link to="/dashboard/wishlist" variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link to="/dashboard/profile" variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Link>
            <Menu
              className="h-5 w-5 hidden max-lg:block cursor-pointer"
              onClick={() => setShowSideNavbar(true)}
            />
          </div>
        </div>

        {/* Sidebar */}
        {showSideNavbar && (
          <div
            className={`fixed top-0 right-0 w-1/2 h-screen bg-primary z-50 animate__animated ${
              showSideNavbar ? "animate__fadeInRight" : "animate__fadeOutRight"
            }`}
          >
            <X
              className="absolute top-4 left-4 h-6 w-6 text-white cursor-pointer"
              onClick={() => setShowSideNavbar(false)}
            />
            <div className="relative w-40 ml-auto mt-6 mx-4">
              <SearchBar
                handleClick={handleClick}
                search={search}
                setSearch={setSearch}
              />
            </div>
            <nav className="mt-4 py-3 rounded-md">
              <ul className="flex flex-col px-5 gap-5 mt-4">
                {/* Add "SIGN IN / SIGN UP" button in mobile menu */}
                {/*!user && (
  <li className="py-2">
    <Link
      to="/login"
      className="block text-sm font-medium text-white bg-primary px-4 py-2 rounded-md hover:bg-white hover:text-primary"
      onClick={() => setShowSideNavbar(false)}
    >
      SIGN IN / SIGN UP
    </Link>
  </li>
  )*/}
                <li>
                  <button
                    onClick={() => {
                      handleNavigation("TOPS & TEES");
                      setShowSideNavbar(false); // close sidebar on click
                      }}
                    className="text-white text-sm font-medium hover:text-gray-300"
                  >
                    TOPS & TEES
                  </button>
                </li>
                 <li>
                  <button
                    onClick={() => {
                      handleNavigation("DRESSES");
                      setShowSideNavbar(false);
                    }}
                    className="text-white text-sm font-medium hover:text-gray-300"
                  >
                    DRESSES
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleNavigation("BOTTOMS");
                      setShowSideNavbar(false);
                    }}
                    className="text-white text-sm font-medium hover:text-gray-300"
                  >
                    BOTTOMS
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleNavigation("ETHNIC WEAR");
                      setShowSideNavbar(false);
                    }}
                    className="text-white text-sm font-medium hover:text-gray-300"
                  >
                    ETHNIC WEAR
                  </button>
                </li>

                
                {/* {categories.map((category, index) => (
                  <li
                    key={category.title}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center justify-between py-4">
                      <span
                        className="text-sm font-medium text-white cursor-pointer"
                        onClick={() => handleNavigation(category.title)}
                      >
                        {category.title}
                      </span>
                      {category.subcategories.length > 0 && (
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index
                            )
                          }
                          className="p-1"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200 text-white",
                              activeDropdown === index ? "rotate-180" : ""
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {category.subcategories.length > 0 && (
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200",
                          activeDropdown === index
                            ? "max-h-[500px] opacity-100 mb-4"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="flex flex-col gap-2 pl-4">
                          {category.subcategories.map((sub, subIndex) => (
                            <button
                              key={`${index}-${subIndex}`}
                              onClick={() => handleNavigation(sub)}
                              className="text-left text-sm text-white hover:text-gray-900 py-1"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))} */}
              </ul>
            </nav>
          </div>
        )}

        {/* Conditional rendering for the nav only on "/" route */}
      </div>
      {window.location.pathname === "/" && (
        <div className="w-full flex justify-center items-center relative">
          <nav className=" hidden  py-3  w-[100vw] bg-primary">
            <ul className="flex gap-8 px-4 justify-center items-center">
            {categories.map((category, index) => (
                <li
                  key={category.title}
                  className="relative text-sm font-medium text-white hover:text-gray-300 cursor-pointer"
                  onMouseEnter={() => setActiveDropdown(index)}
                >
                  <span onClick={() => handleNavigation(category.title)}>
                    {category.title}
                  </span>
                  {category.subcategories.length > 0 && (
                    <div
                      className={cn(
                        "absolute min-w-max bg-white text-gray-900 rounded-md mt-2 shadow-lg z-50",
                        activeDropdown === index ? "block" : "hidden"
                      )}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2 ">
                        {category.subcategories.map((sub, subIndex) => (
                          <button
                            key={`${index}-${subIndex}`}
                            onClick={() => handleNavigation(sub)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
