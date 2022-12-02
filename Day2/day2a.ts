import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day2.txt')));

let sumScore = 0;
reader.on("line", (l: string) => {
    const tokens = l.split(' ');
    const opponentMove: string = tokens[0];
    const yourMove: string = tokens[1];
    sumScore += (calcWin(opponentMove, yourMove) + moveScoreCalc(yourMove));
});

reader.on('close', ()=> {
    console.log(`Total Score: ${sumScore}`);
});
function calcWin(opponent: string, your: string): number {
    if((opponent === 'A' && your === 'X') || (opponent === 'B' && your === 'Y') || (opponent === 'C' && your === 'Z')){
        return 3;
    }
    if((opponent === 'A' && your === 'Y') || (opponent === 'B' && your === 'Z') || (opponent === 'C' && your === 'X')){
        return 6;
    }else{
        return 0;
    }
}

function moveScoreCalc(move: string): number{
    if(move === 'X'){
        return 1;
    }else if(move === 'Y'){
        return 2;
    }else{
        return 3;
    }
}
