const Orders = require('./OrdersRepository');
const resvs=require('./data/Orders.json');
const { parse } = require('querystring');

let numberoforder=0;
let logs=[];
let currLog="";
let idOfOrder=0;
//let name="";
let ticksForSale=10;



//getalllogs

const getalllogs=(req,res)=>{
      
  currLog="get all logs";
  logs.push(currLog);
  res.writeHeader(200);
  console.log(currLog);
  res.end(JSON.stringify(logs));
};



//updateorder

const updateorder=(req,res)=>{
      
  currLog="update order start";
  logs.push(currLog);
  console.log(currLog);
  res.writeHeader(200);

  const { id } = req.urlObject.query;
  const { numoticks } = req.urlObject.query;
  const { name } = req.urlObject.query;
  const { Currentdate } = req.urlObject.query;




  // check if we can update 
  if (!Number.isNaN(id)&&numberoforder>=id){
    //let count2=0;


   

    // return  ticks from old order !!
   // ticksForSale= ticksForSale + resvs[(id)-1].Numberoftickets;


    if(ticksForSale>=numoticks){
        
      ticksForSale=ticksForSale-numoticks;
     }
     else{
      console.log('not have ticks!!!\n');
      logs.push("not have ticks!!!");
      res.writeHeader(404);
      res.end(' not have ticks!!!');
      return;
    }

    Orders.OrdersRepo.updateorder(id,name,numoticks,Currentdate);


    console.log("update order ");
  }
   else{
    console.log("NOT FOUND ID ");
    res.writeHeader(404);
    logs.push("NOT FOUND ID ");
    res.end("NOT FOUND ID");
   }


  res.end("update order");
  


};


//delete All Orders

const deleteAllOrders = (req, res) => {
 

  currLog="delete All Orders";
  logs.push(currLog);
  console.log(currLog);
  res.writeHeader(200);
  
 // console.log(numberoforder);

  if(!(resvs.toString()==""))
  {
    let count=25
     while(count>0){

      Orders.OrdersRepo.Deleteorder(count);
      res.end(' delete all ');
      numberoforder=numberoforder-1;
      count=count-1;
    }
     
  }
  else{
    res.writeHeader(404);
   res.end(' Already empty ');
   console.log("Already empty");

  }  

 // console.log(numberoforder);

  numberoforder=0;
  ticksForSale=10;

};

// delete single order
const deleteorder = (req, res) => {
  const { id } = req.urlObject.query;

  currLog="delete order start";
  logs.push(currLog);
  console.log(currLog);
  res.writeHeader(200);

  // console.log(numberoforder);

  if (!Number.isNaN(id)&&numberoforder>=id) {
    Orders.OrdersRepo.Deleteorder(id);
    res.end(' Delete order success ');
    numberoforder=numberoforder-1;
  //  console.log(numberoforder);
  } else {
    res.end(' no oreder to delete ');
    res.writeHeader(404);
    console.log("no oreder to delete");
    
  }
};


//get all orders
const getAllOrders = (req, res) => {
 
  if(!(resvs.toString()==""))
    {
        currLog="get All Orders";
        logs.push(currLog);
        console.log(currLog);
        res.writeHeader(200);
        res.end(JSON.stringify(resvs));
    }
    else{
        console.log('no orders ');
        res.writeHeader(404);
        res.end(' no orders ');
    }
};


// get single order

const getSingleOrder = (req, res) => {
  const { id } = req.urlObject.query;

  if (!Number.isNaN(id)) {
    
    const Order =  Orders.OrdersRepo.GetSingleOrder(id);
    console.log("GetSingleOrder start");
    if (Order) {
      res.writeHeader(200);
      res.end(JSON.stringify(Order));
      console.log("in4");
    } else {
      logs.push("song not found");
      console.log("song not found");
    }
  } else {
    
    logs.push("id is isNaN");
    console.log("id is isNaN");
  }
};

//add new order

const insertNewOrder=(req,res)=>{
        
  res.writeHeader(200);
  currLog="add new order";
  logs.push(currLog);
  console.log(currLog);

      
     // const newData=parse(body);
      
      //numoticks=newData.numoticks;
    

      const { numoticks } = req.urlObject.query;
      //console.log(numoticks);
     // console.log(ticksForSale);

      if(ticksForSale>=numoticks){
        
        ticksForSale=ticksForSale-numoticks;
    }
    else{
        console.log('sold out!!!!!!!!\n');
        res.writeHeader(404);
        res.end(' sold out!!!!!!!!');
        return;
    }
    const { date } = req.urlObject.query;
  //name=newData.name;
  
  const { name } = req.urlObject.query;
 //id start from 0
 // date=newData.date;
  const order=new Orders.OrdersRepository(idOfOrder,name,numoticks,date);
  idOfOrder++;
  resvs.push(order);
  res.end(' Order successfully added');
  numberoforder=numberoforder+1;
  
 // console.log(numberoforder);

 // console.log(ticksForSale);
  

};

module.exports = {
  getSingleOrder,getAllOrders,insertNewOrder,deleteorder,deleteAllOrders,updateorder,getalllogs
};
