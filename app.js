document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready
});

// script.js
// document.addEventListener("DOMContentLoaded", () => {
//   const decrementBtn = document.getElementById("decrement-btn");
//   const incrementBtn = document.getElementById("increment-btn");
//   const quantityInput = document.getElementById("quantity-input");

//   decrementBtn.addEventListener("click", () => {
//     let currentValue = parseInt(quantityInput.value);
//     if (currentValue > 1) {
//       quantityInput.value = currentValue - 1;
//     }
//   });

//   incrementBtn.addEventListener("click", () => {
//     let currentValue = parseInt(quantityInput.value);
//     quantityInput.value = currentValue + 1;
//   });
// });

//------------------item array---------------------
const itemList = [
  {
    id: "B1001",
    img: "img/burger-1.png",
    title: "Classic Burger (Large)",
    price: 1500,
    discount: 15,
    category: "Burgers",
  },
  {
    id: "B1002",
    img: "img/burger-1.png",
    title: "Classic Burger (Regular)",
    price: 750,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1003",
    img: "img/burger-1.png",
    title: "Turkey Burger",
    price: 1600,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1004",
    img: "img/burger-1.png",
    title: "Chicken Burger (Large)",
    price: 1400,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1005",
    img: "img/burger-1.png",
    title: "Chicken Burger (Regular)",
    price: 800,
    discount: 20,
    category: "Burgers",
  },
  {
    id: "B1006",
    img: "img/burger-1.png",
    title: "Cheese Burger (Large)",
    price: 1000,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1007",
    img: "img/burger-1.png",
    title: "Cheese Burger (Regular)",
    price: 600,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1008",
    img: "img/burger-1.png",
    title: "Bacon Burger",
    price: 650,
    discount: 15,
    category: "Burgers",
  },
  {
    id: "B1009",
    img: "img/burger-1.png",
    title: "Shawarma Burger",
    price: 800,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "B1010",
    img: "img/burger-1.png",
    title: "Olive Burger",
    price: 1800,
    discount: 0,
    category: "Burgers",
  },
  {
    id: "test",
    img: "img/burger-3.png",
    title: "test Burger",
    price: 1800,
    discount: 0,
    category: "Submarines",
  },
  {
    id: "test2",
    img: "img/burger-3.png",
    title: "test3 Burger",
    price: 1800,
    discount: 0,
    category: "Submarines",
  },
  {
    id: "test",
    img: "img/burger-1.png",
    title: "test2 Burger",
    price: 1800,
    discount: 0,
    category: "Pasta",
  },
];

//-----------------Add Item cards--------------------------

itemList.forEach((element) => {
  const all = document.getElementById("all");
  const itemCard = document.createElement("div");
  itemCard.classList.add("item-card");
  itemCard.dataset.id = element.id;
  itemCard.innerHTML = `
                <div class="img">
                    <img src="${element.img}" alt="Product Image">
                </div>
                <div class="content">
                    <h3>${element.title}</h3>
                    <span class="price">Rs.${element.price}</span>
                    <span class="discount">${element.discount}% off</span>
                </div>
            `;
  itemCard.addEventListener("click", () => addToCart(element.id));
  all.appendChild(itemCard);
});

itemList.forEach((element) => {
  if (element.category == "Burgers") {
    const burgers = document.getElementById("burgers");
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.dataset.id = element.id;
    itemCard.innerHTML = `
                <div class="img">
                    <img src="${element.img}" alt="Product Image">
                </div>
                <div class="content">
                    <h3>${element.title}</h3>
                    <span class="price">Rs.${element.price}</span>
                    <span class="discount">${element.discount}% off</span>
                </div>
            `;
    itemCard.addEventListener("click", () => addToCart(element.id));
    burgers.appendChild(itemCard);

  } else if (element.category == "Submarines") {
    const submarines = document.getElementById("submarines");
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.dataset.id = element.id;
    itemCard.innerHTML = `
                <div class="img">
                    <img src="${element.img}" alt="Product Image">
                </div>
                <div class="content">
                    <h3>${element.title}</h3>
                    <span class="price">Rs.${element.price}</span>
                    <span class="discount">${element.discount}% off</span>
                </div>
            `;
    itemCard.addEventListener("click", () => addToCart(element.id));
    submarines.appendChild(itemCard);
  }
});

//-------------------------add to cart function------------------

let cartItem = document.getElementById("all");
let cart = [];

function addToCart(product_Id) {
  let itemIsInTheCart = cart.findIndex((value) => value.productId === product_Id);

  if (cart.length == 0) {
    cart=[{
      productId: product_Id,
      quantity: 1
    }]
  }else if (itemIsInTheCart < 0) {
    cart.push({
      productId: product_Id,
      quantity: 1
    })
  }else{
    cart[itemIsInTheCart].quantity = cart[itemIsInTheCart].quantity+1;
  }
  addToHtml();
}

const addToHtml = () => {
  let cartBody = document.getElementById("card-body");
  clearContentAfterOrderId();
  
  cart.forEach(carts => {
    const items = document.createElement("div");
    items.setAttribute("id", "items");
    items.classList.add("cart-item", "d-flex", "gap-4", "mt-3", "mb-3", "align-items-center", "justify-content-center");
    items.dataset.id = carts.productId;
    let indexOfObject = itemList.findIndex((value) => value.id == carts.productId);
    let objectInfo = itemList[indexOfObject];
    
    items.innerHTML = `
      <div class="desc-item">
        <h5>${objectInfo.title}</h5>
        <span>${objectInfo.discount}% off</span>
      </div>
      <div class="quantity-container">
        <button class="quantity-btn" id="decrement-btn">-</button>
        <input type="text" id="quantity-input" value="${carts.quantity}" readonly />
        <button class="quantity-btn" id="increment-btn">+</button>
      </div>
      <div class="price d-flex justify-content-center">
        <h6>Rs.${objectInfo.price * carts.quantity}</h6>
      </div>
      <div class="trash-icon">
        <i class="bx bxs-trash avatar" role="button"></i>
      </div>
    `;
    
    cartBody.appendChild(items); // Append each items element inside the loop
  });
}

function clearContentAfterOrderId() {

  const parent = document.querySelector('.card-body');

  const orderIdElement = parent.querySelector('.order-id');

  let sibling = orderIdElement.nextElementSibling;

  while (sibling) {
      let nextSibling = sibling.nextElementSibling;
      sibling.remove();
      sibling = nextSibling;
  }
}

//------------------increase and decrease quantity-----
