/*
 * Homework #14: Callbacks and Promises
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 */

/*
 * Create two different scripts. One will contain the callback-centered code, and the other the promises-centered code.
 * The two scripts should contain the same functionality, and solve the same problems.
 * 
 * Each script should expose a function that accepts one argument: an integer between 1 and 1000 called "num".
 * When that function is called, the following steps should happen for "num" in order:
 * 
 * 1. Calculate the square of num and log it to the console
 * 2. Wait "num" milliseconds
 * 3. Calculate the square root of num and log it to the console
 * 4. Determine the prime-number that is closest to num without being greater than or equal to num, and then log it to the console
 * 5. Count the total elapsed time from when the original function was called until the last step was completed, and log that to
 *    the console as well.
 */


// Callbacks 


function isPrimeNumber(n) {
  for (var i = 2; i < n; i++) { // i will always be less than the parameter so the condition below will never allow parameter to be divisible by itself ex. (7 % 7 = 0) which would return true
    if (n % i === 0) return false; // when parameter is divisible by i, it's not a prime number so return false
  }
  return n > 1; // otherwise it's a prime number so return true (it also must be greater than 1, reason for the n > 1 instead of true)
}

function getPrime(n, isPrime) {
  let prime = 1;
  for (let i = 2; i <= n; i++) { 
    if (isPrime(i)) {
      prime = i;
    }
  }
  return prime;
}

const getSquareNum = (num, cb) => {
  console.log(`1. The square of ${num} is ${num * num}`); 
  cb();
}
const waitNum = (num, cb) => {
  setTimeout(() => {
    console.log(`2. Waiting ${num} ms`);
    cb();
  }, num);
}
const getSquareRootNum = (num, cb) => {
  console.log(`3. The square root of ${num} is ${Math.sqrt(num)}`);
  cb();
}
const getPrimeNum = (num, cb) => {
  console.log(`4. The prime-number ${getPrime(num, isPrimeNumber)} is closest, without being greater than or equal to ${num}`);
  cb();
}
const getDuration = (startTime) => {
  const finishTime = new Date().getTime(); 
  console.log(`5. Total elapsed time is ${finishTime - startTime} ms`);
}

function myFunc(num=1) {
  const startTime = new Date().getTime();
  console.log(`Run with ${num} as input`);
  if (!isNaN(num)) {
    if (num >= 1 && num <= 1000) {
      getSquareNum(num, ()=> { 
        waitNum(num, ()=> { 
          getSquareRootNum(num, ()=> { 
            getPrimeNum(num, ()=> { 
              getDuration(startTime);
            });
          });
        });
      });
    } else {
      console.error(`Out of range! ${num} is not between 1 and 1000.`);
    }
  } else {
    console.error("NaN");
  }
}


/*

myFunc(1001);
myFunc("121");
myFunc();
myFunc("abc");
myFunc(600);

*/


// Callbacks - static call 

//   setTimeout(() => {
//     console.log("----------");
//     myFunc(1001);
//     setTimeout(() => {
//       console.log("----------");
//       myFunc("121");
//       setTimeout(() => {
//         console.log("----------");
//         myFunc();
//         setTimeout(() => {
//           console.log("----------");
//           myFunc("abc");
//           setTimeout(() => {
//             console.log("----------");
//             myFunc(600);
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);


// Callbacks - dinamic call

function multiFunc(arr, cb, idx=0, time=1000) {
  if (idx < arr.length) {
    setTimeout(() => {    
      console.log("----------");
      myFunc(arr[idx]);
      cb(arr, cb, idx + 1);
    }, time);
  }
}

const test = [1001, "121", , "abc", 600];
multiFunc(test, multiFunc);

