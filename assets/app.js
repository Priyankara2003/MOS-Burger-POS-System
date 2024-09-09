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

// get items
let itemList = JSON.parse(localStorage.getItem("itemListJson"));


//-----------------Add Item cards--------------------------
function addItemCards() {
  let itemList = JSON.parse(localStorage.getItem("itemListJson"));

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

}

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
  CalcTotal();
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
        <input type="text" id="quantity-input" value="${carts.quantity}" readonly />
        <button class="quantity-btn increment-btn" id="increment-btn">+</button>
      </div>
      <div class="price d-flex justify-content-center">
        <h6>Rs.${objectInfo.price * carts.quantity}</h6>
      </div>
      <div class="trash-icon">
        <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
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

cartItemToIncrease.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("increment-btn") ||
    positionClick.classList.contains("decrement-btn")
  ) {
    let product_Id = positionClick.parentElement.parentElement.dataset.id;
    console.log(product_Id);
    let type = "minus";
    if (positionClick.classList.contains("increment-btn")) {
      type = "plus";
    }
    ChangeQuantity(product_Id, type);
  }
});

const ChangeQuantity = (product_Id, type) => {
  let itemInfo = cart.findIndex((value) => value.productId == product_Id);
  if (type == "minus") {
    if (cart[itemInfo].quantity > 1) {
      cart[itemInfo].quantity = cart[itemInfo].quantity - 1;
    }
  } else {
    cart[itemInfo].quantity = cart[itemInfo].quantity + 1;
  }
  AddToHtml();
  CalcSubTotal();
  CalcDiscount();
  CalcTotal();
};

//----------------------trash button function-----------------

function deleteItem(el) {
  let product_Id = el.parentElement.parentElement.dataset.id;
  let itemInfo = cart.findIndex((value) => value.productId == product_Id);

  cart.splice(itemInfo, 1);
  AddToHtml();
  CalcSubTotal();
  CalcDiscount();
  CalcTotal();
}

//-------------------------calculate subtotal and display it-----------------------

function CalcSubTotal() {
  const subttl = document.getElementById("subtotal");

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let indexOfObject = itemList.findIndex(
      (value) => value.id == cart[i].productId
    );
    let objectInfo = itemList[indexOfObject];

    let itemTotal = objectInfo.price * cart[i].quantity;
    subtotal += itemTotal;
  }
  subttl.innerText = `Rs.${subtotal}`;
  return subtotal;
}

//-------------------add discount applying option---------------

let discountDisplay = document.getElementById("discount");
let inputDiscount = document.getElementById("discount-percentage");

function CalcDiscount() {
  let discountPercent = inputDiscount.value;
  let subtotal = CalcSubTotal();

  let discount = (subtotal / 100) * discountPercent;
  discount = Math.round(discount);
  discountDisplay.innerText = `RS.${discount}`;

  return discount;
}

//--------------when click btn clear fields for another order--------------
function ClearFields() {
  document.getElementById("discount-percentage").value = "";

  cart.length = 0;
}

//-------------------calculate total and display function----------

let totalDisplay = document.getElementById("total");

function CalcTotal() {
  let subtotal = CalcSubTotal();
  let discount = CalcDiscount();
  let total = subtotal - discount;

  totalDisplay.innerText = `RS.${total}`;
  return total;
}

//----------------order id----------------

let orderNumber = 0;
let order_Id;
let orderIdDisplay = document.getElementById("order-id");

order_Id = zeroPad();
orderIdDisplay.innerText = `${order_Id}`;

function zeroPad() {
  orderNumber = ++orderNumber;
  return "#" + orderNumber.toString().padStart(4, "0");
}

function OrderID() {
  let detailsOrder = JSON.parse(localStorage.getItem('orderDetails'));
  if (detailsOrder != null) {
    console.log(detailsOrder);
    orderNumber = detailsOrder[detailsOrder.length - 1].orderId.charAt(4)
    order_Id = zeroPad();
    orderIdDisplay = document.getElementById("order-id");
    orderIdDisplay.innerText = `${order_Id}`;
  } else {
    order_Id = zeroPad();
    orderIdDisplay = document.getElementById("order-id");
    orderIdDisplay.innerText = `${order_Id}`;
  }
}

//-------------------------setup PopUp form------------

function ToggleActive() {
  let blur = document.getElementById("blur");
  blur.classList.toggle("blur");

  let form = document.getElementById("form-payment");
  form.style.display = "block";
}

function ToggleInActive() {
  let blur = document.getElementById("blur");
  blur.classList.toggle("blur");

  let form = document.getElementById("form-payment");
  form.style.display = "none";
}

//-------------------add order details and bill for popup----------------

let popupOrderDisplay = document.getElementById("cart-items");
let popDiscountDisplay = document.getElementById("discount-pop");
let popSubtotalDisplay = document.getElementById("subtotal-pop");
let popTotalDisplay = document.getElementById("total-pop");

function AddItemToPopup() {
  let total = CalcTotal();
  let discount = CalcDiscount();
  let subTotal = CalcSubTotal();
  popupOrderDisplay.innerHTML = "";

  cart.forEach((element) => {
    let indexOfItem = itemList.findIndex((value) => value.id == element.productId);
    popupOrderDisplay.innerHTML += `
      <div class="item-info mt-3">
        <h6>${itemList[indexOfItem].title}</h6>
        <h6>*${element.quantity}</h6>
        <h6 class="price">Rs.${itemList[indexOfItem].price * element.quantity}</h6>
      </div>
      `;
  });

  popTotalDisplay.innerText = `Rs.${total}`;
  popSubtotalDisplay.innerText = `Rs.${subTotal}`;
  popDiscountDisplay.innerText = `Rs.${discount}`;
}

