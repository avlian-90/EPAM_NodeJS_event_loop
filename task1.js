const fs = require("fs");

fs.readFile(__filename, () => {
    console.log("1");
    setImmediate(() => console.log("2"));
    process.nextTick(() => console.log("3"));
    Promise.resolve().then(() => console.log("4"));
});

process.nextTick(() => console.log("5"));
Promise.resolve().then(() => console.log("6"));
setTimeout(() => console.log("7"));

for(let i = 0; i < 2000000000; i++) {}


/* The output will be:
    5
    6
    7
    1
    3
    4
    2

    As we have a for loop, we can be sure that the callback function of setTimeout will already be in Timer phase 
when event loop starts its work. Now lets describe the work of event loop. 
    The first will be executed the callbacks of process.nextTick and promise, as they are in phases of microtask queue, 
which has higher priority than macrotask queue, and first of them will be executed the callback of process.nextTick, 
then the callback of promise, as nextTick queue has higher priority than promise queue. So 5 and 6 will be printed to the console. 
Then the callback of readFile will be executed, which is in the I/O polling phase of macrotask queue. In that callback we have 
4 functions (lines 4-7). They will go to their corresponding queues (call stack, check queue, nextTick queue and promise queue) 
and will be executed according to their priorities (call stack, nextTick, promise and check), so in the console we will see 1, 3, 4, 2. 
    And so the final output will be 5, 6, 7, 1, 3, 4, 2. */

