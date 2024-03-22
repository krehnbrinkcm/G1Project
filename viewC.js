class ViewC {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');

        const svg = div.append('svg');

        svg.append("rect")
        .attr("width", "200")
        .attr("height", "200")
        .attr("fill", "green")
        .on("click", function(){con.Test("View C is connected")});

        const label =svg.append('text')
        .attr('x', '25%')
        .attr('y', '50%')
        .text('View C');
    }
}