//-------------------store order details-------------

let nameCustomer = document.getElementById("customer-name");
let phoneCustomer = document.getElementById("customer-contact");
let index = 0;

if (!sessionStorage.getItem('setOrderArray')) {
  let orderDetails = [];
  let stringifiedOrdedrList = JSON.stringify(orderDetails);
  localStorage.setItem("orderDetails", stringifiedOrdedrList);

  sessionStorage.setItem('setOrderArray', 'true');
}

function storeOrderDetails() {
  let date = new Date();
  let total = CalcTotal();
  let discount = CalcDiscount();
  let orderDetails = JSON.parse(localStorage.getItem('orderDetails'))

  orderDetails.push({
    orderId: order_Id,
    custName: nameCustomer.value,
    custPhone: phoneCustomer.value,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    infoItems: [],
    total: total,
    discount: discount,
  });

  cart.forEach((element) => {
    let indexOfItem = itemList.findIndex((value) => value.id == element.productId);

    orderDetails[orderDetails.length - 1].infoItems.push({
      itemID: element.productId,
      itemPrice: itemList[indexOfItem].price,
      itemDiscount: itemList[indexOfItem].discount,
      itemQuantity: element.quantity,
    });
  });
  index++;

  let stringifiedOrderDetails = JSON.stringify(orderDetails);
  localStorage.setItem('orderDetails', stringifiedOrderDetails);

  nameCustomer.value = ''
  phoneCustomer.value = ''

  ToggleInActive();
  AddToHtml();
  CalcSubTotal();
  CalcTotal();
  CalcDiscount()
}

// //--------------------- setup Reciept ------------------------
const { jsPDF } = window.jspdf;

function getTableData() {
  let tableData = JSON.parse(localStorage.getItem('orderDetails')) || [];
  console.log("Table Data:", tableData);
  return tableData;
}

let indexOfObj = 0;

function generatePDF() {
  const tableData = getTableData();

  if (!Array.isArray(tableData) || tableData.length === 0) {
    console.error("No valid table data available.");
    return;
  }

  const doc = new jsPDF();

  // Header with Company Name/Logo and Invoice Details
  const logoImg = 'img/logo.png';
  doc.addImage(logoImg, 'PNG', 20, 5, 40, 20);


  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text(`Invoice ${order_Id}`, 200, 20, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 26, { align: "right" });

  // Divider
  doc.setLineWidth(0.5);
  doc.line(14, 30, 200, 30);

  // Sender and Receiver Information
  doc.setFont("Helvetica", "bold");
  doc.text("From:", 14, 40);
  doc.text("To:", 200, 40, { align: "right" });

  doc.setFont("Helvetica", "normal");
  doc.text("MOS Burgers", 14, 46);
  doc.text("62,Mathara Road", 14, 52);
  doc.text("Galle,Sri Lanka 80000", 14, 58);
  doc.text("Email: mosburgers@gmail.com", 14, 64);
  doc.text("Phone: +94 74 54 43 456", 14, 70);

  doc.text(`${tableData[indexOfObj].custName}`, 200, 46, { align: "right" });
  doc.text(`Phone: ${tableData[indexOfObj].custPhone}`, 200, 52, { align: "right" });

  // Divider
  doc.line(14, 78, 200, 78);

  // Table Headers
  doc.setFont("Helvetica", "bold");
  doc.text('#', 14, 85);
  doc.text('Item', 25, 85);
  doc.text('Discount', 80, 85);
  doc.text('Price', 120, 85);
  doc.text('Qty', 160, 85);
  doc.text('Total', 200, 85, { align: "right" });

  // Divider under table headers
  doc.line(14, 88, 200, 88);

  // Table Data
  doc.setFont("Helvetica", "normal");
  let y = 98;
  tableData[indexOfObj].infoItems.forEach((item, index) => {
    let indexOfItem = itemList.findIndex((value) => value.id == item.itemID);

    doc.text(String(index + 1), 14, y);
    doc.text(itemList[indexOfItem].title || 'N/A', 25, y);
    doc.text(String(item.itemDiscount) + "%" || 'N/A', 80, y);
    doc.text(`Rs.${parseFloat(item.itemPrice || 0).toFixed(2)}`, 120, y);
    doc.text(String(item.itemQuantity || 0), 160, y);
    doc.text(`Rs.${(parseFloat(itemList[indexOfItem].price || 0) * parseFloat(item.itemQuantity || 0)).toFixed(2)}`, 200, y, { align: "right" });
    y += 10;
  });

  // Divider under table data
  doc.line(14, y + 5, 200, y + 5);

  // Calculate totals
  let total = CalcTotal();
  let discount = CalcDiscount();
  let subTotal = CalcSubTotal();

  // Summary Section
  doc.setFont("Helvetica", "bold");
  doc.text(`Subtotal`, 140, y + 15, null, null, "right");
  doc.text(`Rs.${subTotal.toFixed(2)}`, 170, y + 15, null, null, "right");

  doc.text(`Discount`, 140, y + 25, null, null, "right");
  doc.text(`-Rs.${discount.toFixed(2)}`, 170, y + 25, null, null, "right");

  doc.text(`Total`, 140, y + 35, null, null, "right");
  doc.text(`Rs.${total.toFixed(2)}`, 170, y + 35, null, null, "right");


  // Footer
  doc.setFontSize(10);
  doc.setFont("Helvetica", "italic");
  doc.text("MOS Burgers, Mathara Road, Galle, 80000", 14, 290);

  // Save the PDF
  doc.save(`payment_invoice${order_Id}.pdf`);

  indexOfObj++;
  ClearFields();
  AddToHtml();
  CalcSubTotal();
  CalcTotal();
  CalcDiscount()
}