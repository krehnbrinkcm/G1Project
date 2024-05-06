class Control {
  constructor() {
      const root = d3.select('body').append('div')
          .style('width', '96vw')
          .style('height', '60vw');

      this.viewA = new ViewA(this, root);
      this.viewB = new ViewB(this, root);
      this.viewC = new ViewC(this, root);

      this.updateViewB = this.updateViewB.bind(this);
  }

  updateViewB(data) {
      console.log("Updating graph in View B with:", data);
      this.viewB.updateGraph(data);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const control = new Control();  // Create an instance of Control when the DOM is fully loaded
});