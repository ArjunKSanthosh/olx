const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let picture;
async function editUser(){
    const res=await fetch(`http://localhost:3000/api/edituser/${id}`);
    const user= await res.json()
    document.getElementById("edit").innerHTML=`
    <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}" >
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username"  value="${user.username}">
            </div>
            <div class="form-group">
                <label for="place">Place:</label>
                <input type="text" id="place" name="place"  value="${user.place}" >
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address">"${user.address}"</textarea>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value="${user.phone}" >
            </div>
            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="text" id="pincode" name="pincode" value="${user.pincode}"  >
            </div>
            <div class="form-group">
                <label for="profile">Profile Image:</label>
                <input type="file" id="profile" name="profile" accept="image/*"  onchange="pic()" >
            </div>
            <div id="pro">
                    <img src="${user.profile}" alt="" id="pic4">

            </div>
              <button type="submit">Register</button>
    `
}
editUser()

document.getElementById("edit").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const username=document.getElementById("username").value;
        const email=document.getElementById("email").value;
        const place=document.getElementById("place").value;
        const address=document.getElementById("address").value;
        const phone=document.getElementById("phone").value;
        const pincode=document.getElementById("pincode").value;
    const res=await fetch(`http://localhost:3000/api/edituser/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,username,place,profile,address,phone,pincode})
    })
    if(res.status==201){
        alert("Updated")
        window.location.href="../pages/profile.html"
    }else{
        alert("error")
    }
    } catch (error) {
        console.log(error);
        
    }
})
async function pic(){
    console.log(document.getElementById("profile").files[0]);
    picture=await convertToBase64(document.getElementById("profile").files[0]);
    document.getElementById("pic4").src=picture;
}
function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);   
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
}