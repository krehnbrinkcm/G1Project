class ViewC {
    constructor(con, root) {
        this.con = con;

        const div = root.append('div')
        .style('width','50%')
        .style('height','50%');

		//const button = div.append('button');
		const select = div.append('select')
		.style('width', '120px')
		.style('height', '60px')
		//.style('position', 'absolute')
		.style('left', '75%')
		.style('top', '120%')
		//div1.setAttribute('id', 'div1');
		//div1.setAttribute("style","width:500px");
        const svg = div.append('svg');
		
		

        d3.csv("Books_df.csv").then(function(data) {



			
		});
    }
}