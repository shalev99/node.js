const { EventEmitter } = require('events');
const DataJson = require('./data/Orders.json');

 

class OrdersRepository extends EventEmitter {
    constructor(id,name,numoftickets,date) {
      super();
      this.id=id;
      this.name=name;
      this.Numberoftickets=numoftickets;
      this.date=date;
      this.Currentdate=date;
     
    }
   
    GetSingleOrder(id) {
      this.emit("SingleOrder", id); // Fire event
  
    }

    updateorder(id,name,numoftickets,Currentdate){

      this.emit("updateorder", id,name,numoftickets,Currentdate); // Fire event

    }

    Deleteorder(id){
      this.emit("Deleteorder", id); // Fire event
      
}
  }
  

  const OrdersRepo = (new OrdersRepository())
    .on('SingleOrder', data =>{
      console.log("in1");
      return DataJson[(data)-1];
     
  }); 

  OrdersRepo.on('Deleteorder', data =>{
   // console.log(numoforeder);

    delete DataJson[data-1];
  }); 

  OrdersRepo.on('updateorder', (id,name,numoftickets,Currentdate) =>{
     
      
      DataJson[(id)-1].Numberoftickets=numoftickets;
      DataJson[(id)-1].name=name;
      DataJson[(id)-1].Currentdate=Currentdate;
      

     
      return ;

     
   }); 


  module.exports = {OrdersRepo,OrdersRepository};
