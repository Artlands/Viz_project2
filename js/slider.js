// based on prepared DOM, initialize echarts instance
var myChart = echarts.init(document.getElementById('network'));
myChart.showLoading();
//Network parameters
edge_length = 150,
repulsion_set = 200,
gravity_set = 0.1

d3.json("data/year-actors.json").then( actor_word => {
  $.get('data/movie-network.json', function (movie_network) {
//------------------------------------------ wordcloud
    totalnum = 200;
    dataset = actor_word["1990"];
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

//------------------------------------------ network
    this_network = movie_network["1990"]
    myChart.hideLoading();
    console.log(this_network.nodes)
    option = {
        legend: {
            data: ['0-Star', '1-Star', '2-Star', '3-Star', '4-Star', '5-Star']
        },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            draggable: true,
            data: this_network.nodes.map( node => {
              node.id = node["id"];
              return node;
            }),
            categories: this_network.categories,
            force: {
              initLayout: 'circular',
              edgeLength: edge_length,
              repulsion: repulsion_set,
              gravity: gravity_set
            },
            edges: this_network.links
        }]
    };

    myChart.setOption(option);

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
//------------------------------------------ wordcloud control
      update_word = actor_word[val.toString()];
      if (update_word.length >= totalnum) {
        reduced_word = update_word.slice(1,totalnum);
      }
      else {
        reduced_word = update_word;
      }

      cloud.series[0].setData(reduced_word);
//------------------------------------------ network control
      myChart.showLoading();
      update_network = movie_network[val]
      update_option = {
          legend: {
              data: ['0-Star', '1-Star', '2-Star', '3-Star', '4-Star', '5-Star']
          },
          series: [{
              type: 'graph',
              layout: 'force',
              animation: false,
              label: {
                  normal: {
                      position: 'right',
                      formatter: '{b}'
                  }
              },
              draggable: true,
              data: update_network.nodes.map( node => {
                node.id = node["id"];
                return node;
              }),
              categories: update_network.categories,
              force: {
                initLayout: 'circular',
                edgeLength: edge_length,
                repulsion: repulsion_set,
                gravity: gravity_set
              },
              edges: update_network.links
          }]
       };
       myChart.hideLoading();
       myChart.setOption(update_option);

    });

  d3.select('#slider')
    .append('svg')
    .attr('width', 1080)
    .attr('height', 80)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);

  });
});
