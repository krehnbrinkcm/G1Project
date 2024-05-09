class ViewB2 {
    constructor(con, root) {
        this.con = con;
        this.selectedData = [];

        const div = root.append('div')
            .style('width', '50%')
            .style('height', '50%');
		
		
        this.svg = div.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');
	}

	updateView(newData){
	const svg = this.svg;
	const genre = newData.genre;
	d3.csv("Books_df.csv").then(function(data) {
		
		const curBooks = data.filter((book) => book['Main Genre'] == genre);

		const meds = [];
	
		let i = 0;
		while(i < curBooks.length)
		{
			meds[i] = curBooks[i]['Type'];
			i++;
		}
		const mediums = removeExtras(meds);
		mediums.sort();
		const barList = makeBarList(mediums, curBooks);

		d3.selectAll("g.yaxis").remove();
		d3.selectAll("g.xaxis").remove();

		const xScale = d3.scaleLinear().domain([0, 5]).range([150, 700]);
		const yScale = d3.scaleBand().domain(mediums).range([450, 25]).padding(.7);

		var yaxis = svg.append('g')
			.attr('transform', 'translate(150, 0)')
			.call(d3.axisLeft(yScale))
			.attr('class', 'yaxis');

		var xaxis = svg.append('g')
			.attr('transform', 'translate(0, 450)')
			.call(d3.axisBottom(xScale))
			.attr('class', 'xaxis');
		
        const bars = svg.selectAll("rect")
            .data(barList)
            .join("rect")
            .attr("x", 150)
            .attr("y", d => yScale(d.medium))
            .attr("width", d => xScale(d.avgRating) - 150)
            .attr("height", yScale.bandwidth())
            .attr("fill", "steelblue")
	
		function removeExtras(data){
			//remove duplicate values for making selector
			return data.filter((value, index) => data.indexOf(value) === index);
		}
		function makeBar(data, med){
			let i = 0;
			let count = 0;
			const bar = new Object();
			bar.medium = med;
			bar.avgRating = 0;
			while(i < data.length)
			{
				if(data[i]['Type'] == med)
				{
					bar.avgRating += parseFloat(data[i]['Rating']);
					count++;
				}
				i++;
			}
			bar.avgRating = (bar.avgRating)/count
			return bar;
		}

		function makeBarList(mediums, books)
		{
			let i = 0;
			const barList = [];
			while(i < mediums.length)
			{
				barList[i] = makeBar(books, mediums[i])
				i++;
			}
			return barList;
		}
	});

	}
}
