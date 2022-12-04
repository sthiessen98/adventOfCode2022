import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

//const msg = readFileSync(require.resolve('./day1.txt'), 'utf-8');
var reader = rd.createInterface(createReadStream(require.resolve('./day4.txt')));
let count: number = 0;
reader.on("line", (l: string) => {
    const elfSections = l.split(',');
    const elf1 = elfSections[0].split('-');
    const elf2 = elfSections[1].split('-');

    const l1 = parseInt(elf1[0]);
    const r1 = parseInt(elf1[1]);
    const l2 = parseInt(elf2[0]);
    const r2 = parseInt(elf2[1]);

    if((l1 <= l2 && r1 >= r2) || (l1 >= l2 && r1 <= r2) || (r1 >= l2 && l1 <= r2) || (r1 >= l2 && l1 <= r2) || (l1 <= r2 && l2 <= r1)){
        count++;
    }
});

reader.on('close', ()=> {
    console.log(`Sections enclosed by their pair: ${count}`);
});