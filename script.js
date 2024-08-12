// #!/usr/bin/env node
// // function fibs(n) {
// //     let array = [];

// //     array[0] = 0;
// //     array[1] = 1;

// //     for (let i = 2; i < n; i++) {
// //         array[i] = array[i - 1] + array[i - 2];
// //     }

// //     return array;
// // }

// // let n = 8
// // answer = fibs(n)

// // console.log(answer)
function fibsRec(n) {
    console.log("This was printed recursively")

    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    
    let prev = fibsRec(n - 1);
    prev.push(prev[prev.length - 1] + prev[prev.length - 2]);
    return prev;
}

answer = fibsRec(8);
console.log(answer);