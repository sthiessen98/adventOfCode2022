import { readFileSync, createReadStream } from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(createReadStream(require.resolve('./day8.txt')));
let treeHeights: number[][] = [];
let isVisible: boolean[][] = [];

reader.on("line", (l: string) => {
    const row = l.split('').map((value) => parseInt(value));
    treeHeights.push(row);
    isVisible.push(row.map(()=> false));
});

reader.on('close', ()=> {
    //Left -> Right
    for(let y=0; y < treeHeights.length; y++){
        let x=0;
        let currVisibility = -1;
        let contX = true;
        while(x < treeHeights[y].length && contX){
            if(treeHeights[y][x] > currVisibility){
                console.log(y,x);

                isVisible[y][x] = true;
                currVisibility = treeHeights[y][x];
            }
            if(currVisibility === 9){
                contX = false;
            }else{
                x++;
            }
        }
    }

    //Right -> Left
    for(let y=treeHeights.length-1; y >=0; y--){
        let x=treeHeights[y].length -1;
        let currVisibility = -1;
        let contX = true;
        while(x >= 0 && contX){
            if(treeHeights[y][x] > currVisibility){
                console.log(y,x);

                isVisible[y][x] = true;
                currVisibility = treeHeights[y][x];
            }
            if(currVisibility === 9){
                contX = false;
            }else{
                x--;
            }
        }
    }

    for(let y=0; y < treeHeights.length; y++){
        let x=0;
        let currVisibility = -1;
        let contX = true;
        while(x < treeHeights[y].length && contX){
            if(treeHeights[x][y] > currVisibility){

                isVisible[x][y] = true;
                currVisibility = treeHeights[x][y];
            }
            if(currVisibility === 9){
                contX = false;
            }else{
                x++;
            }
        }
    }

    for(let y=treeHeights.length-1; y >=0; y--){
        let x=treeHeights[y].length -1;
        let currVisibility = -1;
        let contX = true;
        while(x >= 0 && contX){
            if(treeHeights[x][y] > currVisibility){
                isVisible[x][y] = true;
                currVisibility = treeHeights[x][y];
            }
            if(currVisibility === 9){
                contX = false;
            }else{
                x--;
            }
        }
    }

    let count = 0;
    for(let x=0; x < isVisible.length; x++){
        for(let y=0; y < isVisible[x].length; y++){
            if(isVisible[x][y]){
                count++;
            }
        }
    }

    console.log(`Total trees visible: ${count}`);
});