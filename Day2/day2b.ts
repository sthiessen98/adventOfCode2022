import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day2.txt')));

let sumScore = 0;
reader.on("line", (l: string) => {
    const tokens = l.split(' ');
    const opponentMove: string = tokens[0];
    const result: string = tokens[1];
    sumScore += (calcWin(result) + moveScoreCalc(opponentMove, result));
});

reader.on('close', ()=> {
    console.log(`Total Score: ${sumScore}`);
});

function calcWin(result: string): number {
    if(result === 'X'){
        return 0;
    }else if(result === 'Y'){
        return 3;
    }else{
        return 6;
    }
}

function moveScoreCalc(opponent: string, result: string): number{ 
    if((opponent === 'B' && result === 'X') || (opponent === 'A' && result === 'Y') || (opponent === 'C' && result === 'Z')){
        return 1;
    }
    if((opponent === 'C' && result === 'X') || (opponent === 'B' && result === 'Y') || (opponent === 'A' && result === 'Z')){
        return 2;
    }else{
        return 3;
    }

}
