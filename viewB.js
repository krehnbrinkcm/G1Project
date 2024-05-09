class ViewB {
    constructor(con, root) {
        this.con = con;
        this.selectedData = [];

        const div = root.append('div')
            .style('width', '100%')
            .style('height', '100%');

        this.svg = div.append('svg')
            .attr('width', 600)
            .attr('height', 400);

        this.margin = { top: 30, right: 50, bottom: 70, left: 70 };
        this.chartWidth = 600 - this.margin.left - this.margin.right;
        this.chartHeight = 400 - this.margin.top - this.margin.bottom;

        this.yScale = d3.scaleLinear()
            .domain([0, 5])
            .range([this.chartHeight, 0]);

        this.xScale = d3.scaleBand()
            .range([0, this.chartWidth])
            .padding(0.2);

        this.chartGroup = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.chartGroup.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${this.chartHeight})`);

        this.chartGroup.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.yScale));
    }

    updateView(newData) {
        const dataToUpdate = this.selectedData.find(d => d.genre === newData.genre);
        if (dataToUpdate) {
            this.selectedData = this.selectedData.filter(d => d.genre !== newData.genre);
        } else {
            this.selectedData.push(newData);
        }

        // Update xScale domain with current selected data genres
        this.xScale.domain(this.selectedData.map(d => d.genre));

        // Update x-axis with new scale
        this.chartGroup.select('.x-axis').call(d3.axisBottom(this.xScale));

        const bars = this.chartGroup.selectAll('rect')
            .data(this.selectedData, d => d.genre);

        bars.enter()
            .append('rect')
            .merge(bars)
            .transition()
            .duration(500)
            .attr('x', d => this.xScale(d.genre))
            .attr('width', this.xScale.bandwidth())
            .attr('y', d => this.yScale(d.rating))
            .attr('height', d => this.chartHeight - this.yScale(d.rating))
            .attr('fill', d => d3.scaleLinear()
                .domain([0, 5])
                .range(['lightblue', 'darkblue'])(d.rating));

        bars.exit().transition().duration(500).attr('height', 0).remove();

        this.chartGroup.selectAll('text')
            .data(this.selectedData, d => d.genre)
            .enter()
            .append('text')
            .merge(this.chartGroup.selectAll('text'))
            .transition()
            .duration(500)
            .attr('x', d => this.xScale(d.genre) + this.xScale.bandwidth() / 2)
            .attr('y', d => this.yScale(d.rating) - 5)
            .attr('text-anchor', 'middle')
            .text(d => `Rating: ${d.rating.toFixed(1)}`);
    }
}
