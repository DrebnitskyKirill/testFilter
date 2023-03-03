const productList = document.getElementById("product-list");
const filterClothing = document.getElementById("filter-clothing");
const filterElectronics = document.getElementById("filter-electronics");
const filterJewelery = document.getElementById("filter-jewelery");
const filterName = document.getElementById("filter-name");
const filterReset = document.getElementById("filter-reset");

const apiURL = "https://fakestoreapi.com/products";

let products = [];

const fetchProducts = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    products = data.map((item) => {
      return {
        id: item.id,
        name: item.title,
        category:
          item.category === `men's clothing` ||
          item.category === `women's clothing`
            ? "clothing"
            : item.category,
      };
    });
    renderProducts();
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
};

const renderProducts = () => {
  let filteredProducts = products.filter((product) => {
    let match = true;
    if (filterClothing.checked && product.category !== "clothing") {
      match = false;
    }
    if (filterElectronics.checked && product.category !== "electronics") {
      match = false;
    }
    if (filterJewelery.checked && product.category !== "jewelery") {
      match = false;
    }
    if (
      filterName.value &&
      !product.name.toLowerCase().includes(filterName.value.toLowerCase())
    ) {
      match = false;
    }
    return match;
  });

  productList.innerHTML = "";

  filteredProducts.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = `${product.name} (${product.category})`;
    productList.appendChild(li);
  });
};

const handleFilterChange = () => {
  renderProducts();
};

const handleFilterReset = () => {
  filterClothing.checked = false;
  filterElectronics.checked = false;
  filterJewelery.checked = false;
  filterName.value = "";
  renderProducts();
};

filterClothing.addEventListener("change", handleFilterChange);
filterElectronics.addEventListener("change", handleFilterChange);
filterJewelery.addEventListener("change", handleFilterChange);
filterName.addEventListener("input", handleFilterChange);
filterReset.addEventListener("click", handleFilterReset);

fetchProducts();
