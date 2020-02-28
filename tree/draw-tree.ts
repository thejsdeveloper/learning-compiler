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
  svg = d3
    .select(".tree-container")
    .append("svg")
    .attr("height", this.height)
    .attr("width", this.width)
    .append("g")
    .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

  root: d3.HierarchyNode<any>;
  constructor(private data: any) {
    const tree = d3.tree().size([this.treeWidth, this.treeHeight]);
    this.root = d3.hierarchy(this.data);
    tree(this.root);
  }

  draw() {
    this.root.descendants().forEach((d, i) => {
      d._children = d.children;
    });
    this.update(this.root);
  }

  diagonal(d) {
    const line = d3.line().curve(d3.curveBasis);
    return line([
      [d.x, d.y],
      [d.x, (d.y + d.parent.y) / 2],
      [d.parent.x, (d.y + d.parent.y) / 2],
      [d.parent.x, d.parent.y]
    ]);
  }

  private update(source) {
    const duration = 2500;

    const transition = this.svg.transition().duration(duration);

    const links = this.root.descendants().slice(1);

    const link = this.svg.selectAll(".link");

    const linkEnter = link
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "lightblue")
      .attr("d", (d: any) => {
        console.log({ x: source.x, y: source.y });
        return this.diagonal({ x: source.x, y: source.y });
      });

    link
      .merge(linkEnter)
      .transition(transition)
      .attr("d", this.diagonal);

    link
      .exit()
      .transition(transition)
      .remove()
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
        return this.diagonal({ source: o, target: o });
      });

    const node = this.svg.selectAll(".node");

    const nodeEnter = node
      .data(this.root.descendants())
      .enter()
      .append("g")
      .attr("class", "node");

    nodeEnter
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "lightblue")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .on("click", (d: any) => {
        console.log(d);
        d.children = d.children ? null : d._children;
        this.update(d);
      });

    nodeEnter
      .append("text")
      .attr("x", (d: any) => d.x + 30)
      .attr("y", (d: any) => d.y + 10)
      // .attr("text-anchor", (d: any) => d._children ? "end" : "start")
      .text(d => d.data.name);

    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    const nodeExit = node
      .exit()
      .transition(transition)
      .remove()
      .attr("transform", (d: any) => `translate(${source.x},${source.y})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);
  }
}
