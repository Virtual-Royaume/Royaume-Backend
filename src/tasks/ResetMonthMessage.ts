import memberCollection from "../database/collections/Member.js";

setInterval(() => {
  const date = new Date();
  
  if(date.getDate() === 1 && date.getHours() === 0 && date.getMinutes() === 0){
    memberCollection.updateMany({}, { $set: { "activity.messages.monthCount": 0 } });
  }
}, 60_000);