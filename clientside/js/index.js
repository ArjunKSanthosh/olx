const value = localStorage.getItem("Auth");
async function getProducts() {
let result;    
    const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        result=await res.json();
        console.log(res.status);
        if(res.status==200){
            if(result.profile){
                document.getElementById("profileImage").src=result.profile;
                document.getElementById("proi").src=result.profile;
            }
            document.getElementById("next").innerHTML=`<a href="./pages/profile.html?id=${result.id}"><button>View or Edit Profile</button></a>`;
            document.getElementById("sell").innerHTML=` <a href="./pages/addp.html?id=${result.id}">+ SELL</a>`;
            str=``;
            result.products1.map((product)=>{
                str+=`
               <div class="prod">
               <a href="./pages/prodview.html?id=${product._id}">
                    <img src="${product.images[0]}" alt="image">
                    <h3 id="name">${product.pname}</h3>
                    <h4 id="price">₹${product.price}</h4>
                    <h4  id="loc">${product.place}</h4>
                    

    </a>
            </div>
        
                `
            })
            document.getElementById("listprod").innerHTML=str;
        }
        else if(res.status==403){
            str=``;
            result.products.map((product)=>{
                str+=`
               <div class="prod">
               <a href="./pages/prodview.html?id=${product._id}">
                    <img src="${product.images[0]}" alt="image">
                    <h3 id="name">${product.pname}</h3>
                    <h4 id="price">₹${product.price}</h4>
                    <h4  id="loc">${product.place}</h4>
                    

    </a>
            </div>
        
                `
            })
            document.getElementById("listprod").innerHTML=str;
        }
    }

getProducts();
function profile() {
    document.getElementById("dropdown").innerHTML=`
    <div class="up"></div>
    <div class="down">
                <div class="image">
                    <img src="" alt="">
                </div>
                <div class="buttons">
                    <h3>Name</h3>
                    <button>View Profile</button>
                    <button>Logout</button>
                </div>
            </div>
    `;
}
const profileImage=document.getElementById("profileImage")
const dropdownMenu=document.getElementById("dropdownMenu")

profileImage.addEventListener("click" ,()=>{
    dropdownMenu.style.display=dropdownMenu.style.display === 'block' ? 'none' : 'block';

 });

 window.addEventListener('click', (event)=>{
    if(!profileImage.contains(event.target)&&!dropdownMenu.contains(event.target)){
        dropdownMenu.style.display='none';
    }
 });
 function logOut(){
    localStorage.removeItem("Auth")
    window.location.href="./index.html"
 }
document.getElementById("filter").addEventListener('keyup',async(e)=>{
    try{
        str=``;
        result.products.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
            str+=`
            <div class="prod">
            <a href="./pages/prodview.html?id=${product._id}">
                 <img src="${product.images[0]}" alt="image">
                 <h3 id="name">${product.pname}</h3>
                 <h4 id="price">₹${product.price}</h4>
                 <h4  id="loc">${product.place}</h4>
                 

 </a>
         </div>
     
             `
        })
        document.getElementById("listprod").innerHTML=str;
    }
    catch(error){
            console.log(error);
            
    }
})