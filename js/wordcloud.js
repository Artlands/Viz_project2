d3.json("data/year-actors.json").then( data => {

  totalnum = 200;
  dataset = data["1990"];
  if (dataset.length >= totalnum) {
    reducedDataset = dataset.slice(1,totalnum);
  }
  else {
    reducedDataset = dataset;
  }

  var cloud = Highcharts.chart('wordcloud', {
      series: [{
          type: 'wordcloud',
          data: reducedDataset,
          name: 'Occurrences'
      }],
      title: {
          text: 'Wordcloud of actors'
      }
  });

  //------------------------------------------ slider
  var slider = d3
    .sliderHorizontal()
    .min(1903)
    .max(2011)
    .ticks(20)
    .step(1)
    .width(960)
    .default(1990)
    .displayValue(false)
    .on('onchange', val => {
      d3.select('#value').text(val);

      updateDataset = data[val.toString()];

      if (updateDataset.length >= totalnum) {
        reducedDataset = updateDataset.slice(1,totalnum);
      }
      else {
        reducedDataset = updateDataset;
      }

      cloud.series[0].setData(reducedDataset);
  //------------------------------------------ plot given slider value
    });

  d3.select('#slider')
    .append('svg')
    .attr('width', 1080)
    .attr('height', 80)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);

});
