class ViewB {
    constructor(con, root) {
        this.con = con;

        // Create a div and an SVG within the root
        const div = root.append('div')
            .style('width', '50%')
            .style('height', '50%');

        this.svg = div.append('svg')
            .attr('width', 200)
            .attr('height', 300); // Adjusted to create a tall vertical space

        // Initial values for x and y scales
        this.margin = { top: 20, right: 30, bottom: 50, left: 50 };
        this.chartWidth = 200 - this.margin.left - this.margin.right;
        this.chartHeight = 300 - this.margin.top - this.margin.bottom;

        // Initialize scales and axes
        this.yScale = d3.scaleLinear()
            .domain([0, 5]) // Assuming a rating scale of 0 to 5
            .range([this.chartHeight, 0]);

        this.xScale = d3.scaleBand()
            .domain(['Genre'])
            .range([0, this.chartWidth])
            .padding(0.2);

        // Create a group to contain the chart
        this.chartGroup = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        // Append x-axis and y-axis
        this.chartGroup.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${this.chartHeight})`)
            .call(d3.axisBottom(this.xScale));

        this.chartGroup.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.yScale));

        // Create an initial empty bar
        this.bar = this.chartGroup.append('rect')
            .attr('x', this.xScale('Genre'))
            .attr('width', this.xScale.bandwidth())
            .attr('y', this.chartHeight) // Start the bar at the bottom
            .attr('height', 0) // Initial height of 0
            .attr('fill', 'lightblue');

        // Add a label above the bar
        this.label = this.chartGroup.append('text')
            .attr('x', this.xScale('Genre') + this.xScale.bandwidth() / 2)
            .attr('y', -10) // Position above the bar
            .attr('text-anchor', 'middle')
            .text('');
    }

    updateView(data) {
        // Create a color scale for the bar
        const colorScale = d3.scaleLinear()
            .domain([0, 5]) // Adjust based on the actual rating range
            .range(['lightblue', 'darkblue']);

        // Update the bar height and color
        const newHeight = this.chartHeight - this.yScale(data.rating);

        this.bar.transition()
            .duration(500)
            .attr('y', this.yScale(data.rating)) // Adjust the bar's starting position
            .attr('height', newHeight)
            .attr('fill', colorScale(data.rating));

        // Update the label with the genre name and rating
        this.label
            .text(`Genre: ${data.genre} - Rating: ${data.rating.toFixed(1)}`);
    }
}
