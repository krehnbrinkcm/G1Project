class ViewA {
    constructor(con, root) {
        this.con = con; // Controller connection stored as an instance variable
        this.selectedGenres = []; 

        const div = root.append('div')
            .style('width', '100%')
            .style('height', '50%');

        const svg = div.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        // Capture `this` to use inside callbacks where `this` might refer to another context
        const self = this;

        d3.csv("Books_df.csv").then(function(data) {
            const avgRatingsByGenre = d3.rollup(data, 
                v => d3.mean(v, d => d.Rating), 
                d => d["Main Genre"]
            );

            const avgRatingsArray = Array.from(avgRatingsByGenre, ([genre, rating]) => ({ genre, rating }));

            const numGenres = avgRatingsArray.length;
            const barWidth = 35; 
            const margin = { top: 20, right: 30, bottom: 100, left: 80}; 
            const width = numGenres * barWidth + margin.left + margin.right;
            const height = 350; 

            svg.attr('width', width)
                .attr('height', height);

            const xScale = d3.scaleBand()
                .domain(avgRatingsArray.map(d => d.genre))
                .range([margin.left, width - margin.right]) 
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(avgRatingsArray, d => d.rating)])
                .nice()
                .range([height - margin.bottom, margin.top]); 

            svg.selectAll("rect")
                .data(avgRatingsArray)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.genre))
                .attr("y", d => yScale(d.rating))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - yScale(d.rating))
                .attr("fill", "steelblue")
                .on("click", (event, d) => self.con.handleBarClick(d));

            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end")
                .attr("x", -9) 
                .attr("y", 6); 

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale));

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

    handleBarClick(d) {
        this.con.handleBarClick(d);
    }
}

const root = d3.select("body");
const con = {
    handleBarClick: function(data) {
        console.log("Clicked on Genre: ", data.genre, " with Rating: ", data.rating);
    }
};

new ViewA(con, root);
