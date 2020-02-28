import * as d3 from 'd3';

export class DrawTree {

  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

 	width = 960 - this.margin.right - this.margin.left;
	height = 500 - this.margin.top - this.margin.bottom;

  duration = 750;

  constructor(private data: any) {

  }


  draw() {
    const tree = d3.layout.tree();
  }



}