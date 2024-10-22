import userSchema from './models/user.model.js'
import productSchema from './models/product.model.js'
import listSchema  from './models/wishlist.model.js'
import bookingSchema from "./models/book.model.js"
import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port:2525,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "378a61f3f1ec93",
      pass: "3dffcf6d10e7ac",
    },
  });

const {sign}=pkg;


//....................................To get details of products without and with sigin ................................................... 

export async function getProducts(req,res) {
    try {
        const products=await productSchema.find();
        if(req.user!==null) {
            const _id = req.user.userId;
            const user = await userSchema.findOne({_id});
            const products1=await productSchema.find({sellerId:{$ne:_id}});
            // const wlist=await listSchema.find({buyerId:_id});
            return res.status(200).send({products1,profile:user.profile,id:_id})
        }
        else{
            return res.status(403).send({products,msg:"Login for better user experience"})
        }

        
    } catch (error) {
        res.status(404).send({msg:error})
    }
}


//..............................To get user deatails................................................

export async function getUser(req,res) {
    try {
        const {id}=req.params;
        const data=await userSchema.findOne({_id:id});
        res.status(200).send(data);  
    } catch (error) {
        res.status(404).send(error)
    }
}

//..................................to edit user details..................................................

export async function editUser(req,res) {
    try {
        const {id}=req.params;
        const{...user}=req.body
        console.log(user);
        
        const data=await userSchema.updateOne({_id:id},{$set:{...user}});
        res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error)
    }
}
//................................................to signup.....................................

export async function signUp(req,res) {
    try{
        const {email,username,password,cpassword,place,profile,address,phone,pincode} = req.body;
        console.log(email,username,password,cpassword);
        if(!(email&& username&& password&& cpassword))
            return res.status(404).send({msg:"fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"password not matching"})
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            console.log(hashedPassword);
            userSchema
            .create({email,username,password:hashedPassword,place,profile,address,phone,pincode})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"not registered"})

            })
        })
    }
     catch(error){
        return res.status(404).send({msg:error})

    }
    
}
//........................Function for signin...................................

export async function signIn(req,res) {
    console.log(req.body);
    const{email,password}=req.body;
    if(!(email&& password))
        return res.status(404).send({msg:"fields are empty"});
    const user=await userSchema.findOne({email});
    console.log(user);
    if(user===null){
        return res.status(404).send({msg:"Invalid username"});
    }
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"});

    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"successfully logged in",token})
}

//...........................To add a product......................................................................

export async function addProduct(req,res){
    try {
        const {pname,price,category,description,sellerId,place,images,address,phone,pincode} = req.body;
        if(!(pname&&price&&category&&description&&sellerId&&place&&images&&address&&phone&&pincode))
            return res.status(404).send({msg:"fields are empty"})
        productSchema
            .create({pname,price,category,description,sellerId,place,images,address,phone,pincode})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"product not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

//....................... to get the product of a specific seller.To get product details of a specific seller in profile..............

export async function getProduct(req,res){
    try {
        const {id}=req.params;
        const products=await productSchema.find({sellerId:id});
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send(error)
    }
}
//To  get the product details of a specific product for seller

export async function getSProduct(req,res) {
    try {
        const {_id}=req.params;
        const product=await productSchema.findOne({_id});
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send(error)
    }
}
export async function getSProducts(req,res) {
    try {
        const {_id}=req.params;
        const product=await productSchema.findOne({_id});
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send(error)
    }
}

//.......................................To edit a product.....................................................

export async function editProduct(req,res) {
    try {
        const {_id}=req.params;
    const {...product}=req.body;
    const data=await productSchema.updateOne({_id},{$set:{...product}});
    res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error);
    }
}

//.....................................To add wishlist.............................................................

export async function addWish(req,res){
    try {
        const {...wishlist}=req.body;
        console.log(wishlist);
        

        listSchema
            .create({...wishlist})
            .then(()=>{
                console.log("success");
                
                return res.status(201).send({msg:"success"})
            })
            .catch((error)=>{
                return res.status(404).send({msg:"List not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}


//........................................to remove product from  the wishlist.........................

export async function deleteWish(req,res){
    try {
        const{id}=req.params;
        const result=await listSchema.deleteOne({"product._id":id})
        console.log(result);
        return res.status(201).send({msg:"deleted"});
    }
    catch(error){
        return res.status(404).send(error);
    }
}
//............................Function for forget password......................................................

export async function forgetPassword(req,res) {
    const {email}=req.body;
//     console.log(email);
    
    const user=await userSchema.findOne({email})
    if(!user)
        return res.status(403).send({msg:"User doesn't exist"})
    const otp=Math.floor(Math.random()*1000000);
    const update=await userSchema.updateOne({email},{$set:{otp:otp}})
    console.log(update);
     // send mail with defined transport object
    const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>${otp}</h1>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  return res.status(201).send({email});
}
//.........................Function for match otp.............................................................

export async function otpCheck(req,res){
    const{email,otp}=req.body;
    
    const check=await userSchema.findOne({$and:[{email:email},{otp:otp}]})
    if(!check)
        return res.status(403).send({msg:"OTP does not match"})
    return res.status(201).send({msg:"OTP matched succesfully"})
}

//.......................Function for reset password..............................................................

export async function resetPassword(req,res){
    const{email,password}=req.body;
    const update=await userSchema.updateOne({email},{$set:{otp:""}});
    bcrypt.hash(password,10).then((hashedPassword)=>{
     userSchema.updateOne({email},{$set:{password:hashedPassword}}).then(()=>{
        return res.status(200).send({msg:"Success"})
     }).catch((error)=>{
        return res.status(404).send({msg:error});
     })
    }).catch((error)=>{
        return res.status(404).send({msg:error});
    })
}
export async function booking(req,res) {
    
    
    try {
        if (req.user!==null) {
            const _id = req.user.userId;
            const {product,date} = req.body;
            
            const buyer=await userSchema.findOne({_id},{username:1,place:1,phone:1});
        

            bookingSchema.create({sellerId:product.sellerId,buyerId:_id,date,buyer,product})
            .then(()=>{
                return res.status(201).send({msg:"Booking Successfull"});
            })
            .catch((error)=>{
                return res.status(404).send({msg:"product not added"});
            })
        }else{
            return res.status(403).send({products,msg:"Something went wrong"});
        }   
    } catch (error) {
        res.status(404).send({msg:"error"});
    }
}