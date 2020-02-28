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

  gLink = this.svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

  gNode = this.svg
    .append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");
  transition = this.svg.transition().duration(300);
  root: d3.HierarchyNode<any>;
  constructor(private data: any) {
    this.root = d3.hierarchy(this.data);
    this.root.descendants().forEach((d: any, i) => {
      d._children = d.children;
    });
  }

  draw() {
    this.update(this.root);
  }

  private update(source) {
    const line = d3.line().curve(d3.curveBasis);
    const tree = d3.tree().size([this.treeWidth, this.treeHeight]);
    tree(this.root);

    // const diagonal = d3
    //   .linkVertical()
    //   .x((d: any) => d.x)
    //   .y((d: any) => d.y);

    const node = this.gNode.selectAll(".node").data(this.root.descendants());

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => {
        debugger;
        console.log(source);
        return `translate(${source.x0}, ${source.y0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (d: any) => {
        console.log(d);
        d.children = d.children ? null : d._children;
        this.update(d);
      });

    nodeEnter
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "lightblue");
    //.attr("cx", (d: any) => d.x)
    // .attr("cy", (d: any) => d.y);

    // nodeEnter
    //   .append("text")
    //   .attr("x", (d: any) => d.x + 30)
    //   .attr("y", (d: any) => d.y + 10)
    //   // .attr("text-anchor", (d: any) => d._children ? "end" : "start")
    //   .text(d => d.data.name);

    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(this.transition)
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    const nodeExit = node
      .exit()
      .transition(this.transition)
      .remove()
      .attr("transform", (d: any) => `translate(${source.x},${source.y})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    const links = this.root.descendants().slice(1);
    console.log("links", links);
    const link = this.gLink.selectAll(".link").data(links, (d: any) => {
      // console.log(`link data `, d);
      return d.name;
    });

    const linkEnter = link
      .enter()
      .append("path")
      .attr("d", (d: any) => {
        return line([
          [d.x, d.y],
          [d.x, (d.y + d.parent.y) / 2],
          [d.parent.x, (d.y + d.parent.y) / 2],
          [d.parent.x, d.parent.y]
        ]);
      })
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "lightblue");

    link
      .merge(linkEnter)
      .transition(this.transition)
      .attr("d", (d: any) => {
        return line([
          [d.x, d.y],
          [d.x, (d.y + d.parent.y) / 2],
          [d.parent.x, (d.y + d.parent.y) / 2],
          [d.parent.x, d.parent.y]
        ]);
      });

    link
      .exit()
      .transition(this.transition)
      .remove()
      .attr("d", d => {
        // const o = { x: source.x, y: source.y };
        // return diagonal({ source: o, target: o });

        return line([
          [d.x, d.y],
          [d.x, (d.y + d.parent.y) / 2],
          [d.parent.x, (d.y + d.parent.y) / 2],
          [d.parent.x, d.parent.y]
        ]);
      });

    this.root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
}
