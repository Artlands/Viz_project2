// based on prepared DOM, initialize echarts instance
var myChart = echarts.init(document.getElementById('network'));

myChart.showLoading();
$.get('data/movie-network.json', function (movie_network) {
    this_network = movie_network["1980"]
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
              // initLayout: 'circular'
              // repulsion: 20,
              edgeLength: 100,
              repulsion: 200,
              gravity: 0.2
            },
            edges: this_network.links
        }]
    };

    myChart.setOption(option);
});
