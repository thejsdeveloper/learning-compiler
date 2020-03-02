import { AST } from "../model/ast";

export class NodeVisitor {
  constructor() {}

  visit(node: AST) {
    const methodName = `visit_${node.constructor.name}`;
    const visitor = this[methodName] || this.genericVisit(node);
    return visitor.call(this, node)
  }

  genericVisit(node: AST) {
    return new Error(`NO visit_${typeof node} method`);
  }
}
