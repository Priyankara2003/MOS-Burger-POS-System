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
});

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
  let itemIsInTheCart = cart.findIndex(
    (value) => value.productId === product_Id
  );

  if (cart.length == 0) {
    cart = [
      {
        productId: product_Id,
        quantity: 1,
      },
    ];
  } else if (itemIsInTheCart < 0) {
    cart.push({
      productId: product_Id,
      quantity: 1,
    });
  } else {
    cart[itemIsInTheCart].quantity = cart[itemIsInTheCart].quantity + 1;
  }
  AddToHtml();
  CalcSubTotal();
  CalcDiscount();
  CalcTotal()
}

const AddToHtml = () => {
  let cartBody = document.getElementById("card-body");
  clearContentAfterOrderId();

  cart.forEach((carts) => {
    const items = document.createElement("div");
    items.setAttribute("id", "items");
    items.classList.add(
      "cart-item",
      "d-flex",
      "gap-4",
      "mt-3",
      "mb-3",
      "align-items-center",
      "justify-content-center"
    );
    items.dataset.id = carts.productId;
    let indexOfObject = itemList.findIndex((value) => value.id == carts.productId);
    let objectInfo = itemList[indexOfObject];

    items.innerHTML = `
      <div class="desc-item">
        <h5>${objectInfo.title}</h5>
        <span>${objectInfo.discount}% off</span>
      </div>
      <div class="quantity-container">
        <button class="quantity-btn decrement-btn" id="decrement-btn">-</button>
        <input type="text" id="quantity-input" value="${
          carts.quantity
        }" readonly />
        <button class="quantity-btn increment-btn" id="increment-btn">+</button>
      </div>
      <div class="price d-flex justify-content-center">
        <h6>Rs.${objectInfo.price * carts.quantity}</h6>
      </div>
      <div class="trash-icon">
        <i class="bx bxs-trash avatar" role="button" onclick="deleteItem()"></i>
      </div>
    `;

    cartBody.appendChild(items); // Append each items element inside the loop
  });  
};

function clearContentAfterOrderId() {
  const parent = document.querySelector(".card-body");

  const orderIdElement = parent.querySelector(".order-id");

  let sibling = orderIdElement.nextElementSibling;

  while (sibling) {
    let nextSibling = sibling.nextElementSibling;
    sibling.remove();
    sibling = nextSibling;
  }
}

//------------------increase and decrease quantity-----
const cartItemToIncrease = document.getElementById("card-body");

cartItemToIncrease.addEventListener("click" , (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('increment-btn') || positionClick.classList.contains('decrement-btn')) {
    let product_Id = positionClick.parentElement.parentElement.dataset.id;
    console.log(product_Id);
    let type = "minus";
    if (positionClick.classList.contains('increment-btn')) {
      type = "plus";
    }
  ChangeQuantity(product_Id,type);
  }
})

const ChangeQuantity = (product_Id,type) => {
  let itemInfo = cart.findIndex(value => value.productId == product_Id);
  if (type == "minus") {
    if (cart[itemInfo].quantity > 1) {
      cart[itemInfo].quantity = cart[itemInfo].quantity - 1;
    }
  }else {
    cart[itemInfo].quantity = cart[itemInfo].quantity + 1;
  }
  AddToHtml();
  CalcSubTotal();
  CalcDiscount();
  CalcTotal()
}

//----------------------trash button function-----------------

function deleteItem(){
  let product_Id = cartItemToIncrease.parentElement.parentElement.dataset.id;
  let itemInfo = cart.findIndex(value => value.productId == product_Id);

  cart.splice(itemInfo);
  AddToHtml();
  CalcSubTotal();
  CalcDiscount();
  CalcTotal()
}

//-------------------------calculate subtotal and display it-----------------------

function CalcSubTotal(){
  const subttl = document.getElementById("subtotal");

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let indexOfObject = itemList.findIndex((value) => value.id == cart[i].productId);
    let objectInfo = itemList[indexOfObject];
    
    let itemTotal = objectInfo.price * cart[i].quantity;
    subtotal += itemTotal;
  }
  subttl.innerText = `Rs.${subtotal}`;
  return subtotal;
}

//-------------------add discount applying option---------------

let discountDisplay = document.getElementById("discount")
let inputDiscount = document.getElementById("discount-percentage")

function CalcDiscount(){
  let discountPercent = inputDiscount.value;
  let subtotal = CalcSubTotal();

  let discount = subtotal / 100 * discountPercent;
  discount = Math.round(discount);
  discountDisplay.innerText = `RS.${discount}`
  
  return discount;
}

//--------------when click btn clear input discount--------------
function ClearFields() {
  document.getElementById("discount-percentage").value = "";
}

//-------------------calculate total and display function----------

let totalDisplay = document.getElementById("total");

function CalcTotal(){
  let subtotal = CalcSubTotal();
  let discount = CalcDiscount();
  let total = subtotal - discount;

  totalDisplay.innerText = `RS.${total}`
  return total;
}

//----------------order id----------------

let orderNumber = 0;
let order_Id;
let orderIdDisplay = document.getElementById("order-id");

order_Id = zeroPad()
orderIdDisplay.innerText = `${order_Id}`

function zeroPad() {
  orderNumber = ++orderNumber;
  return '#'+orderNumber.toString().padStart(4, "0");
}

function OrderID(){
  order_Id = zeroPad()
  orderIdDisplay = document.getElementById("order-id");
  orderIdDisplay.innerText = `${order_Id}`
}

//-------------------------setup PopUp form------------

function ToggleActive(){
  let blur = document.getElementById("blur");
  blur.classList.toggle("blur")

  let form = document.getElementById("form-payment");
  form.style.display = 'block';
}

function ToggleInActive(){
  let blur = document.getElementById("blur");
  blur.classList.toggle("blur")

  let form = document.getElementById("form-payment");
  form.style.display = 'none';
}

//-------------------add order details and bill for popup----------------

let popupOrderDisplay = document.getElementById("cart-items");
let popDiscountDisplay = document.getElementById("discount-pop");
let popSubtotalDisplay = document.getElementById("subtotal-pop");
let popTotalDisplay = document.getElementById("total-pop");

function AddItemToPopup(){
  let total = CalcTotal();
  let discount = CalcDiscount();
  let subTotal = CalcSubTotal();
  popupOrderDisplay.innerHTML = '';

  cart.forEach(element => {
    let indexOfItem = itemList.findIndex(value => value.id == element.productId)
    popupOrderDisplay.innerHTML += `
      <div class="item-info mt-3">
        <h6>${itemList[indexOfItem].title}</h6>
        <h6>*${element.quantity}</h6>
        <h6 class="price">Rs.${itemList[indexOfItem].price * element.quantity}</h6>
      </div>
      `
  })

  popTotalDisplay.innerText = `Rs.${total}`
  popSubtotalDisplay.innerText = `Rs.${subTotal}`
  popDiscountDisplay.innerText = `Rs.${discount}`
}