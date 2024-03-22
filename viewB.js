class ViewB {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');


        const svg =div.append('svg');

        con.Test('View B is connected.');

        svg.append("rect")
        .attr("width", "200")
        .attr("height", "200")
        .attr("fill", "blue")
        .on("click", function(){})

        const label =svg.append('text')
        .attr('x', '25%')
        .attr('y', '50%')
        .text('View B');
    }
}