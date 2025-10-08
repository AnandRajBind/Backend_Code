// Create node server 
//require method ka use karke data ko ak modules se dushre modules me send karte hai.
let http=require("http");
// http inbuilt packege hai jo ki node js install karte time hi install ho jata hai.

let server=http.createServer((req, res)=>{

if(req.url=="/"){
    res.end("Welcome to Home Page"); // end() method ka use karke response ko end karte hai aur client ko data bhejte hai.
}
if(req.url=="/news"){
    let obj={
        status: "success",
        data: [
        {newTitle: "Aaj Tak",
        newDescription: "Aaj Tak is a Hindi-language news channel in India."},
        {newTitle: "BBC News",
        newDescription: "BBC News is the news and current affairs division of the British Broadcasting Corporation in the United Kingdom."},
        ]
    }   
    res.end(JSON.stringify(obj)); // JSON.stringify() method ka use karke object ko string me convert karte hai aur client ko bhejte hai.
}
if(req.url=="/about"){
    res.end("Welcome to About Page");
}
})
server.listen("8000")// http://localhost:8000  listen method ka use karke server ko start karte hai aur port number 8000 par listen karte hai.
