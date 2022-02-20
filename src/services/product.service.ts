
import { RequestHandler} from "express";
import client from "../utils/db";

export const addCompleteProduct: RequestHandler= async(req,res)=>{

  try{

    const {rows:insertedProduct} = await client.query("INSERT INTO public.product(title, body_html, vendor, product_type, handle, template_suffix, status, published_scope, tags, admin_graphql_api_id, created_at, published_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) returning id",
    [req.body.title, req.body.body_html, req.body.vendor, req.body.product_type, req.body.handle, req.body.template_suffix, req.body.status, req.body.published_scope, req.body.tags, req.body.admin_graphql_api_id]);

    if(!insertedProduct) return res.status(500).send({
      "message":"error inserting product data"
    });
    var productID = insertedProduct[0].id;

    for(let option of req.body.options ){

     await client.query("INSERT INTO public.option(product_id ,name ,position ,values ,created_at) VALUES($1, $2, $3, $4, NOW()) ", [productID, option.name, option.position, option.values]);

    }

    for(let image of req.body.images ){

     await client.query("INSERT INTO public.image(product_id,position,alt,width,height,src,admin_graphql_api_id,created_at) VALUES($1, $2, $3, $4, $5, $6, $7, NOW()) ", [productID, image.position ,image.alt ,image.width ,image.height ,image.src ,image.admin_graphql_api_id]);

    };

    for(let variant of req.body.variants){

     let {rows:variantRows}=await client.query("INSERT INTO public.variant(title,price,sku,position,inventory_policy,compare_at_price,fulfillment_service,inventory_management,option1,option2,option3,taxable,barcode,grams,weight,weight_unit,inventory_item_id,inventory_quantity,old_inventory_quantity,requires_shipping,admin_graphql_api_id,product_id,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, NOW()) returning id", [variant.title, variant.price, variant.sku, variant.position, variant.inventory_policy, variant.compare_at_price, variant.fulfillment_service, variant.inventory_management, variant.option1, variant.option2, variant.option3, variant.taxable, variant.barcode, variant.grams, variant.weight, variant.weight_unit, variant.inventory_item_id, variant.inventory_quantity, variant.old_inventory_quantity, variant.requires_shipping, variant.admin_graphql_api_id, productID]);


     let variantId= variantRows[0].id; 

     for(let presentment_price of variant.presentment_prices){
        await client.query("INSERT INTO public.presentment_price(variant_id,amount,currency_code,compare_at_price,created_at) VALUES($1,$2,$3,$4, NOW()) ", [variantId,presentment_price.price.amount,presentment_price.price.currency_code,presentment_price.compare_at_price ]);

      };

    };

    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send(err);
    console.log(err);
  }

}

export const addProduct: RequestHandler= async(req,res)=>{

  try{

    await client.query("INSERT INTO public.product(title, body_html, vendor, product_type, handle, template_suffix, status, published_scope, tags, admin_graphql_api_id, created_at, published_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) ",
    [req.body.title, req.body.body_html, req.body.vendor, req.body.product_type, req.body.handle, req.body.template_suffix, req.body.status, req.body.published_scope, req.body.tags, req.body.admin_graphql_api_id]);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error inserting product data",
      "Error":err
    });
    console.log(err);
  }

}

export const addImages: RequestHandler= async(req,res)=>{

  try{

    for(let image of req.body.images){

      await client.query("INSERT INTO public.image(product_id,position,alt,width,height,src,admin_graphql_api_id,created_at) VALUES($1, $2, $3, $4, $5, $6, $7, NOW()) ", [image.product_id, image.position ,image.alt ,image.width ,image.height ,image.src ,image.admin_graphql_api_id]);

    }  

    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error inserting image data",
      "Error":err
    });
    console.log(err);
  }

}


