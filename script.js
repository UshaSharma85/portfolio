const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        image: "image/image04.jpg",


    },

    {
        id: 2,
        name: "Headphones",
        price: 1499,
        image: "image/image12.jpg",

    },

    {
        id: 3,
        name: "Shoes",
        price: 2499,
        image: "image/image14.jpg",

    },

    {
        id: 4,
        name: "Mini Bluetooth speakers",
        price: 1399,
        image: "image/image3.jpg",

    },

    {
        id: 5,
        name: "Vegetable chopper",
        price: 1299,
        image: "image/image5.jpg",

    },

    {
        id: 6,
        name: "camra",
        price: 199,
        image: "image/image1.jpg",

    },
    {
        id: 7,
        name: "Sunglasses",
        price: 299,
        image: "image/image4.jpg",

    },

    {
        id: 8,
        name: "Beard grooming kits",
        price: 450,
        image: "image/image.jpg",

    },

    {
        id: 9,
        name: "Protein shaker bottles",
        price: 560,
        image: "image/image001.jpg",

    },

    {
        id: 10,
        name: "Bike phone mount",
        price: 199,
        image: "image/image002.jpg",

    },

    {
        id: 11,
        name: "makeup items",
        price: 399,
        image: "image/image13.jpg",

    },

    {
        id: 12,
        name: "Wireless earbuds",
        price: 3000,
        image: "image/image004.jpg",
    },

];



const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DISPLAY PRODUCTS */

function displayProducts() {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>
                <div class="price">₹${product.price}</div>
                <div class="rating">
            ${createStars(product.rating, product.id)}
        </div>
        <div class="btn-group">

                <div class="btn-group">

                    <button class="add-cart" onclick="addToCart(${product.id})">
                        Add To Cart
                    </button>

                    <button class="buy-now" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>

                    <button class="details-btn" onclick="viewDetails(${product.id})">
                        Details
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function createStars(rating = 0, productId) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {
        stars += ` <span class="star ${i <= rating ? 'filled' : ''}"
    onclick="rateProduct(${productId}, ${i})">
    ★
    </span>

    `;
    }

    return stars;
}

function rateProduct(productId, rating) {

    // PRODUCT FIND
    const product = products.find(p => p.id === productId);

    if (product) {

        // SAVE RATING
        product.rating = rating;

        // RE-RENDER PRODUCTS
        displayProducts();

        // OPTIONAL LOCALSTORAGE
        localStorage.setItem("products", JSON.stringify(products));

    }
}

function buyNow(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    alert(`Buying: ${product.name} for ₹${product.price}`);

    localStorage.setItem("buyNowProduct", JSON.stringify(product));
}
/* ADD TO CART */
function showDetails(name, description, price) {
    alert(
        "Product: " + name +
        "\n\nDescription: " + description +
        "\n\nPrice: ₹" + price
    );
}

function viewDetails(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    document.getElementById("d-name").innerText = product.name;
    document.getElementById("d-price").innerText =
        "Price: ₹" + product.price;
    let description = "This is a great product that you will love! It has many features and benefits that make it a must-have item. Don't miss out on this amazing deal!";
    document.getElementById("d-description").innerText =
    description;
    document.getElementById("modal").style.display = "flex";
}

function addToCart(id) {

    const item = products.find(product => product.id === id);

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

/* UPDATE CART */

function updateCart() {

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {

        totalPrice += item.price;

        cartItems.innerHTML += `
        
        <div class="cart-item">

            <img src="${item.image}">

            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                X
            </button>

        </div>
        `;
    });

    cartCount.innerText = cart.length;

    total.innerText = totalPrice;

}

/* REMOVE ITEM */

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.onclick = () => {
    navLinks.classList.toggle("active");
};

/* CART OPEN */

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");

closeCartBtn.onclick = () => {
    cartSidebar.classList.remove("active");
};

cartBtn.onclick = () => {
    cartSidebar.classList.toggle("active");
};

displayProducts();
updateCart();

/* AUTO IMAGE SLIDER */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

/* CHANGE IMAGE EVERY 3 SECOND */

setInterval(changeSlide, 3000);

/* SHOP NOW BUTTON */

function shopNow(productName) {

    alert(productName + " added to cart!");

}

/* DETAILS BUTTON */


function pay(method) {

    let product = JSON.parse(localStorage.getItem("buyNowProduct"));

    if (!product) {
        alert("Product missing! Please use Buy Now again.");
        return;
    }

    let order = {
        name: product.name,
        price: product.price,
        qty: 1,
        total: product.price,
        image: product.image,
        paymentMethod: method
    };

    localStorage.setItem("successOrder", JSON.stringify(order));

    window.location.href = "paymentprocess.html";
}



// AUTO SPACE IN CARD NUMBER
function buyNow(id) {

    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}


function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function showInfo(title, text) {
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}



