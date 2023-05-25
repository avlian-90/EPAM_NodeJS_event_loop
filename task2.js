const fs = require("fs");

setTimeout(() => {
    console.log(1);
});

setTimeout(() => {
    console.log(2);

    process.nextTick(() => {
        console.log(3);
    });

    setImmediate(() => {
        console.log(4);
    });
});

setTimeout(() => {
    console.log(5);
});

setTimeout(() => {
    console.log(6);
    Promise.resolve(7).then((res) => {
        console.log(res);
    });
});

setTimeout(() => {
    console.log(8);
    fs.readFile(__filename, () => {
        console.log(9);
    });
});

/*The output will be:
    1
    2
    3 
    5
    6
    7
    8
    9
    4

    The callbacks of setTimeout functions go to the timer phase and event loop starts its work. So, first will be printed 1,
then 2, then the callback of process.nextTick will go to the nextTick phase and the event loop will go to run it and come back
again to the timer phase, so next will be printed 3, then the callback of setImmediate will go to the check phase and event loop 
continues to execute callbacks in timer phase, so next will be printed 5, then 6, then the callback of promise will go to the promise 
phase and event loop will go to execute it, so 7 will be printed the next, then it will turn back to the timer phase and 8 will be 
printed, and the callback of readFile will go to the I/O poll phase. So event loop will finish the work with timer phase and go to the 
I/O poll phase and execute the callback in it, so 9 will be printed, then will go to the check phase and 4 will be printed (I think so,
but the output was different, 4 was printed first, then 9 and I don't understand why.)) ). */
    