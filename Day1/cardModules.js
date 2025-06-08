let addToCart=()=>{
    return "Added to cart";
}
let changeQty=()=>{
    return "5";
}
let name='Anand'

// module.exports=addToCart;  // default export that means this module can be imported with same name.
// Named exports allow you to export multiple functions or variables from a module, which can then be imported with different names in other files.
module.exports={addToCart, changeQty,name}; // named export that means this module can be imported with different names.