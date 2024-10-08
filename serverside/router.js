import { Router } from "express";
import * as prod from "./requesthandler.js";
import Auth from './middleware/Auth.js'


const router=Router();

router.route("/getproducts").get(Auth,prod.getProducts)
router.route("/signup").post(prod.signUp) 
router.route("/signin").post(prod.signIn)
router.route("/getuser/:id").get(prod.getUser)
router.route("/addproduct").post(prod.addProduct);
router.route("/edituser/:id").put(prod.editUser)
router.route("/getproduct/:id").get(prod.getProduct)





export default router;
