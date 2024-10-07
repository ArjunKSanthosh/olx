
const value = localStorage.getItem("Auth");
async function getProducts() {

      const res=await fetch("http://localhost:3000/api/getproducts",{headers:{
        "Authorization" : `Bearer ${value}`}})
        const result=await res.json();
    if(res.status==200){
        console.log(result.username);
    }
    else{
        console.log(result.msg);
        
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