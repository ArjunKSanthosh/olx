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
router.route("/getsproduct/:_id").get(prod.getSProduct);
router.route("/getsproducts/:_id").get(prod.getSProducts);
router.route("/editproduct/:_id").put(prod.editProduct);
// router.route("/addwish").post(prod.addWish);
// router.route("/deletewlist/:id").delete(prod.deleteWish);

export default router;
