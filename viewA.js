class ViewA {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
            .style('width', '100%')
            .style('height', '50%');

        const svg = div.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        // Load data and generate the chart using an arrow function
        d3.csv("Books_df.csv").then((data) => {
            // Compute average rating for each genre
            const avgRatingsByGenre = d3.rollup(data, 
                v => d3.mean(v, d => d.Rating), 
                d => d["Main Genre"]
            );

            // Convert map to array for easier manipulation
            const avgRatingsArray = Array.from(avgRatingsByGenre, ([genre, rating]) => ({ genre, rating }));

            // Set up dimensions for the chart
            const numGenres = avgRatingsArray.length;
            const barWidth = 30; // Adjust as needed
            const margin = { top: 20, right: 30, bottom: 60, left: 50 };
            const width = numGenres * barWidth + margin.left + margin.right;
            const height = 300; // Adjust as needed

            // Update SVG dimensions
            svg.attr('width', width)
                .attr('height', height);

            // Create scales
            const xScale = d3.scaleBand()
                .domain(avgRatingsArray.map(d => d.genre))
                .range([margin.left, width - margin.right]) // Adjust range
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(avgRatingsArray, d => d.rating)])
                .nice()
                .range([height - margin.bottom, margin.top]); // Adjust range

            // Create and append bars
            svg.selectAll("rect")
            .data(avgRatingsArray)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.genre))
            .attr("y", d => yScale(d.rating))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - margin.bottom - yScale(d.rating))
            .attr("fill", "steelblue")
            .on("click", (event, d) => {
                console.log("Bar clicked, data:", d);
                this.con.updateViewB(d);
            });

            // Create x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end")
                .attr("x", -9) // Adjust label position
                .attr("y", 6); // Adjust label position

            // Create y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale));

            // Add labels
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .style("text-anchor", "middle")
                .text("Genre");

            svg.append("text")
                .attr("transform", `rotate(-90) translate(${-height / 2},${margin.left - 35})`)
                .style("text-anchor", "middle")
                .text("Average Rating");
        });
    }
}

const root = d3.select("body");
const con = {
    Test: function(message) {
        console.log(message);
    },
    updateViewB: function(data) {
        console.log("Data passed to ViewB:", data);
        this.viewB.updateGraph(data);
    }
};

new ViewA(con, root);
