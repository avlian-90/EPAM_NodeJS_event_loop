const fs = require("fs");

console.log(1);
setTimeout(() => console.log("2"));
setImmediate(() => console.log("3"));
process.nextTick(() => console.log("4"));
fs.readFile(__filename, () => {
  console.log(2);
  setTimeout(() => console.log("5"));
  setImmediate(() => console.log("6"));
  process.nextTick(() => console.log("7"));
});

setTimeout(() => console.log("8"));
setImmediate(() => {
  console.log("9");
  process.nextTick(() => console.log("11"));
});
setImmediate(() => {
  console.log("12");
});
process.nextTick(() => console.log("10"));

/* The output will be:

    1
    4
    10
    2
    8
    3
    9
    11
    12
    2
    7
    6
    5

    First will be executed the synchronous operation and 1 will be printed to the console. Then the callbacks will go
to the corresponding queues and event loop will start its work. Because of higher priority first will be executed the
callbacks of process.nextTick functions, so 4 and 10 will be printed next. Then comes the turn of setTimeout callbacks, 
so 2 and 8 will be printed next, then setImmediate callbacks will be executed, because reading file needs time, so 3 and 9
will be printed, and after will be printed 11 because a callback appears in nextTick phase. Then event loop will turn back 
to the check phase and 12 will be printed. At last the callback of readFile will be executed. 2 will be printed, then 7 because 
of nextTick's higher priority, then 6 and after 5, because setImmediate callback appears in phase earlier than setTimeout callback. */ 