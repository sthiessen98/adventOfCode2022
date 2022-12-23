import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day6.txt')));

let datastream: string = '';
let answer: number = 0;
let streamLength: number = 4;

reader.on("line", (l: string) => {
    datastream = l;
});

reader.on("close", ()=>{
    let cont = true;
    while(cont){
        const result= checkDuplicates(datastream.slice(answer, answer + streamLength));
        if(!result){
            cont = false;
            answer+= streamLength;
        }else{
            answer++;
        }
    }
    console.log(`answer: ${answer}`);
});

function checkDuplicates(chars: String){
    for(let x=0; x < chars.length; x++){
        for(let y=x; y < chars.length; y++){
            if(chars.charAt(x) === chars.charAt(y) && x !== y){
                return true;
            }
        }
    }
    return false;
}

