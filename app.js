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
document.addEventListener("DOMContentLoaded", () => {
  const decrementBtn = document.getElementById("decrement-btn");
  const incrementBtn = document.getElementById("increment-btn");
  const quantityInput = document.getElementById("quantity-input");

  decrementBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  incrementBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
});

//item array
const itemList = [
  {
    id:"B1001",
    img:"img/burger-1.png",
    title:"Classic Burger (Large)",
    price:1500,
    discount: 15,
    category:"Burgers"
  },
  {
    id:"B1002",
    img:"img/burger-1.png",
    title:"Classic Burger (Regular)",
    price:750,
    discount: 0,
    category:"Burgers"
  },
  {
    id:"B1003",
    img:"img/burger-1.png",
    title:"Turkey Burger",
    price:1600,
    discount: 0,
    category:"Burgers",
  },
  {
    id:"B1004",
    img:"img/burger-1.png",
    title:"Chicken Burger (Large)",
    price:1400,
    discount: 0,
    category:"Burgers",
  },
  {
    id:"B1005",
    img:"img/burger-1.png",
    title:"Chicken Burger (Regular)",
    price:800,
    discount: 20,
    category:"Burgers",
  },
  {
    id:"B1006",
    img:"img/burger-1.png",
    title:"Cheese Burger (Large)",
    price:1000,
    discount: 0,
    category:"Burgers",
  },
  {
    id:"B1007",
    img:"img/burger-1.png",
    title:"Cheese Burger (Regular)",
    price:600,
    discount: 0,
    category:"Burgers",
  },
  {
    id:"B1008",
    img:"img/burger-1.png",
    title:"Bacon Burger",
    price:650,
    discount: 15,
    category:"Burgers",
  },
  {
    id:"B1009",
    img:"img/burger-1.png",
    title:"Shawarma Burger",
    price:800,
    discount: 0,
    category:"Burgers",
  },
  {
    id:"B1010",
    img:'img/burger-1.png',
    title:"Olive Burger",
    price:1800,
    discount: 0,
    category:"Burgers",
  }
]

let cardBody = document.getElementById("all");

let card = "";

itemList.forEach(element => {
    card += `<div class="item-card">
    <div class="img">
      <img src=${element.img}></img>
    </div>
    <div class="content">
      <h3>${element.title}</h3>
      <span class="price">Rs.${element.price}</span>
      <span class="discount">${element.discount}% off</span>
    </div>
  </div>
  `
})

cardBody.innerHTML = card;

console.log(card);