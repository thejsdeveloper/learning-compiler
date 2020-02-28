import * as d3 from 'd3';

export class DrawTree {

  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  width = 960;
  height = 500;

  treeWidth = 960 - this.margin.right - this.margin.left;
  treeHeight = 500 - this.margin.top - this.margin.bottom;

  duration = 750;

  constructor(private data: any) {

  }


  draw() {
    const tree = d3.tree().size([this.treeWidth, this.treeHeight]);


    
    let root = d3.hierarchy(this.data);
    console.log("TCL: DrawTree -> draw -> nodes", root)
    
    tree(root);
    console.log("TCL: DrawTree -> draw -> nodes", root.descendants())

    const links = root.descendants().slice(1);
      console.log("TCL: DrawTree -> draw -> nodes", links)
    const line = d3.line().curve(d3.curveBasis);



    const svg = d3.select('.tree-container')
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);


    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'lightblue')
      .attr('d', (d: any) => {
        return line([
          [d.x, d.y],
          [d.x, (d.y + d.parent.y) / 2],
          [d.parent.x, (d.y + d.parent.y) / 2],
          [d.parent.x, d.parent.y]
        ])
      });


  svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .append('circle')
      .attr('r', 4.5)
      .attr('fill', '#4a4a4a')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);



  }





}