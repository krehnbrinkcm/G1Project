class ViewC {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');

		const select = div.append('select')
		.style('width', '100px')
		.style('height', '50px')
		.style('position', 'absolute')
		.style('left', '49.5%')
		.style('top', '56%')
	
        const svg = div.append('svg');
		
		

        d3.csv("Books_df.csv").then(function(data) {



			
		});
    }
}