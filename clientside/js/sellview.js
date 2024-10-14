const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
images=[];
async function getSProduct() {
    const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
    const product=await res.json();
    const res2=await fetch(`http://localhost:3000/api/getuser/${product.sellerId}`);
    
    const seller=await res2.json();
    images=product.images;
    document.getElementById("pname").innerText=product.pname;
    document.getElementById("category").innerText=`Category:${product.category.toUpperCase()}`;
    document.getElementById("price").textContent=`₹${product.price}`;
    document.getElementById("image").src=product.images[0];
    let i=0;
    product.images.map((image)=>{
        const data=document.createElement("img");
        data.src=image;
        data.setAttribute("onmouseover", `change("${image}")`);
        i++;
    })
    document.getElementById("buttons").innerHTML=`<a href="./prodedit.html?id=${id}"><button class="edit" id="edit">Edit</button></a>
                        <button class="delete">Delete</button>`
    document.getElementById("description").innerText=product.description;
    document.getElementById("owner").innerText=seller.username.toUpperCase();
    document.getElementById("phone").textContent=seller.phone;
    document.getElementById("mail").textContent=seller.email;
    document.getElementById("place").textContent=seller.place;
    console.log(seller.address);
    document.getElementById("address").textContent=seller.address;
    document.getElementById("pincode").textContent=seller.pincode;
    
}
getSProduct();
function change(a) {
    document.getElementById("image").src=a;
}