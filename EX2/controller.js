const url = require('url');
const handler = require('./handlers');
module.exports = (req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);

    const urlObject = url.parse(req.url, true, false);
    req.urlObject = urlObject;

    switch (req.method) {
        case 'GET':
            //get single (from keren)
            if (urlObject.path.startsWith('/getSingleOrder')) {
                handler.getSingleOrder(req, res);
            }

            //get all the orders
            if (urlObject.path.startsWith('/getAllOrders')&&urlObject.query.admin=='admin') {
                handler.getAllOrders(req, res);
            }
            //get all logs
            if (urlObject.path.startsWith('/getalllogs')&&urlObject.query.admin=='admin') {
                handler.getalllogs(req, res);
              }

         break;

         case 'POST':
             //add new order
            if(urlObject.path.startsWith('/insertNewOrder')){
                handler.insertNewOrder(req,res);
            }
            break;

         case 'DELETE':
                //delete new order
               if(urlObject.path.startsWith('/deleteorder')){
                   handler.deleteorder(req,res);
               }
               // delete All Orders
               if (urlObject.path.startsWith('/deleteAllOrders')&&urlObject.query.admin=='admin') {
                handler.deleteAllOrders(req, res);
              }
               
            break;

            case 'PUT':
                //add new order
               if(urlObject.path.startsWith('/updateorder')){
                   handler.updateorder(req,res);
               }
               break;

        default: 
         console.log("Re-enter an address")
         res.writeHeader(404);
         res.end("Re-enter an address");

            
    }
};
