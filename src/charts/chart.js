import React, { Component } from 'react';

import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
//import { tsvParse, csvParse } from 'd3-dsv';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { stack } from 'd3-shape';


import { connect } from 'react-redux';
import _ from 'lodash';
import { ratesSelector } from '../actions/actions';


class D3 extends Component {
    constructor(props) {
        super(props);
        this.d3Node = null;
        this.data = [];
    }
    shouldComponentUpdate() {
        if (!_.isEqual(this.props.data, this.data)) {
            this.data = this.props.data;
            return true;
        }
        return false;
    }

    render() {
        //console.log('render D3');
        return (
            <svg width={this.props.size[0]} height={this.props.size[1]} ref={node => { if (node) { this.props.d3render(node, this.props); } }}>
            </svg>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: ratesSelector(state)
    }
}

const D3Component = connect(mapStateToProps)(D3);

export default D3Component;


export const createBarChart = (d3node, { data, size }) => {

    var chart = select(d3node.firstChild);
    chart.remove();

    var svg = select(d3node),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    var y = scaleLinear()
        .rangeRound([height, 0]);

    var z = scaleOrdinal()
        .range(["#00abc5", "#ff8c00"]);

    
    var keys = ['mortgage','amortisation'];
    var xScale= [];
    for(let j= 0; j <=50; ++j)
        xScale.push(j);
    data= data.slice(0,51);    
    x.domain(xScale, data.map(function (d,i) {  return i; }));
    y.domain([0, max(data, function (d) { return d.total; })]).nice();
    z.domain(keys);

    g.append("g")
        .selectAll("g")
        .data(stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function (d) { return z(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d,i) {
            return x(i);
        })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x))
        .append('text')
         .attr("x", x(50)+ 20)
        .attr("y", 12)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start").text('years');

    g.append("g")
        .attr("class", "axis")
        .call(axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("€");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) { return d; });
    

}



// const extData = () =>
// {
//     var x,y,z;
//  var populationData = csvParse(population, function (d, i, columns) {
//         var t = 0;
//         for (i = 1; i < columns.length; ++i) {
//             t += parseInt(d[columns[i]], 10);
//         }
//         d.total = t;
//         return d;
//     });

//     //console.log(xxx);
//        //console.log(keys);

//     //xxx.map(  function (data) {
//     //    console.log(data);

//     var keys =populationData.columns; 
//     //populationData.sort(function (a, b) { return b.total - a.total; });
//     x.domain(populationData.map(function (d) { return d.State; }));
//     y.domain([0, max(populationData, function (d) { return d.total; })]).nice();
//     z.domain(keys);

// }

// export const createBarChartX = (d3node, { data, size }) => {
//     //export const createBarChart = (d3node,  data) => {
//     //let size=[600,400];
//     const dataMax = max(data);

//     const yScale = scaleLinear()
//         .domain([0, dataMax])
//         .range([0, size[1]]);


//     select(d3node)
//         .selectAll('rect')
//         .data(data)
//         .enter()
//         .append('rect');

//     select(d3node)
//         .selectAll('rect')
//         .data(data)
//         .exit()
//         .remove();

//     select(d3node)
//         .selectAll('rect')
//         .data(data)
//         .style('fill', '#fe1122')
//         .attr('x', (d, i) => i * 25)
//         .attr('y', d => size[1] - yScale(d))
//         .attr('height', d => yScale(d))
//         .attr('width', 25);

// };