export const addVariants: RequestHandler= async(req,res)=>{

  try{

    for(let variant of req.body.variants){

      await client.query("INSERT INTO public.variant(title,price,sku,position,inventory_policy,compare_at_price,fulfillment_service,inventory_management,option1,option2,option3,taxable,barcode,grams,weight,weight_unit,inventory_item_id,inventory_quantity,old_inventory_quantity,requires_shipping,admin_graphql_api_id,product_id, image_id,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23, NOW()) returning id", [variant.title, variant.price, variant.sku, variant.position, variant.inventory_policy, variant.compare_at_price, variant.fulfillment_service, variant.inventory_management, variant.option1, variant.option2, variant.option3, variant.taxable, variant.barcode, variant.grams, variant.weight, variant.weight_unit, variant.inventory_item_id, variant.inventory_quantity, variant.old_inventory_quantity, variant.requires_shipping, variant.admin_graphql_api_id, variant.product_id, variant.image_id]);

    }

    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error inserting variants",
      "Error":err
    });
    console.log(err);

  }

}

export const addOptions: RequestHandler= async(req,res)=>{

  try{

    for(let option of req.body.options){

     await client.query("INSERT INTO public.option(product_id ,name ,position ,values ,created_at) VALUES($1, $2, $3, $4, NOW()) ", [option.product_id, option.name, option.position, option.values]);

    }

    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error inserting options",
      "Error":err
    });
    console.log(err);

  }

}

export const addPresentmentPrices: RequestHandler= async(req,res)=>{

  try{

    for(let presentmentPrice of req.body.presentmentPrices){

     await client.query("INSERT INTO public.presentment_price(variant_id, amount ,currency_code ,compare_at_price ,created_at) VALUES($1, $2, $3, $4, NOW()) ", [presentmentPrice.variant_id,  presentmentPrice.amount, presentmentPrice.currency_code, presentmentPrice.compare_at_price]);

    }

    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error inserting presentment prices",
      "Error":err
    });
    console.log(err);
  }

}

/////////////////////////////READ////////////////////////////////

export const getAllProducts: RequestHandler= async(req,res)=>{
  let output:any[] = [];
  try{

    const {rows: productRows} = await client.query("SELECT * FROM public.product");

    for(let productRow of productRows){
      const {rows: optionRows} = await client.query("SELECT * FROM public.option WHERE product_id=$1",[productRow.id]);
      productRow["options"] = optionRows;
      const {rows: imageRows} = await client.query("SELECT * FROM public.image WHERE product_id=$1",[productRow.id]);
      productRow["images"] = imageRows;
      productRow["image"] = imageRows[0];
      
      const {rows: variantRows} = await client.query("SELECT * FROM public.variant WHERE product_id=$1",[productRow.id]);
      productRow["variants"] = [];
      
      for(let variant of variantRows){
        const {rows: presentmentPriceRows} = await client.query("SELECT * FROM public.presentment_price WHERE variant_id=$1",[variant.id]);
        variant["presentment_prices"] = presentmentPriceRows;
        productRow["variants"].push(variant);
      }
      
      output.push(productRow);
    }

    res.send({
      "message":"success",
      "result_count":output.length,
      "result": output
    });
    
  }
  catch(err){
    res.status(500).send({
      "message":"error getting product data",
      "Error":err
    });
    console.log(err);
  }

}

export const getProduct: RequestHandler= async(req,res)=>{
  try{

    const {rows: productRow} = await client.query("SELECT * FROM public.product WHERE id=$1", [req.params.id]);
    const {rows: optionRows} = await client.query("SELECT * FROM public.option WHERE product_id=$1",[productRow[0].id]);
    productRow[0]["options"] = optionRows;
    const {rows: imageRows} = await client.query("SELECT * FROM public.image WHERE product_id=$1",[productRow[0].id]);
    productRow[0]["images"] = imageRows;
    productRow[0]["image"] = imageRows[0];
    
    const {rows: variantRows} = await client.query("SELECT * FROM public.variant WHERE product_id=$1",[productRow[0].id]);
    productRow[0]["variants"] = [];

    for(let variant of variantRows){
      const {rows: presentmentPriceRows} = await client.query("SELECT * FROM public.presentment_price WHERE variant_id=$1",[variant.id]);
      variant["presentment_prices"] = presentmentPriceRows;
      productRow[0]["variants"].push(variant);
    };

    res.send({
    "message":"success",
    "result": productRow[0]
    });
    
  }
  catch(err){
    res.status(500).send({
      "message":"error getting product data",
      "Error":err
    });
    console.log(err);
  }

}

