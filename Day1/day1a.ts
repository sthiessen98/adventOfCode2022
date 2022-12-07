import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day1.txt')));
let currElf: number = 0;
let maxElf: number = 0;
reader.on("line", (l: string) => {
    if(l === ''){
        if ( currElf > maxElf){
            maxElf = currElf;
        }
        currElf = 0;
    }else{
        currElf += parseInt(l);
    }
});

reader.on('close', ()=> {
    console.log(`Max Calories: ${maxElf}`);
});