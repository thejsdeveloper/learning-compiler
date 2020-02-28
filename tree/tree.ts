import { AST } from '../compiler/model/ast'
import { BinaryOp, Num } from '../compiler/model/binaryOperation';
import { Token, TOKEN_TYPE } from '../compiler/model/token';
import * as shortid from 'shortid';

export class Tree {
  constructor() { }

  getHierarchy(data: BinaryOp, parent = null) {

    const childern = [];
    const currentNodeName = data.token.value;
    const id = shortid.generate();
    if (!!data.left) {
      const left = this.getHierarchy(data.left, id);
      childern.push(left)
    }

    if (!!data.right) {
      const right = this.getHierarchy(data.right, id)
      childern.push(right)
    }
    
    return {
      name: currentNodeName,
      id: id,
      parent: parent,
      children: childern
    }
  }

}