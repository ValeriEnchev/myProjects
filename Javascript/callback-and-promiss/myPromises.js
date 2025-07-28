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
 
 // Promises 


function isPrimeNumber(n) {
  for (var i = 2; i < n; i++) { // i will always be less than the parameter so the condition below will never allow parameter to be divisible by itself ex. (7 % 7 = 0) which would return true
    if (n % i === 0) return false; // when parameter is divisible by i, it's not a prime number so return false
  }
  return n > 1; // otherwise it's a prime number so return true (it also must be greater than 1, reason for the n > 1 instead of true)
}

function getPrime(n, isPrime) {
  let prime = 1;
  for (let i = 2 ; i <= n ; i++) { 
    if (isPrime(i)) {
      prime = i;
    }
  }
  return prime;
}
  
function checkNum(num) {
  console.log(`Run with ${num} as input`);  
  return new Promise((resolve, reject) => {
    if (!isNaN(num)) {
      if (num >= 1 && num <= 1000) {
        resolve(num);
      } else {
        reject(`Out of range! ${num} is not between 1 and 1000.`);
      }  
    } else {
      reject("NaN");
    }
  })
}  

function numSquarer(num) {
  console.log(`1. The square of ${num} is ${num * num}`); 
  return new Promise((resolve, reject) => {
    resolve(num);
  });
}

function waitNum(num) {
  console.log(`2. Waiting ${num} ms`);    
  return new Promise((resolve, reject) => {
    setTimeout(()=>{ 
      resolve(num); 
    }, num);     
  });
}

function numSquarerRoot(num) {
  console.log(`3. The square root of ${num} is ${Math.sqrt(num)}`); 
  return new Promise((resolve, reject) => {
    resolve(num);
  });
}
   
function numPrime(num) {
  console.log(`4. The prime-number ${getPrime(num, isPrimeNumber)} is closest, without being greater than or equal to ${num}`);
  return new Promise((resolve, reject) => {
    resolve(num);
  });
}

function durationTime(startTime) {
  const finishTime = new Date().getTime(); 
  console.log(`5. Total elapsed time is ${finishTime - startTime} ms`);
}

function myFunc(num=1){
  const startTime = new Date().getTime(); 
  checkNum(num)
    .then((num) => numSquarer(num))
    .then((num) => waitNum(num))
    .then((num) => numSquarerRoot(num))
    .then((num) => numPrime(num))
    .then(() => durationTime(startTime))    
    .catch(err => console.error(err));		  
}  
  

/*

myFunc(1001);
myFunc("121");
myFunc();
myFunc("abc");
myFunc(600);

*/


 // Promises - dinamic call
 
const test = [1001, "121", , "abc", 600];
const promises=[];

function timeLogger(value, time=1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("----------");
      resolve(myFunc(value));
    }, time);
  });
}

//test.map((v,i)=>promises.push(timeLogger(v,i*1000)));
//Promise.all(promises);

let i = 0;
for(const p of test){
  //console.log(p,i++);
  promises.push(timeLogger(p, (i++) * 2000));
  //timeLogger(p, (i++)*2000);
}
Promise.all(promises);
