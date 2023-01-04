import { readFileSync, createReadStream } from 'fs';
import { mainModule } from 'process';
import * as rd from 'readline';
import {addFileSize, Node} from './KDTree';

var reader = rd.createInterface(createReadStream(require.resolve('./day7.txt')));

let root: Node = {
    name: '/',
    children: [],
    size: 0
}

let curr: Node = root;
reader.on("line", (l: string) => {
    const command = l.split(' ');
    //CD Logic
    if(command[1] === 'cd'){
        if(command[2] === '..'){
            if(!curr?.parent){
                console.log(`ERROR: NO PARENT ON NODE ${curr.name}`);
            }else{
                curr = curr.parent;
            }
        }else if(command[2] === '/'){
            curr = root;
        }else{
            const child = curr.children.find((c)=> c.name === command[2]);
            child ? curr = child : console.log(`ERROR: NO CHILD FOUND FOR NODE ${curr.name}, ${command[2]}`);
        }
    }
    
    //LS logic
    else if(command[0] === 'dir'){
        const newNode: Node = {
            name: command[1],
            parent: curr,
            children: [],
            size: 0
        }
        newNode.parent?.children.push(newNode);
    }else if(parseInt(command[0])){
        const newNode: Node = {
            name: command[1],
            parent: curr,
            children: [],
            size: parseInt(command[0]),
        }
        newNode.parent?.children.push(newNode);
        addFileSize(curr, parseInt(command[0]));
    }
});

reader.on('close', ()=> {
    const neededFileSpace = 30000000- (70000000 - root.size);
    const result = findSmallestNeededDir(neededFileSpace, root);
    console.log(`Size of smallest directory to be deleted: ${result}`);
});

function findSmallestNeededDir(neededFileSpace: number, node: Node): number{
    if(!node.children.length){
        return 99999999999;
    }else{
        const options: number[] = [...node.children.map((child) => findSmallestNeededDir(neededFileSpace, child)), node.size];
        const sortedOptions = options.filter((n)=> n > neededFileSpace).sort((a,b)=> a - b);
        return sortedOptions[0] ?? 9999999999;
    }
}