// const population = `State,Under 5 Years,5 to 13 Years,14 to 17 Years,18 to 24 Years,25 to 44 Years,45 to 64 Years,65 Years and Over
// AL,310504,552339,259034,450818,1231572,1215966,641667
// AK,52083,85640,42153,74257,198724,183159,50277
// AZ,515910,828669,362642,601943,1804762,1523681,862573
// AR,202070,343207,157204,264160,754420,727124,407205
// CA,2704659,4499890,2159981,3853788,10604510,8819342,4114496
// CO,358280,587154,261701,466194,1464939,1290094,511094
// CT,211637,403658,196918,325110,916955,968967,478007
// DE,59319,99496,47414,84464,230183,230528,121688
// DC,36352,50439,25225,75569,193557,140043,70648
// FL,1140516,1938695,925060,1607297,4782119,4746856,3187797
// GA,740521,1250460,557860,919876,2846985,2389018,981024
// HI,87207,134025,64011,124834,356237,331817,190067
// ID,121746,201192,89702,147606,406247,375173,182150
// IL,894368,1558919,725973,1311479,3596343,3239173,1575308
// IN,443089,780199,361393,605863,1724528,1647881,813839
// IA,201321,345409,165883,306398,750505,788485,444554
// KS,202529,342134,155822,293114,728166,713663,366706
// KY,284601,493536,229927,381394,1179637,1134283,565867
// LA,310716,542341,254916,471275,1162463,1128771,540314
// ME,71459,133656,69752,112682,331809,397911,199187
// MD,371787,651923,316873,543470,1556225,1513754,679565
// MA,383568,701752,341713,665879,1782449,1751508,871098
// MI,625526,1179503,585169,974480,2628322,2706100,1304322
// MN,358471,606802,289371,507289,1416063,1391878,650519
// MS,220813,371502,174405,305964,764203,730133,371598
// MO,399450,690476,331543,560463,1569626,1554812,805235
// MT,61114,106088,53156,95232,236297,278241,137312
// NE,132092,215265,99638,186657,457177,451756,240847
// NV,199175,325650,142976,212379,769913,653357,296717
// NH,75297,144235,73826,119114,345109,388250,169978
// NJ,557421,1011656,478505,769321,2379649,2335168,1150941
// NM,148323,241326,112801,203097,517154,501604,260051
// NY,1208495,2141490,1058031,1999120,5355235,5120254,2607672
// NC,652823,1097890,492964,883397,2575603,2380685,1139052
// ND,41896,67358,33794,82629,154913,166615,94276
// OH,743750,1340492,646135,1081734,3019147,3083815,1570837
// OK,266547,438926,200562,369916,957085,918688,490637
// OR,243483,424167,199925,338162,1044056,1036269,503998
// PA,737462,1345341,679201,1203944,3157759,3414001,1910571
// RI,60934,111408,56198,114502,277779,282321,147646
// SC,303024,517803,245400,438147,1193112,1186019,596295
// SD,58566,94438,45305,82869,196738,210178,116100
// TN,416334,725948,336312,550612,1719433,1646623,819626
// TX,2027307,3277946,1420518,2454721,7017731,5656528,2472223
// UT,268916,413034,167685,329585,772024,538978,246202
// VT,32635,62538,33757,61679,155419,188593,86649
// VA,522672,887525,413004,768475,2203286,2033550,940577
// WA,433119,750274,357782,610378,1850983,1762811,783877
// WV,105435,189649,91074,157989,470749,514505,285067
// WI,362277,640286,311849,553914,1487457,1522038,750146
// WY,38253,60890,29314,53980,137338,147279,65614
// `;

// export const createBarChart = (d3node, { data, size }) => {

//     var chart = select(d3node.firstChild);
//     chart.remove();

//     var svg = select(d3node),
//         margin = { top: 20, right: 20, bottom: 30, left: 40 },
//         width = +svg.attr("width") - margin.left - margin.right,
//         height = +svg.attr("height") - margin.top - margin.bottom,
//         g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var x = scaleBand()
//         .rangeRound([0, width])
//         .paddingInner(0.05)
//         .align(0.1);

//     var y = scaleLinear()
//         .rangeRound([height, 0]);

//     var z = scaleOrdinal()
//         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//     var populationData = csvParse(population, function (d, i, columns) {
//         var t = 0;
//         for (i = 1; i < columns.length; ++i) {
//             t += parseInt(d[columns[i]], 10);
//         }
//         d.total = t;
//         return d;
//     });

//     //console.log(xxx);
//        //console.log(keys);

//     //xxx.map(  function (data) {
//     //    console.log(data);

//     var keys =populationData.columns.slice(1);
 
//     populationData.sort(function (a, b) { return b.total - a.total; });
//     x.domain(populationData.map(function (d,i) { return i; }));
//     y.domain([0, max(populationData, function (d) { return d.total; })]).nice();
//     z.domain(keys);

