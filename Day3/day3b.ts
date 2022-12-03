import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day3.txt')));
let score: number = 0;
let lineCount: number = 0;
const scoreValues = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const compartments: String[] = [];

reader.on("line", (l: string) => {
    compartments.push(l);
    
});

reader.on('close', ()=> {
    let x = 0;
    while (x < compartments.length){
        const c1 = new Set(compartments[x].split(''));
        const c2 = new Set(compartments[x+1].split(''));
        const c3 = new Set(compartments[x+2].split(''));
        c1.forEach((key)=> {
            if(c2.has(key) && c3.has(key)){
                score += scoreValues.indexOf(key);
            }
        })

        x+=3;
    }
    console.log(`TotalScore: ${score}`);
});