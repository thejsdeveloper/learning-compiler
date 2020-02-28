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

    let nodes = d3.hierarchy(this.data, (d: any) => d.children);
    nodes = tree(nodes);

    const stratify = d3.stratify()
      .parentId((d: any) => d.parentId)
      .id((d: any) => d.name)
   
    const links = nodes.descendants().slice(1);
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
      .data(nodes.descendants())
      .enter()
      .append('circle')
      .attr('r', 4.5)
      .attr('fill', '#fff')
      .attr('class', 'node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);



  }





}