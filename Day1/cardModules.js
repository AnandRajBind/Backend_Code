let addToCart=()=>{
    return "Added to cart";
}
let changeQty=()=>{
    return "5";
}
let name='Anand'



// ****************************************default export *************************************************************
//  1 file me only one default export is present.
// module.exports=addToCart;  // default export that means this module can be imported with same name.


// ****************************************named export *************************************************************

// Named exports allow you to export multiple functions or variables from a module, which can then be imported with different names in other files.and also calling in the {}.
module.exports={addToCart, changeQty,name}; // named export that means this module can be imported with different names.


console.log("Anand raj Bind");
 