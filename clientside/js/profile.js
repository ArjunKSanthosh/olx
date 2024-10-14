const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`);
console.log(res);
    
    const user=await res.json();
    console.log(user);
    document.getElementById("sel").innerHTML=` <a href="./addp.html?id=${id}">+ SELL</a>`;

    if(user.profile)
        document.getElementById("profile").src=user.profile;    
    document.getElementById("username").textContent=user.username;
    document.getElementById("email").textContent=user.email;
    document.getElementById("place").textContent=user.place;
    document.getElementById("address").textContent=user.address;
    document.getElementById("pincode").textContent=user.pincode;
    document.getElementById("phone").textContent=user.phone;
    document.getElementById("edit").innerHTML=`<button ><a href="../pages/edit.html?id=${user._id}">Edit Profile</a></button>`
}
getUser();
function logout() {
    localStorage.removeItem("Auth");
    window.location.href="../pages/signin.html"
}
async function getProduct(){
    const res=await fetch(`http://localhost:3000/api/getproduct/${id}`);
    console.log(res);
    str=``;
    const products=await res.json();
    products.map((product)=>{
        str+=`
          <div class="prod">
          <a href="./sellview.html?id=${product._id}">
                    <img src="${product.images[0]}" alt="image">
                    <h4 id="price">₹${product.price}</h4>
                    <h3 id="name">${product.pname}</h3>
                    <h4  id="desc">${product.description}</h4>
                    <h4  id="loc">${product.place}</h4>
          </a>
          </div>
        `
    })
    document.getElementById("right1").innerHTML=str;
    
}
getProduct()
function logout() {
    localStorage.removeItem("Auth");
    window.location.href="../pages/signin.html"
}