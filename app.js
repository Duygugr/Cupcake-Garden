document.addEventListener("DOMContentLoaded", () => {

const menu = document.querySelector(".menu-btn")
const header = document.querySelector(".left-header")
const x = document.querySelector(".fa-solid.fa-x")
const icon = document.querySelector(".fa-solid.fa-bars")
const order = document.querySelector("#orderCart")
const content = document.querySelector(".content")
const addBtn = document.querySelectorAll(".add")
const deleteBtn = document.querySelectorAll(".cart-delete")


const cart = JSON.parse(localStorage.getItem("cart")) ||[]

menu.addEventListener("click",()=>{
    header.classList.toggle("active");
    x.classList.toggle("active")
    icon.classList.toggle("active")
})


addBtn.forEach(btn =>{
    btn.addEventListener("click", () =>{
        const product = btn.parentElement;
        
        const img = product.querySelector("img").src
        const name = product.querySelector("h3").textContent
        const price = product.querySelector(".price").textContent

        const countItem = cart.find(item=> item.name === name)

        if(countItem){
            countItem.count += 1
        }else{
            cart.push({name,  price: Number(price.replace(/[^0-9]/g, "")) ,img, count:1})
        }

        btn.textContent = "Sepete eklendi";
        btn.classList.add("added")
        
        setTimeout (()=>{
            btn.textContent = "Sepete ekle"
            btn.classList.remove("added")
        },2000)

        localStorage.setItem("cart",JSON.stringify(cart))
    })
})


function renderCart(){
    if(cart.length <= 0){
        content.innerHTML = `
        <h1 class= "empty">Sepetiniz boş. </h1>
        `;
    return;
}

    const total = cart.reduce((sum, item) => {
        return sum + (Number(item.price) * item.count);
    }, 0);

        const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

    
    content.innerHTML = `
        <h1 class= "content-cart">Sepetim (${totalCount})</h1>
  
        ${cart.map((item,index) =>`      
        
        <div class= "cart" data-index="${index}">
        <div class = "cart-item" >
            <img src= "${item.img}" width = "90px">
                <h3> ${item.name}</h3>
                <p> <b>${item.price} TL<b></p>

                <button class = "cart-delete">
                <i class="fa-solid fa-trash-can"></i> Sil 
                </button>
        </div>
            <div class="qty"> 
                <button class= "btn-plus"> + </button>
                <span class= "count">  ${item.count}  </span>
                <button class= "btn-minus"><i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
        
        `).join("")}
    `;

    content.innerHTML +=`
        <div class= cart-price> 
            <h2>Sepet</h2>
            <p class="price-row">
                <span>Ara toplam</span>
                <span> ${total} TL </span>
            </p>
            <p class= "price-row">
                <span>Kargo tutarı</span> 
                <span>50 TL</span>
            </p>
            <p class= "price-row">
                <span class="total" ><b> TOPLAM <b> </span> 
                <span class = "total">${total+50} TL</span>
            </p>
                <button class= "cartBtn"> Sepeti onayla </button>
        </div>
    `

    document.querySelector(".cartBtn").addEventListener("click",()=>{
        const total = cart.reduce((sum,item) => sum + item.price * item.count , 0)

        content.innerHTML = `
        <div class="summary">
        <div class= "success">
        <h1>Siparişin onaylandı 🎉</h1>
        
        <h3>Sipariş özeti</h3>

    ${cart.map(item=>`
        <p>${item.name}: ${item.count} adet</p>
    `).join("")}
    <hr>
    <h3>Toplam: ${total+50} </h3>
    </div>
    </div>
    `
    })

}

content.addEventListener("click",(e) =>{
    if(e.target.classList.contains("btn-plus")){
    
        const cartItem = e.target.closest(".cart")
        const index = cartItem.dataset.index;

        cart[index].count++

        localStorage.setItem("cart",JSON.stringify(cart))

        renderCart();
       
    }
})

content.addEventListener("click",(e)=>{
    if(e.target.classList.contains("fa-minus")){

        const cartItem = e.target.closest(".cart")
        const index = cartItem.dataset.index;

        cart[index].count--
        
        if(cart[index].count<=0){
            cart.splice(index,1)
        }

        localStorage.setItem("cart",JSON.stringify(cart))

        renderCart();
    }
})


order.addEventListener("click", (e) => {
    e.preventDefault();

    renderCart();
});



content.addEventListener("click", (e) => {
    if (e.target.closest(".cart-delete")) {

        const cartItem = e.target.closest(".cart");
        const index = cartItem.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart(); 
    }
});
})







