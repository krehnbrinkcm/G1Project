class ViewC {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');

		d3.csv("Sub_Genre_df.csv").then(function(data) {

			const select = div.append('select')
				.style('width', '230px')
				.style('height', '35px')
				.style('position', 'relative')
				.style('left', '2%')
				.style('top', '2%')
				.attr('id', 'selectButton');

			d3.select('#selectButton').selectAll('myOptions')
				.data(data)
				.join('option')
				.text(function (d) { return d['Title']; }) // text showed in the menu
				.attr("value", function (d) {return d['Title'];})
			
			d3.select("#selectButton").on("change", function(d) {
				// recover the option that has been chosen
				var selectedOption = d3.select(this).property("value")
				// run the updateChart function with this selected option
				update(selectedOption)
			});

			const svg = div.append('svg')
				.style('position', 'relative')
				.style('left', '0%')
				.style('top', '4%')
				.attr('width','100%')
				.attr('height','89%');
		});
		

        d3.csv("Books_df.csv").then(function(data) {



			
		});

		function update(selectedGroup){

			console.log(selectedGroup);

		}
    }
}