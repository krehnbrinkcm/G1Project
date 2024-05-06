class ViewB {
    constructor(con, root) {
        this.con = con;
        this.div = root.append('div')
            .style('width', '50%')
            .style('height', '50%');
        this.svg = this.div.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');
    }

    updateGraph(data) {
        // Clear the previous contents
        this.svg.selectAll("*").remove();

        // Check if data is present; if not, do nothing (keep the view empty)
        if (!data) return;

        // Create a new visualization specific to the data provided
        this.svg.append("text")
            .attr("x", 50) // Adjust as necessary
            .attr("y", 50) // Adjust as necessary
            .text(`Data from View A: ${data.genre} - Rating: ${data.rating}`)
            .style("font-size", "16px");
    }
}

