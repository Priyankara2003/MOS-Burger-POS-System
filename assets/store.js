//-------------------inject table data------------------
let itemInfoParsed = JSON.parse(localStorage.getItem('itemListJson'));

itemInfoParsed.forEach(element => {
    if (element.category == "Burgers"){
        document.getElementById('burger').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }else if (element.category == "Submarines") {
        document.getElementById('submarines').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }else if (element.category == "Pasta") {
        document.getElementById('pasta').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }
});

itemInfoParsed.forEach(element => {
    if (element.category == "Burgers"){
        document.getElementById('burger-category').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }else if (element.category == "Submarines") {
        document.getElementById('submarines-category').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }else if (element.category == "Pasta") {
        document.getElementById('pasta-category').innerHTML += `
                        <tr class="t-data">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>Rs.${element.price}</td>
                            <td>
                                <i class="bx bxs-message-square-edit avatar me-lg-5" role="button" onclick=""></i>
                                <i class="bx bxs-trash avatar" role="button" onclick=""></i>
                            </td>
                        </tr>`
    }
});