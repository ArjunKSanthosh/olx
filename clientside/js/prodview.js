const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const value=localStorage.getItem("Auth")
const id=urlParams.get("id");
images=[];
let product;
async function getSProduct() {
    const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
    product=await res.json();
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
        document.getElementById("smallimg").appendChild(data)
        i++;
    })
 
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
async function book() {

    const currentDate = new Date();
    const date=String(currentDate.getDate()).padStart(2, '0')+"-"+String(currentDate.getMonth() + 1).padStart(2, '0')+"-"+currentDate.getFullYear();



        fetch("http://localhost:3000/api/setBooking",{
            method:"POST",
            headers:{"Content-Type":"application/json","Authorization" : `Bearer ${value}`},
            body:JSON.stringify({product,date})
        }).then(async (res)=>{
            const result= await res.json();
            if(res.status==201){
                alert(result.msg)
            }
            else if (res.status==403){
                alert(result.msg)
            }
            else{
                alert(result.msg)
            }
            
        }).catch((error)=>{
            console.log(error);
            
        });
}