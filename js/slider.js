// //------------------------------------------ slider
// var slider = d3
//   .sliderHorizontal()
//   .min(1903)
//   .max(2011)
//   .ticks(20)
//   .step(1)
//   .width(960)
//   .default(2000)
//   .displayValue(false)
//   .on('onchange', val => {
//     d3.select('#value').text(val);
//
// //------------------------------------------ plot given slider value
//   });
//
// d3.select('#slider')
//   .append('svg')
//   .attr('width', 1080)
//   .attr('height', 80)
//   .append('g')
//   .attr('transform', 'translate(30,30)')
//   .call(slider);
