
const value = localStorage.getItem("Auth");
async function getProducts() {

      const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        const result=await res.json();
        if(res.status==200){
            if(result.profile){
                document.getElementById("profileImage").src=result.profile;
                document.getElementById("proi").src=result.profile;

            }
            document.getElementById("next").innerHTML=`<a href="./pages/profile.html?id=${result.id}"><button>View or Edit Profile</button></a>`;
            // str=``;
            // result.products.map((product)=>{
            //     str=`
            //     <div class="product">
            //         <a href="">
            //             <img src="${product.pname}" alt="">
            //             <h2>Name</h2>
            //         </a>
            //     </div>
            //     `
            // })
            document.getElementById("products").innerHTML=str;
        }
        else{
            alert(result.msg);
            window.location.href="../pages/signin.html"
        }
    }

getProducts();
function profile() {
    document.getElementById("dropdown").innerHTML=`
    <div class="up">></div>
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