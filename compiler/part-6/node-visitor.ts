import { AST } from '../model/ast';

export class NodeVisitor {

    visit(node: AST) {
        const methodName = `visit_${typeof node}`;
        const visitor = NodeVisitor['methodName'] || this.genericVisit(node);
        return visitor.call(this, node);
    }

    genericVisit(node: AST) {
        return new Error(`NO visit_${typeof node} method`);
    }
}