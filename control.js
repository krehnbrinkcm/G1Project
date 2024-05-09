new (class Control {
    constructor() {
        const root = d3.select('body').append('div')
        .style('width', '96vw')
        .style('height', '60vw')

        this.viewA = new ViewA(this, root);
        this.viewB = new ViewB(this, root);
        this.viewC = new ViewC(this, root);
		// const lab = d3.select('body').selectAll('div').append('label');
		// lab.text("choose a view");
		// this.label = lab;
    }

    Test(str) {
		this.label.text(str);
    }

    handleBarClick(data) {
      this.viewB.updateView(data);
  }
})()