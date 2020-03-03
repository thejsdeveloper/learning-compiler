import { NodeVisitor } from "./node-visitor";
import { Parser } from './parser';
import { AST } from "../model/ast";
import { BinaryOp, Num, UnaryOp } from "../model/binaryOperation";
import { TOKEN_TYPE } from "../model/token";

export class Interpreter extends NodeVisitor {
    constructor(private parser: Parser) {
        super();
    }

    visit_BinaryOp(node: BinaryOp) {
        if (node.token.tokenType === TOKEN_TYPE.PLUS) {
            return this.visit(node.left) + this.visit(node.right)
        } else if (node.token.tokenType === TOKEN_TYPE.MINUS) {
            return this.visit(node.left) - this.visit(node.right)
        } else if (node.token.tokenType === TOKEN_TYPE.MUL) {
            return this.visit(node.left) * this.visit(node.right)
        } else if (node.token.tokenType === TOKEN_TYPE.DIV) {
            return this.visit(node.left) / this.visit(node.right)
        }
    }

    visit_Num(node: Num) {
        return node.value;
    }

    visit_UnaryOp(node: UnaryOp) {
        const tokenType = node.token.tokenType;
        if(tokenType === TOKEN_TYPE.PLUS) {
            return +this.visit(node.expr);
        } else if (tokenType === TOKEN_TYPE.MINUS) {
            return -this.visit(node.expr);
        }
    }

    interpret() {
        const tree = this.parser.parse();
        return this.visit(tree);
    }
}