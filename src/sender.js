// const { ServiceBusClient } = require("@azure/service-bus");


// export async function sendDataToQueue(){
    
//     const serviceBusClient = new ServiceBusClient("Endpoint=sb://cbtservicebus.servicebus.windows.net/;SharedAccessKeyName=abc;SharedAccessKey=+KeGnjDopKtMoMIYguze5QP+lIFfZD9dh6u9CPbZfGc=;EntityPath=cbtqueue");
//     const sender = serviceBusClient.createSender("cbtqueue");
   
   
// 	// subscribe and specify the message and error handlers



//     try {
//         console.log("how many times");
//         await sender.sendMessages({
//         body: {
//             test:{
//                 abc:"abc"
//             }
//         }
//         });
//         await sender.close();
//     }
//     finally {
//         await serviceBusClient.close();
//     }
// }

export async function sendDataToQueue(){
    var AMQPClient = require('amqp10').Client,
    Promise = require('bluebird');

var client = new AMQPClient(); // Uses PolicyBase default policy
client.connect('amqp+ssl://b-637bf041-5cfd-4297-9992-49eb71f74397-1.mq.us-east-2.amazonaws.com:5671')
  .then(function() {
    return Promise.all([
      client.createReceiver('amq.topic'),
      client.createSender('amq.topic')
    ]);
  })
  .spread(function(receiver, sender) {
    receiver.on('errorReceived', function(err) { // check for errors });
    receiver.on('message', function(message) {
      console.log('Rx message: ', message.body);
    });

    return sender.send({ key: "Value" });
  })
})
  .error(function(err) {
    console.log("error: ", err);
  });

}

