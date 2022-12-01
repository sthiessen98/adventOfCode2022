import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

//const msg = readFileSync(require.resolve('./day1.txt'), 'utf-8');
var reader = rd.createInterface(createReadStream(require.resolve('./day1.txt')));
let currElf: number = 0;
let firstElf: number = 0;
let secondElf: number = 0;
let thirdElf: number = 0;
reader.on("line", (l: string) => {
    if(l === ''){
        if ( currElf > firstElf){
            thirdElf = secondElf;
            secondElf = firstElf;
            firstElf = currElf;
        }else if(currElf > secondElf){
            thirdElf = secondElf;
            secondElf = currElf;
        }
        else if(currElf > thirdElf){
            thirdElf = currElf;
        }
        currElf = 0;
    }else{
        currElf += parseInt(l);
    }
});

reader.on('close', ()=> {
    console.log(`Max Calories of top 3 elves: ${firstElf + secondElf + thirdElf}`);
});