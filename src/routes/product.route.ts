import { Router } from "express";
import { getAllProducts, getProduct,addCompleteProduct,addProduct, updateProduct, addImages,addVariants,addOptions, addPresentmentPrices, updateVariant, updateOption,updateImage, updatePresentmentPrice, deleteVariant, deletePresentmentPrice, deleteImage, deleteOption, deleteProduct} from "../services/product.service";

const route=Router();

route.post("/add/completeproduct",addCompleteProduct);
route.post("/add/product",addProduct);
route.post("/add/images",addImages);
route.post("/add/variants",addVariants);
route.post("/add/options",addOptions);
route.post("/add/presentmentprices",addPresentmentPrices);

route.get("/all",getAllProducts);
route.get("/product/:id",getProduct);

route.put("/updateproduct/:id",updateProduct);
route.put("/updatevariant/:id",updateVariant);
route.put("/updateoption/:id",updateOption);
route.put("/updateimage/:id",updateImage);
route.put("/updatepresentmentprice/:id",updatePresentmentPrice);

route.delete("/deleteproduct/:id",deleteProduct);
route.delete("/deletevariant/:id",deleteVariant);
route.delete("/deletepresentmentprice/:id",deletePresentmentPrice);
route.delete("/deleteimage/:id",deleteImage);
route.delete("/deleteoption/:id",deleteOption);

export default route;