//     g.append("g")
//         .selectAll("g")
//         .data(stack().keys(keys)(populationData))
//         .enter().append("g")
//         .attr("fill", function (d) { return z(d.key); })
//         .selectAll("rect")
//         .data(function (d) { return d; })
//         .enter().append("rect")
//         .attr("x", function (d) {
//             return x(d.data.State);
//         })
//         .attr("y", function (d) { return y(d[1]); })
//         .attr("height", function (d) { return y(d[0]) - y(d[1]); })
//         .attr("width", x.bandwidth());

//     g.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(axisBottom(x));

//     g.append("g")
//         .attr("class", "axis")
//         .call(axisLeft(y).ticks(null, "s"))
//         .append("text")
//         .attr("x", 2)
//         .attr("y", y(y.ticks().pop()) + 0.5)
//         .attr("dy", "0.32em")
//         .attr("fill", "#000")
//         .attr("font-weight", "bold")
//         .attr("text-anchor", "start")
//         .text("Population");

//     var legend = g.append("g")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", 10)
//         .attr("text-anchor", "end")
//         .selectAll("g")
//         .data(keys.slice().reverse())
//         .enter().append("g")
//         .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

//     legend.append("rect")
//         .attr("x", width - 19)
//         .attr("width", 19)
//         .attr("height", 19)
//         .attr("fill", z);

//     legend.append("text")
//         .attr("x", width - 24)
//         .attr("y", 9.5)
//         .attr("dy", "0.32em")
//         .text(function (d) { return d; });
    

// }





// const type = d => {
//     d.money = +d.money;
//     return d;
// }

// const dd = `year	money	number
// 2005	550	    35
// 2006	600	    40
// 2007	700	    45
// 2008	800	    60
// 2009	900	    70
// 2010	850	    65
// 2011	880	    67
// 2012	900	    70
// 2013	1000	75`;

// const data = tsvParse(dd, type);


// export const dual = (node, data) => {


//     var graph = select('.ccc');
//     graph.select('svg').remove();
//     var svg = graph.append('svg')
//         .attr('width', 600)
//         .attr(height, 400);

//     // var svg = select('.ccc').append('svg')
//     // .attr('width', 600)
//     // .attr(height, 400);

//     //var svg = select('svg');
//     //node= select('svg');
//     // if(!node){
//     //     return;
//     // }

//     console.log('dual');

//     //svg.selectAll('g').remove();
//     // while (svg.firstChild) {
//     //     console.log('remove');
//     //     svg.removeChild(svg.firstChild);
//     // }

//     var margin = { top: 80, right: 80, bottom: 80, left: 80 },
//         width = 600 - margin.left - margin.right,
//         height = 400 - margin.top - margin.bottom;
//     var x = scaleBand().rangeRound([0, width], .1);
//     //.rangBoundBands([0, width], .1);
//     var y0 = scaleLinear().domain([300, 1100]).range([height, 0]),
//         y1 = scaleLinear().domain([20, 80]).range([height, 0]);

//     //var svg = select(node).select('svg');

//     var xAxis = axisBottom(x);
//     // create left yAxis
//     var yAxisLeft = axisLeft(y0).ticks(4);
//     // create right yAxis
//     var yAxisRight = axisRight(y1).ticks(6);
//     //var svg = select('svg'); //select(node);//d3.select("body").append("svg")
//     //svg.remove('g');
//     svg
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom);

//     svg = svg.append("g")
//         .attr("class", "graph")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//     x.domain(data.map(function (d) { return d.year; }));
//     y0.domain([0, max(data, function (d) { return d.money; })]);

//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//     svg.append("g")
//         .attr("class", "y axis axisLeft")
//         .attr("transform", "translate(0,0)")
//         .call(yAxisLeft)
//         .append("text")
//         .attr("y", 6)
//         .attr("dy", "-2em")
//         .style("text-anchor", "end")
//         .style("text-anchor", "end")
//         .text("Dollars");

