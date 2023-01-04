import { readFileSync, createReadStream } from 'fs';
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
    const result = findLargeDirectories(root);
    console.log(`total of sub 100,000 size directories: ${result}`);
});

function findLargeDirectories(node: Node){
    let total: number = 0;
    if(node.size <= 100000 && !!node.children.length){
        total = node.size;
    }
    node.children.forEach((child)=> total += findLargeDirectories(child));
    return total;
}