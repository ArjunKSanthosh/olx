const value = localStorage.getItem("Auth");
let result; 
let buyerId;
let product;   
async function getProducts() {
    const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        result=await res.json();
       if(res.status==200){
            if(result.profile){
                document.getElementById("profileImage").src=result.profile;
                document.getElementById("proi").src=result.profile;
            }
            buyerId=result.id;
            document.getElementById("next").innerHTML=`<a href="./pages/profile.html?id=${result.id}"><button>View or Edit Profile</button></a>`;
            document.getElementById("sell").innerHTML=` <a href="./pages/addp.html?id=${result.id}">+ SELL</a>`;
            str=``;
            result.products1.map((product)=>{
                str+=`
               <div class="prod">
                   <a href="./pages/prodview.html?id=${product._id}">
                             <img src="${product.images[0]}" alt="image">
                            <h3 id="name">${product.pname}</h3>
                     <div class="content">
                          <div class="pr">
                              <h4 id="price">₹${product.price}</h4>
                              <h4  id="loc">${product.place}</h4>
                          </div> 
                          </a>
                          <div class="heart">
                                <img src="./img/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="" onclick="toggleHeart(this,'${product._id}')" id=${product._id}>
                          </div>  
                      </div>

             </div>`
        
                
            })
            document.getElementById("listprod").innerHTML=str;
        }
        else if(res.status==403){
            str=``;
            document.getElementById("sell").innerHTML=` <a href="./pages/signin.html?id=${result.id}">Login</a>`;
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
        result.products1.filter((i)=>i.pname.toLowerCase().includes(e.target.value.toLowerCase())).map((product)=>{
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
async function toggleHeart(heartElement,id) {
    
    const normalHeart = './img/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.png';
    const redHeart = './img/favorite_24dp_EA3323_FILL1_.png';
    if (heartElement.currentSrc.includes('favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.png')) {
        heartElement.src = redHeart;
    const res=await fetch(`http://localhost:3000/api/getsproduct/${id}`);
    const product=await res.json();
    console.log(product);
    fetch("http://localhost:3000/api/addwish",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({buyerId,product})
    }).then((res)=>{
        console.log(res);
        if(res.status==201){
            console.log(buyerId,product);
            alert("success")
            console.log(res);  
        }
        else if (res.status==404){
            alert("error")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
    }
     else {
        heartElement.src = normalHeart;
            fetch(`http://localhost:3000/api/deletewlist/${id}`,{
              method:"DELETE",
                  headers:{"Content-Type":"application/json"}
            }).then((res)=>{
                console.log(id);
                  console.log(res);
                  if(res.status==201){
                      alert("Deleted")
                      window.location.href="../index.html";
                  }else{
                      alert("error");
                      window.location.href="../index.html";
                  }
              }). catch ((error)=>{
                  console.log(error);
                  
              })
    }
    
}