//     svg.append("g")
//         .attr("class", "y axis axisRight")
//         .attr("transform", "translate(" + (width) + ",0)")
//         .call(yAxisRight)
//         .append("text")
//         .attr("y", 6)
//         .attr("dy", "-2em")
//         .attr("dx", "2em")
//         .style("text-anchor", "end")
//         .text("#");
//     var bars = svg.selectAll(".bar").data(data).enter();
//     bars.append("rect")
//         .attr("class", "bar1")
//         .attr("x", function (d) { return x(d.year); })
//         .attr("width", 20)
//         .attr("y", function (d) { return y0(d.money); })
//         .attr("height", function (d, i, j) { return height - y0(d.money); });
//     bars.append("rect")
//         .attr("class", "bar2")
//         .attr("x", function (d) { return x(d.year) + 25; })
//         .attr("width", 20)   //x.rangeBand() / 2
//         .attr("y", function (d) { return y1(d.number); })
//         .attr("height", function (d, i, j) { return height - y1(d.number); }); //y1(d.number);
//     //});

// }

// const Chart = ({ data, size }) => {

//     const dataMax = max(data);
//     const yScale = scaleLinear()
//         .domain([0, dataMax])
//         .range([0, size[1]]);

//     const bars = data.map((d, i) => {
//         return (
//             <rect fill='#fe9922' x={i * 25} y={size[1] - yScale(d)} height={yScale(d)} width='25' key={`chart${i}`}  >
//             </rect>
//         );
//     });

//     return (
//         <svg width={500} height={500}>
//             {bars}
//         </svg>
//     );
// };




// const ChartX = ({ data, size }) => {



//     const createBarChart = (d3node) => {

//         const dataMax = max(data);
//         const yScale = scaleLinear()
//             .domain([0, dataMax])
//             .range([0, size[1]]);


//         select(d3node)
//             .selectAll('rect')
//             .data(data)
//             .enter()
//             .append('rect');

//         select(d3node)
//             .selectAll('rect')
//             .data(data)
//             .exit()
//             .remove();

//         select(d3node)
//             .selectAll('rect')
//             .data(data)
//             .style('fill', '#fe1122')
//             .attr('x', (d, i) => i * 25)
//             .attr('y', d => size[1] - yScale(d))
//             .attr('height', d => yScale(d))
//             .attr('width', 25);

//     }
//     return (
//         <svg width={size[0]} height={size[1]} ref={node => { if (node) { createBarChart(node); } }}>

//         </svg>
//     );
// };


// class D3 extends Component {
//     constructor(props) {
//         super(props);
//         this.d3Node = null;
//         this.data = [1, 2];
//     }
//     shouldComponentUpdate() {
//         if (!_.isEqual(this.props.data, this.data)) {
//             this.data = this.props.data;
//             return true;
//         }

//         return false;
//     }

//     componentDidMount() {
//         //if(this.d3Node){
//         //this.d3Node= this.d3Node; //.querySelector('svg');
//         //console.log('mount', React.Children.count(this.props.children));
//         //}
//         this.forceUpdate();
//     }

//     // render() {
//     //     return (
//     //         <svg width={this.props.size[0]} height={this.props.size[1]} >
//     //             {this.props.d3render(this.d3Node, this.props)}
//     //         </svg>
//     //     );
//     //}

//     render() {
//         return (
//             <div className="ccc">
//                 {this.props.d3render(this.d3Node, this.props.data)}
//             </div>
//         );
//     }
// }
//console.log('ref', node);

// const D3 = (props) => {
//     if(d3Node){

//     console.log('render') ;
//     return (
//         <svg width={props.size[0]} height={props.size[1]} ref={node => { console.log('ref');d3Node=node; }}>
//             { props.d3render(d3Node, props) }
//         </svg>
//     );
// }
//    return (
//         <svg width={props.size[0]} height={props.size[1]} ref={node => { if (node){d3Node=node;} }}>

//         </svg>
//     );

// };


// const D3 = (props) => {
//     return (
//         <svg width={props.size[0]} height={props.size[1]} ref={node => {  if (node) { props.d3render(node, props); } }}> 
//         </svg>
//     );
// };
