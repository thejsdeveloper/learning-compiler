import * as d3 from "d3";

export class DrawTree {
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };
  width = 960;
  height = 500;

  treeWidth = 960 - this.margin.right - this.margin.left;
  treeHeight = 500 - this.margin.top - this.margin.bottom;

  duration = 750;
  svg = d3.select(".tree-container")
    .append("svg")
    .attr("height", this.height)
    .attr("width", this.width)
    .append("g")
    .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    
  root = {};
  constructor(private data: any) {
   this.root = d3.hierarchy(this.data);
  }

  draw() {

    this.update(this.root);
  }

  private update(source) {
    
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const tree = d3.tree().size([this.treeWidth, this.treeHeight]);

    const transition = this.svg.transition()
      .duration(duration)


    
    tree(this.root);

    const links = this.root.descendants().slice(1);
    const line = d3.line().curve(d3.curveBasis);

    this.svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "lightblue")
      .attr("d", (d: any) => {
        return line([
          [d.x, d.y],
          [d.x, (d.y + d.parent.y) / 2],
          [d.parent.x, (d.y + d.parent.y) / 2],
          [d.parent.x, d.parent.y]
        ]);
      });

    const nodeEnter = this.svg
      .selectAll(".node")
      .data(this.root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "lightblue")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .on("click", (d: any) => {
        console.log(d);
        d.children = d.children ? null : d._children;
        this.update(d)
      });
  }
    
}
