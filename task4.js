const fs = require("fs");

fs.readFile(__filename, () => {
  console.log(0);
});

setImmediate(() => {
  console.log(1);
});
setImmediate(() => {
  console.log(2);
});
setImmediate(() => {
  console.log(3);
});
setImmediate(() => {
  console.log(4);
  Promise.resolve(5).then((res) => {
    console.log(res);
  });
});

setImmediate(() => {
  console.log(6);
});
setImmediate(() => {
  console.log(7);
});
setImmediate(() => {
  console.log(8);
});

setTimeout(() => {
  console.log(9);
}, 1000);

/* The output will be: 

    1
    2
    3
    4
    5
    6
    7
    8
    0
    9 
    
    As setTimeout has a delay of 1000ms, setImmediate callbacks will go to the check phase earlier and also will be 
executed earlier. So 1, 2, 3, 4 will be printed, then event loop will go to the promise phase, execute its callback
and turn back, so 5, 6, 7, 8 will be printed next, then I think we can't be sure, 0 and 9 will be printed or 9 and 0. 
It depends on time needed for reading the file. As it is supposed to be less than 1000ms, 0 is printed and after 9. */
    