//////////////////////////////UPDATE/////////////////////////////

export const updateProduct: RequestHandler= async(req,res)=>{
 
  try{

    for(let field of req.body.fields){
      let query = `UPDATE public.product SET ${field.key}=$1, updated_at=NOW() WHERE id=$2`
      await client.query(query,[field.value, req.params.id]);
    
    }
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error updating product data",
      "Error":err
    });
    console.log(err);
  }

}

export const updateVariant: RequestHandler= async(req,res)=>{
 
  try{

    for(let field of req.body.fields){
      let query = `UPDATE public.variant SET ${field.key}=$1, updated_at=NOW() WHERE id=$2`
      await client.query(query,[field.value, req.params.id]);
    
    }
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error updating variant data",
      "Error":err
    });
    console.log(err);
  }

}

export const updateOption: RequestHandler= async(req,res)=>{
 
  try{

    for(let field of req.body.fields){
      let query = `UPDATE public.option SET ${field.key}=$1, updated_at=NOW() WHERE id=$2`
      await client.query(query,[field.value, req.params.id]);
    
    }
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error updating options data",
      "Error":err
    });
    console.log(err);
  }

}

export const updateImage: RequestHandler= async(req,res)=>{
 
  try{

    for(let field of req.body.fields){
      let query = `UPDATE public.image SET ${field.key}=$1, updated_at=NOW() WHERE id=$2`
      await client.query(query,[field.value, req.params.id]);
    
    }
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error updating image data",
      "Error":err
    });
    console.log(err);
  }

}

export const updatePresentmentPrice: RequestHandler= async(req,res)=>{
 
  try{

    for(let field of req.body.fields){
      let query = `UPDATE public.presentment_price SET ${field.key}=$1, updated_at=NOW() WHERE id=$2`
      await client.query(query,[field.value, req.params.id]);
    
    }
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error updating presentment_price data",
      "Error":err
    });
    console.log(err);
  }

}

//////////////////////////////DELETE/////////////////////////////

export const deleteVariant: RequestHandler= async(req,res)=>{
 
  try{

    await client.query(`DELETE FROM public.variant WHERE id=${req.params.id}`);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error deleting variant data",
      "Error":err
    });
    console.log(err);
  }

}

export const deletePresentmentPrice: RequestHandler= async(req,res)=>{
 
  try{

    await client.query(`DELETE FROM public.presentment_price WHERE id=${req.params.id}`);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error deleting presentment_price data",
      "Error":err
    });
    console.log(err);
  }

}

export const deleteImage: RequestHandler= async(req,res)=>{
 
  try{

    await client.query(`DELETE FROM public.image WHERE id=${req.params.id}`);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error deleting image data",
      "Error":err
    });
    console.log(err);
  }

}

export const deleteOption: RequestHandler= async(req,res)=>{
 
  try{

    await client.query(`DELETE FROM public.option WHERE id=${req.params.id}`);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error deleting option data",
      "Error":err
    });
    console.log(err);
  }

}

export const deleteProduct: RequestHandler= async(req,res)=>{
 
  try{

    await client.query(`DELETE FROM public.product WHERE id=${req.params.id}`);
    
    res.send({
      "message":"success"
    });

  }
  catch(err){
    res.status(500).send({
      "message":"error deleting product data",
      "Error":err
    });
    console.log(err);
  }

}