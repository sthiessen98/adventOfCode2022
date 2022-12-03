import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day3.txt')));
let score: number = 0;

const scoreValues = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
reader.on("line", (l: string) => {
    let firstCompartment = new Set(l.slice(0, l.length/2).split(''));
    let secondCompartment = new Set(l.slice(l.length/2, l.length).split(''));
    
    firstCompartment.forEach((key)=> {
        if(secondCompartment.has(key)){
            score += scoreValues.indexOf(key);
        }
    });
    
});

reader.on('close', ()=> {
    console.log(`TotalScore: ${score}`);
});