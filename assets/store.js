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

//-------------------inject table data------------------

const addItemInfoToTable = () => {
    let itemInfoParsed = JSON.parse(localStorage.getItem("itemListJson"));

    itemInfoParsed.forEach((element) => {
        if (element.category == "Burgers") {
            document.getElementById("burger").innerHTML += `
                            <tr class="t-data" data-id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.title}</td>
                                <td>Rs.${element.price}</td>
                                <td>
                                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                                    <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
                                </td>
                            </tr>`;
        } else if (element.category == "Submarines") {
            document.getElementById("submarines").innerHTML += `
                            <tr class="t-data" data-id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.title}</td>
                                <td>Rs.${element.price}</td>
                                <td>
                                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                                    <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
                                </td>
                            </tr>`;
        } else if (element.category == "Pasta") {
            document.getElementById("pasta").innerHTML += `
                            <tr class="t-data" data-id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.title}</td>
                                <td>Rs.${element.price}</td>
                                <td>
                                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                                    <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
                                </td>
                            </tr>`;
        }
    });

    itemInfoParsed.forEach((element) => {
        if (element.category == "Burgers") {
            document.getElementById("burger-category").innerHTML += `
                            <tr class="t-data" data-id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.title}</td>
                                <td>Rs.${element.price}</td>
                                <td>
                                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                                    <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
                                </td>
                            </tr>`;
        } else if (element.category == "Submarines") {
            document.getElementById("submarines-category").innerHTML += `
                            <tr class="t-data" data-id="${element.id}">
                                <td>${element.id}</td>
                                <td>${element.title}</td>
                                <td>Rs.${element.price}</td>
                                <td>
                                    <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick="ToggleActiveEditForm(this)"></i>
                                    <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
                                </td>
                            </tr>`;
        }
        // else if (element.category == "Pasta") {
        //     document.getElementById("pasta-category").innerHTML += `
        //                     <tr class="t-data" data-id="${element.id}">
        //                         <td>${element.id}</td>
        //                         <td>${element.title}</td>
        //                         <td>Rs.${element.price}</td>
        //                         <td>
        //                             <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
        //                             <i class="bx bxs-trash avatar" role="button" onclick="deleteItem(this)"></i>
        //                         </td>
        //                     </tr>`;
        // }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    addItemInfoToTable();
});

//------------clear content after deleting item---------------
function clearContent() {
    document.getElementById("burger").innerHTML = "";
    document.getElementById("submarines").innerHTML = "";
    document.getElementById("pasta").innerHTML = "";
    document.getElementById("burger-category").innerHTML = "";
    document.getElementById("submarines-category").innerHTML = "";
    // document.getElementById('pasta-category').innerHTML = '';
}

//---------------------------delete item from the list------------------
function deleteItem(el) {
    let itemInfoId = el.parentElement.parentElement.dataset.id;

    let itemInfoParsed = JSON.parse(localStorage.getItem("itemListJson"));
    let indexOfItem = itemInfoParsed.findIndex((value) => value.id == itemInfoId);

    if (indexOfItem !== -1) {
        itemInfoParsed.splice(indexOfItem, 1);

        let stringifiedItemList = JSON.stringify(itemInfoParsed);
        localStorage.setItem("itemListJson", stringifiedItemList);

        clearContent();
        addItemInfoToTable();
    } else {
        console.error("Item not found in the array.");
    }
}

//-------------------------setup add item PopUp form------------

function ToggleActive() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("add-item-form");
    form.style.display = "block";
}

function ToggleInActive() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("add-item-form");
    form.style.display = "none";
}

//-------------------------setup edit item info PopUp form------------

function ToggleActiveEditForm(el) {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("edit-item-form");
    form.style.display = "block";

    fillItemInfo(el);
}

function ToggleInActiveEditForm() {
    let blur = document.getElementById("blur");
    blur.classList.toggle("blur");

    let form = document.getElementById("edit-item-form");
    form.style.display = "none";
}

// add Item to Storage using add-item-form
const formProductID = document.getElementById('product-id');
const formProductTitle = document.getElementById('product-title');
const formProductPrice = document.getElementById('product-price');
const formProductDiscount = document.getElementById('product-discount');
const formProductCategory = document.getElementById('categories');

function clearFieldsAddItemForm() {
    formProductID.value = '';
    formProductTitle.value = '';
    formProductPrice.value = '';
    formProductDiscount.value = '';
    formProductCategory.value = '';
}

function addItems() {
    if (formProductID.value != '' && formProductTitle.value != '' && formProductPrice.value != '' && formProductDiscount.value != '' && formProductCategory.value != '') {
        let itemList = JSON.parse(localStorage.getItem("itemListJson"));
        let img_form;
        switch (formProductCategory.value) {
            case 'Burgers':
                img_form = "img/burger-1.png"
                break;
            case 'Submarines':
                img_form = "img/burger-1.png"
                break;
            case 'Pasta':
                img_form = "img/burger-1.png"
                break;

            default:
                img_form = "img/burger-1.png"
                break;
        }

        itemList.push({
            id: formProductID.value,
            img: img_form,
            title: formProductTitle.value,
            price: formProductPrice.value,
            discount: formProductDiscount.value,
            category: formProductCategory.value,
        })

        let stringifiedItemList = JSON.stringify(itemList);
        localStorage.setItem("itemListJson", stringifiedItemList);

        alert('Item Added Succesfully!')

        clearContent();
        addItemInfoToTable();
        clearFieldsAddItemForm();
    }else{
        alert('Enter Data For All Fields!')
    }
}

//edit item information form 
const editFormProductID = document.getElementById('edit-product-id');
const editFormProductTitle = document.getElementById('edit-product-title');
const editFormProductPrice = document.getElementById('edit-product-price');
const editFormProductDiscount = document.getElementById('edit-product-discount');
const editFormProductCategory = document.getElementById('edit-categories');

function fillItemInfo(el){
    let itemInfoId = el.parentElement.parentElement.dataset.id;

    let itemInfoParsed = JSON.parse(localStorage.getItem("itemListJson"));
    let indexOfItem = itemInfoParsed.findIndex((value) => value.id == itemInfoId);

    if (indexOfItem !== -1) {
        let info = itemInfoParsed[indexOfItem];

        editFormProductID.value = info.id;
        editFormProductTitle.value = info.title;
        editFormProductPrice.value = info.price;
        editFormProductDiscount.value = info.discount;
        editFormProductCategory.value = info.category;
    } else {
        alert("Item not found in the db.");
    }
}

function updateItemInfo(){
    let itemInfoParsed = JSON.parse(localStorage.getItem("itemListJson"));
    let indexOfItem = itemInfoParsed.findIndex((value) => value.id == editFormProductID.value);

    if (indexOfItem !== -1) {
        let info = itemInfoParsed[indexOfItem];

        info.title = editFormProductTitle.value;
        info.price = editFormProductPrice.value;
        info.discount = editFormProductDiscount.value;
        info.category = editFormProductCategory.value;

        let stringifiedItemList = JSON.stringify(itemInfoParsed);
        localStorage.setItem("itemListJson", stringifiedItemList);

        alert('Item info Updated Succesfully!');

        clearContent();
        addItemInfoToTable();
    }else{
        alert("Can't Found item. Plese Do not change product ID.")
    }
}