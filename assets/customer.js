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
                nav.classList.toggle("show-nav");
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


//  customer js

const tableBody = document.getElementById("customers");
let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
let resultArray;

function addDetailsToTable() {
    tableBody.innerHTML = ''
    let groupedOrders = {};

    orderDetails.forEach((order) => {
        let key = `${order.custName.toLowerCase()}_${order.custPhone.toLowerCase()}`;

        if (!groupedOrders[key]) {
            groupedOrders[key] = [];
        }
        groupedOrders[key].push(order);
    });

    resultArray = Object.values(groupedOrders);
    let index = 0;

    resultArray.forEach((el) => {
        tableBody.innerHTML += `
            <tr data-id="${index}" id="t-data">
                <td>${el[0].custName}</td>
                <td>${el[0].custPhone}</td>
                <td>${el.length}</td>
                <td>
                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                    <i class="bx bxs-trash avatar" role="button" onclick="deleteCustomer(this)"></i>
                </td>
            </tr>`;
        index++;
    });
}

//-------------------------setup edit item info PopUp form------------

function ToggleActiveEditForm(el) {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("edit-item-form");
    form.style.display = "block";

    fillOrderInfo(el);
}

function ToggleInActiveEditForm() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("edit-item-form");
    form.style.display = "none";
}


//set data to update info form

const names = document.getElementById('cust-name');
const phone = document.getElementById('cust-phone');
const noOrder = document.getElementById('no-orders');
let indexOfGroupArray;

function fillOrderInfo(el) {
    indexOfGroupArray = el.parentElement.parentElement.dataset.id;

    names.value = `${resultArray[indexOfGroupArray][0].custName}`
    phone.value = `${resultArray[indexOfGroupArray][0].custPhone}`
    noOrder.innerText = `${resultArray[indexOfGroupArray].length}`
}

function updateInfo() {
    let indexOfOrderDetails;

    resultArray[indexOfGroupArray].forEach(el => {
        indexOfOrderDetails = orderDetails.findIndex(value => value.orderId == el.orderId)
        let info = orderDetails[indexOfOrderDetails]

        info.custName = names.value;
        info.custPhone = phone.value;
    })
    let stringifiedOrderList = JSON.stringify(orderDetails);
    localStorage.setItem("orderDetails", stringifiedOrderList);

    alert("Successfully Updated");

    names.value = '';
    phone.value = '';

    addDetailsToTable();
}

function deleteCustomer(el){
    let indexOfOrderDetails;
    let indexOfOrder = el.parentElement.parentElement.dataset.id;

    resultArray[indexOfOrder].forEach(el => {
        indexOfOrderDetails = orderDetails.findIndex(value => value.orderId == el.orderId)
        orderDetails.splice(indexOfOrderDetails,1)
    })
    let stringifiedOrderList = JSON.stringify(orderDetails);
    localStorage.setItem("orderDetails", stringifiedOrderList);

    alert("Successfully Deleted");

    addDetailsToTable();
    addOrderDetailsToTbale();
} 

//add orders table data
const orderTableBody = document.getElementById('orders')

function addOrderDetailsToTbale(){
    let orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    orderTableBody.innerHTML = ''

    orderDetails.forEach(el => {

        orderTableBody.innerHTML += `   
                        <tr data-id="${el.orderId}" id="t-data">
                            <td>${el.custName}</td>
                            <td>${el.custPhone}</td>
                            <td>${el.date}_${el.time}</td>
                            <td>
                                <i class="bx bxs-show avatar me-lg-5" role="button" onclick="displayOrderDetails(this),ToggleActiveOrderDetailsForm()"></i>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditOrderForm(this)"></i>
                                <i class="bx bxs-trash avatar" role="button" onclick="deleteOrder(this)"></i>
                            </td>
                        </tr>`
    })
}

// order details showing popoup data 
const id = document.getElementById('id')
const date_time = document.getElementById('date-time')
const custName = document.getElementById('custName')
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const orderDetailsDisplay = document.getElementById('order-details')

function displayOrderDetails(el) {
    const orderId = el.parentElement.parentElement.dataset.id;
    let orderObj = orderDetails.filter((value) => value.orderId == orderId);
    orderDetailsDisplay.innerHTML = ''

    console.log(orderObj);

    id.innerText = orderObj[0].orderId;
    date_time.innerText = `${orderObj[0].date}__${orderObj[0].time}`;
    custName.innerText = orderObj[0].custName;
    custPhone.innerText = orderObj[0].custPhone;
    discount.innerText = orderObj[0].discount;
    total.innerText = orderObj[0].total;

    orderObj[0].infoItems.forEach(el => {
        orderDetailsDisplay.innerHTML += `
                                        <tr>
                                            <td>${el.itemID}</td>
                                            <td>Rs.${el.itemPrice}</td>
                                            <td>${el.itemDiscount}%</td>
                                            <td>*${el.itemQuantity}</td>
                                        </tr>`
    })
}

// Toggle order dedtail forn active and inactive

function ToggleActiveOrderDetailsForm() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("order-details-form");
    form.style.display = "block";

    fillOrderInfo(el);
}

function ToggleInActiveOrderDetailsForm() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("order-details-form");
    form.style.display = "none";
}

//delete order function

function deleteOrder(el) {
    const id = el.parentElement.parentElement.dataset.id;
    let indexOfOrder = orderDetails.findIndex(value => value.orderId == id)

    orderDetails.splice(indexOfOrder, 1);

    let stringifiedOrderList = JSON.stringify(orderDetails);
    localStorage.setItem("orderDetails", stringifiedOrderList);

    alert("Successfully Deleted");

    addOrderDetailsToTbale();
    addDetailsToTable();
}