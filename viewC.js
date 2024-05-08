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
				.text(function (d) { return d;}) // text showed in the menu
				.attr("value", function (d) {return d;})
			
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
			console.log(authors);

			const xScale = d3.scalePoint().domain(authors).range([100, 750])
			const yScale = d3.scaleLinear().domain([0, 5]).range([250, 50])

			const bubbles = svg.append('g').selectAll('circle')
				.data(curBooks)
				.join('circle')
				.attr('cx', function(d){return xScale(d['Author'])})
				.attr('cy', function(d){return yScale(d['Rating'])})
				.attr('r', 5)
				.attr('fill', 'none')
				.attr('stroke', 'grey')
				.attr('stroke-width', 3);

			function update(selectedGroup){
					console.log(selectedGroup);
					//change bubbles here based on drop down selection
					const curBooks = data.filter((book) => book['Sub Genre'] == selectedGroup);
					const auths = [];
					let i = 0;
					while(i < curBooks.length)
					{
						auths[i] = curBooks[i]['Author'];
						i++;
					}
					const authors = removeExtras(auths);
					authors.sort;

					const xScale = d3.scalePoint().domain(authors).range([100, 750])
					const yScale = d3.scaleLinear().domain([0, 5]).range([250, 50])

					bubbles
						.data(curBooks)
						.join('circle')
						.attr('cx', function(d){return xScale(d['Author'])})
						.attr('cy', function(d){return yScale(d['Rating'])})
						.attr('r', 5)
						.attr('fill', 'none')
						.attr('stroke', 'grey')
						.attr('stroke-width', 3);
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

    }
}