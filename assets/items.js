//------------------item array---------------------
const itemListLocal = [
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
        title: "test Submarines",
        price: 1800,
        discount: 0,
        category: "Submarines",
    },
    {
        id: "test2",
        img: "img/burger-3.png",
        title: "test3 Submarines",
        price: 1800,
        discount: 0,
        category: "Submarines",
    },
    {
        id: "test-pasta",
        img: "img/burger-1.png",
        title: "test2 pasta",
        price: 1800,
        discount: 0,
        category: "Pasta",
    },
];

if (!sessionStorage.getItem('setItemList')) {
    let stringifiedItemList = JSON.stringify(itemListLocal);
    localStorage.setItem("itemListJson", stringifiedItemList);

    sessionStorage.setItem('setItemList', 'true');
}