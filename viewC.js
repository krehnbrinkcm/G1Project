class ViewC {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');

        d3.csv("Books_df.csv").then(function(data) {

			let i = 0;
			const subs = [];
			const auths = [];

			while(i < data.length)
			{
				subs[i] = data[i]['Sub Genre'];
				i++;
			}

			const subgenres = removeExtras(subs);
			subgenres.sort();

			const select = div.append('select')
				.style('width', '230px')
				.style('height', '35px')
				.style('position', 'relative')
				.style('left', '2%')
				.style('top', '2%')
				.attr('id', 'selectButton');

			d3.select('#selectButton').selectAll('myOptions')
				.data(subgenres)
				.join('option')
				.text(function (d) { return d;})
				.attr("value", function (d) {return d;});
			
			const svg = div.append('svg')
				.style('position', 'relative')
				.style('left', '0%')
				.style('top', '4%')
				.attr('width','100%')
				.attr('height','89%');

			let current = 'Action & Adventure';
			const curBooks = data.filter((book) => book['Sub Genre'] == current);
			
			i = 0;
			while(i < curBooks.length)
			{
				auths[i] = curBooks[i]['Author'];
				i++;
			}
			const authors = removeExtras(auths);
			authors.sort;
			
			const bubbleList = makeBubbleList(authors, curBooks);

			const xScale = d3.scalePoint().domain(authors).range([50, 700])
			const yScale = d3.scaleLinear().domain([0, 5]).range([320, 50])
			const colorScale = d3.scaleLinear().domain([1, 5]).range(["#4dc9e6", "#210cae"]);
			const sizeScale = d3.scaleLinear().domain([Math.min(...(bubbleList.map(d => d.numRatings))), Math.max(...(bubbleList.map(d => d.numRatings)))]).range([5, 40])

			var bubbles = svg.append('g').attr('class','bubbles').selectAll('circle')
				.data(bubbleList)
				.join('circle')
				.attr('cx', function(d){return xScale(d['author'])})
				.attr('cy', function(d){return yScale(d['avgRating'])})
				.attr('r', function(d){return sizeScale(d['numRatings'])})
				.attr('fill', function(d){return colorScale(d['booksWritten'])})
				.attr('stroke', 'none')
				.attr('stroke-width', 3)
				.attr('opacity', 0.7)

			var xaxis = svg.append('g')
				.attr('transform', 'translate(0, 320)')
				.call(d3.axisBottom(xScale))
				.attr("class", "xaxis")
				.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", "rotate(-65)")
				.text(function(d){return d.substring(0,13) + '.'});

			var yaxis = svg.append('g')
				.attr('transform', 'translate(50, 0)')
				.call(d3.axisLeft(yScale));

			function update(selectedGroup){
				const auths = [];
				const curBooks = data.filter((book) => book['Sub Genre'] == selectedGroup);
			
				i = 0;
				while(i < curBooks.length)
				{
					auths[i] = curBooks[i]['Author'];
					i++;
				}
				const authors = removeExtras(auths);
				authors.sort;
				
				const bubbleList = makeBubbleList(authors, curBooks);
				
				const xScale = d3.scalePoint().domain(authors).range([50, 700])
				const sizeScale = d3.scaleLinear().domain([Math.min(...(bubbleList.map(d => d.numRatings))), Math.max(...(bubbleList.map(d => d.numRatings)))]).range([5, 40])
					
				d3.selectAll('g.bubbles').remove();
				d3.selectAll('circle').remove();
				bubbles = svg.append('g').attr('class','bubbles').selectAll('circle')
					.data(bubbleList)
					.join('circle')
					.attr('cx', function(d){return xScale(d['author'])})
					.attr('cy', function(d){return yScale(d['avgRating'])})
					.attr('r', function(d){return sizeScale(d['numRatings'])})
					.attr('fill', function(d){return colorScale(d['booksWritten'])})
					.attr('stroke', 'none')
					.attr('stroke-width', 3)
					.attr('opacity', 0.7)
			
				d3.selectAll("g.xaxis").remove();

				xaxis = svg.append('g')
					.attr('transform', 'translate(0, 320)')
					.call(d3.axisBottom(xScale))
					.attr("class", "xaxis")
					.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", ".15em")
					.attr("transform", "rotate(-65)")
					.text(function(d){return d.substring(0,13) + '.'});
			}

			d3.select("#selectButton").on("change", function() {	
				var selectedOption = d3.select(this).property("value")
				update(selectedOption)
			});
		});

		function removeExtras(data){
			//remove duplicate values for making selector
			return data.filter((value, index) => data.indexOf(value) === index);
		}

		function makeBubble(data, auth){
			let i = 0;
			let count = 0;
			const bubble = new Object();
			bubble.author = auth;
			bubble.numRatings = 0;
			bubble.avgRating = 0;
			while(i < data.length)
			{
				if(data[i]['Author'] == auth)
				{
					bubble.numRatings += parseFloat(data[i]['No. of People rated']);
					bubble.avgRating += parseFloat(data[i]['Rating']);
					count++;
				}
				i++;
			}
			bubble.avgRating = (bubble.avgRating)/count
			bubble.booksWritten = count;
			return bubble;
		}

		function makeBubbleList(authors, books)
		{
			let i = 0;
			const bubbleList = [];
			while(i < authors.length)
			{
				bubbleList[i] = makeBubble(books, authors[i])
				i++;
			}
			return bubbleList;
		}

    }
}