
export interface Node{
    name: string;
    parent?: Node;
    children: Node[];
    size: number;
}

export function addChild(node: Node, parent: Node){
    parent.children.push(node);
    node.parent = parent;
}

export function addFileSize(file: Node, size: number){
    file.size += size;
    if(file.parent){
        addFileSize(file.parent, size);
    }
}