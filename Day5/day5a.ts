import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

interface instruction{
    qty: number;
    origin: number;
    destination: number;
}

var reader = rd.createInterface(createReadStream(require.resolve('./day5.txt')));
let stacks: string[] = ['','','','','','','','',''];
let instructions:  instruction[] = [];
let isMoving: boolean = false;
reader.on("line", (l: string) => {
    if(!l.length){
        isMoving = true;
    }else if(isMoving){
        const tokens = l.split(' ');
        instructions.push({
            qty: parseInt(tokens[1]),
            origin: parseInt(tokens[3])-1,
            destination: parseInt(tokens[5])-1
        })
    }else{
        for(let x=0; x < l.length; x++){
            if(l.charAt(x) === '['){
                stacks[x/4] = stacks[x/4].concat(l.charAt(x+1));
            }
        }
    }
});

reader.on('close', ()=> {
    instructions.forEach((i)=> {
        for(let x=0; x< i.qty; x++){
            const crate: string = stacks[i.origin].charAt(0);
            stacks[i.origin] = stacks[i.origin].slice(1);
            stacks[i.destination] = crate.concat(stacks[i.destination]);
        }
    })

    let answer = '';
    for(let x=0; x < stacks.length; x++){
        answer = answer.concat(stacks[x].charAt(0));
    }
    console.log(`answer: ${answer}`);
});