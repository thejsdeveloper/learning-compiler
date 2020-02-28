import { AST } from '../compiler/model/ast'
import { BinaryOp, Num } from '../compiler/model/binaryOperation';
import { Token, TOKEN_TYPE } from '../compiler/model/token';


export class Tree {
  constructor() { }

  getHierarchy(data: BinaryOp, parent = null) {

    const childern = [];
    const currentNodeName = data.token.value;
    if (!!data.left) {
      const left = this.getHierarchy(data.left, currentNodeName);
      childern.push(left)
    }

    if (!!data.right) {
      const right = this.getHierarchy(data.right, currentNodeName)
      childern.push(right)
    }
    
    return {
      name: currentNodeName,
      parent: parent,
      childern: childern
    }
  }

}