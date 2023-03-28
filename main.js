const auToLy = 63240
var data,terrest,clusterSelect,width,height,w,h,filteredData;
var svg,planets,orbits,colorScale,colorLegend,typeLegend,bardata,barsvg;
var seacreatures = { "Neptune-like" :"Seacreatures/shark.svg", 
 "Gas Giant": "Seacreatures/octopus.svg","Super Earth":"Seacreatures/dolphin.svg",
 "Terrestrial": "Seacreatures/seahorse.svg",
    "Earth": "Seacreatures/Earth.svg", "Unknown" : "Seacreatures/unknown.svg" }
// AU to light year "for an approximate result, divide the length value by 63240"
document.addEventListener('DOMContentLoaded', function()
{
    Promise.all([d3.csv('data/top50_1.csv',d3.autoType)])
    .then(function (values)
    {   
        data = values[0]
        console.log(data)


        data.forEach(function(d) {
         
            d['orbital_radius'] = d['orbital_radius'] / auToLy;
          });
        console.log(data)
        w = 1200;
        h = 1000;
        svg = d3.select("#visualization")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
        margin = { top: 10, right: 30, bottom: 10, left: 100 };  
        width = 1000 - margin.left - margin.right;
        height = 800 - margin.top - margin.bottom;      
        svg.attr('transform', `translate(${margin.left + 100},${margin.top})`);
        DrawChart()
        legends()
        barsvg = svg.append("g")
        .attr("class","typebar")
        .attr("transform","translate(" + (width) + "," + (height - 400) + ")")
    })
})
// Setting up the SVG container
function Updatechart()
{
    orbits.remove()
    planets.remove()
    typeLegend.remove()
    colorLegend.remove()
    DrawChart()
    legends()

}
function DrawChart()
{
    
    var cluster = document.getElementById('cluster-select').value;
    console.log(cluster)
    filteredData = data.filter(function(d) { return d.clusters == cluster; });    
    console.log(filteredData)

        // var colorScale = d3.scaleLinear()
        // .domain([d3.min(filteredData, function(d) { return d.stellar_magnitude; }), 
        //             d3.max(filteredData, function(d) { return d.stellar_magnitude; })])
        // .range(["blue", "yellow"]);
        // var color = d3.interpolateViridis(0.7) //d3.interpolateRgbBasis(["red", "yellow", "blue"])(0.5)  //d3.schemeSpectral[11]
        //COLOR SCALE
        colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateViridis)//  desired color scheme .interpolator(d3.interpolateViridis) 
        .domain([d3.max(filteredData, d => d.stellar_magnitude), d3.min(filteredData, d => d.stellar_magnitude)]); 

        // RADIUS SCALE
        const radiusScale = d3.scaleLog()
                .domain(d3.extent(filteredData, function(d) { return d.radius_multiplier; })) // range of distances in light years
                .range([25, 50]); 

        //ORBIT SCALE
        const orbitScale = d3.scaleLog()
                .domain(d3.extent(filteredData, function(d) { return d.orbital_radius; })) // range of orbit radii in AU
                .range([30, Math.max(width / 2,height/2) - 50]); 
        // const eccentricityScale = d3.scaleLinear()
        //         .domain(d3.extent(data, function(d) { return d.eccentricity }))
        //         .range([0.2, 0.8]);
        
        // function convertry(r,e) {
        //     return r * Math.sqrt(1 - Math.pow(e,2))
        // }
        
         orbits = svg.selectAll(".orbit")
			.data(filteredData)
			// .enter()
			.join("circle")
            .attr("id",d => "orbit_"+ d.name.replaceAll(" ","_"))
			.attr("cx", width/2 )
			.attr("cy", height / 2)
			.attr("r", d => orbitScale(d.orbital_radius))
			// .attr("ry", d=> orbitScale(d.orbital_radius))
            // convertry(orbitScale(d.orbital_radius) , eccentricityScale(d.eccentricity)))
            // d=>  orbitScale(d.orbital_radius) * eccentricityScale(d.eccentricity))
			.style("fill", "none")
			.style("stroke", "white")
			.style("stroke-width", 1)
            .style("opacity",0.3);

        
            // const planets = svg.selectAll("image")
            //   .data(filteredData)
            //   .enter()
            //   .append("image")
            //   .attr("xlink:href", d=>seacreatures[d.planet_type])
            //   .attr("width", 10)
            //   .attr("height",10)
            //   .attr("class", "planet")
            //   .style("mix-blend-mode", "multiply")
            //   .style("pointer-events", "none")
            //   .attr("transform", function(d) {
            //     const radius = orbitScale(d.orbital_radius);
            //     // const orbitEccentricity = eccentricityScale(d.eccentricity);
            //     const orbitAngle = Math.random() * Math.PI * 2;
            //     const x = width/2 + radius * Math.cos(orbitAngle) -3;
            //     const y = height/2 + radius * Math.sin(orbitAngle) -3;
            //     return "translate(" + x + "," + y + ")";
            //   })
            //   .attr("fill", function(d) { return colorScale(d.stellar_magnitude); });            

       
          
        planets = svg.selectAll("image")
                .data(filteredData)
                // .enter()
                .join("image")
                .attr("width", d => radiusScale(d.radius_multiplier))
                .attr("height",d => radiusScale(d.radius_multiplier))
                .attr("class", "planet")
                .style("mix-blend-mode", "multiply")
                // .style("pointer-events", "none")
                .attr("transform", function (d) {
                const radius = orbitScale(d.orbital_radius);
                const orbitAngle = Math.random() * Math.PI * 2;
                const x = width / 2 + radius * Math.cos(orbitAngle) - 15;
                const y = height / 2 + radius * Math.sin(orbitAngle) - 15;
                return "translate(" + x + "," + y + ")";
                })
                .each(function (d) {
                const planet = d3.select(this);
                const fill = colorScale(d.stellar_magnitude);
                const url = seacreatures[d.planet_type];
                loadImageWithFill(url, fill, (imageNode) => {
                    // Create a data URL from the modified SVG
                    const svgString = new XMLSerializer().serializeToString(imageNode);
                    const encodedSvg = btoa(svgString);
                    const imageUrl = 'data:image/svg+xml;base64,' + encodedSvg;

                    // Set the 'xlink:href' attribute to the modified SVG image URL
                    planet.attr('xlink:href', imageUrl);
                });
                })
                .on("mouseover",function (d,i)
                {
                    const orbit = d3.select("#orbit_" + i.name.replaceAll(" ","_"))
                    orbit.style("opacity",1)
                    .style("stroke", "blue")
                    .style("stroke-width", 2);
                    // console.log(i)
                
                })
                .on("mouseout", function (d,i)
                {
                    const orbit = d3.select("#orbit_" + i.name.replaceAll(" ","_"))
                    orbit.style("opacity",0.1)
                    .style("stroke", "white")
                    .style("stroke-width", 1);
                
                });

                
            
            planets.append("svg:title")
            .text(function(d) {
                return d.name + "\n" +
                        "Discover year: " + d.discovery_year +
                        "\nDistance: " + d.distance + " light years\n" +
                        "Orbital Period: " + d.orbital_period + " Earth days\n" +
                        "Planet Type: " + d.planet_type +
                        "\nDetection Method: " + d.detection_method +
                        "\nMass wrt " + d.mass_wrt +" " + d.mass_multiplier;
            });
            
          
        
       
}
function mouseover(event)
{
    const orbit = d3.select("#" + event.name)
    orbit.attr("opacity",1)


}
function mouseout(event)
{
    const orbit = d3.select("#" + event.name)
    orbit.attr("opacity",0.3)


}
// function planetbar()
// {
//     // bardata = d3.rollup(filteredData, v => v.length, d => d.planet_type)
//     // bardata = Object.fromEntries(bardata)
//     // var xscale = d3.scaleBand()
//     // .range([0,100])
//     // .domain(Object.keys(bardata))
//     // .padding(0.2)
//     // var yscale = d3.scaleLinear()
//     // .domain([0,console.log(Math.max(...Object.values(bardata)))])
//     // .range([0,200])
    
//     // barsvg.append("g")
//     // .attr('id',"x-axis")
//     // .transition().duration(1000)
//     // .call(d3.axisBottom(xscale))
//     // .attr("transform","translate(0,200)");
    
//     // barsvg.append("g")
//     // .attr('id',"y-axis")
//     // .transition().duration(1000)
//     // .call(d3.axisLeft(yscale))
//     // .attr("transform","translate(0, 0)");

//     // console.log("bar")
//     // var bars = barsvg.append("g")
//     //         .attr("id","bars")
//     //         .attr("transform","translate(" + (width) + "," + (height - 400) + ")");
           
//     // bars.selectAll("rect")
//     //         .data(Object.entries(bardata))
//     //         .append("rect")
//     //         .attr("x", 0)
//     //         .attr("y", function(d) { return 20 })
//     //         .attr("width", 5)
//     //         .attr("height", 30)
//     //         .attr("fill", "red")
//     //         .attr("stroke","black")
//     //         .attr("stroke-width",1);
            
// }

function legends()
{
    
        bardata = d3.rollup(filteredData, v => v.length, d => d.planet_type)
        bardata = Object.fromEntries(bardata)
// Create legend for color scale
        colorLegend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width) + "," + (height - 50) + ")"); // Change position as desired

      

        const numColorBins = 5; //  desired number of color bins

        const colorBins = d3.range(d3.min(filteredData, d => d.stellar_magnitude), d3.max(filteredData, d => d.stellar_magnitude), (d3.max(filteredData, d => d.stellar_magnitude) - d3.min(filteredData, d => d.stellar_magnitude)) / numColorBins);

        colorLegend.selectAll("rect")
        .data(colorBins)
        // .enter()
        .join("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", (d, i) => i * 25)
        .style("fill", d => colorScale(d));

        colorLegend.selectAll("text")
        .data(colorBins)
        // .enter()
        .join("text")
        .text(d => d.toFixed(2))
        .attr("x", 25)
        .attr("y", (d, i) => i * 25 + 15);

        colorLegend.append("text")
        .attr("class", "legendTitle")
        .text("Stellar Magnitude")
        .attr("x", 0)
        .attr("y", -10);

        // legend for planet types
        typeLegend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width-5 ) + "," + (height -200) + ")"); 
        
        typeLegend.append("text")
        .attr("class", "legendTitle")
        .text("Planet Types")
        .attr("x", 0)
        .attr("y", -10);

        typeLegend
        .append("image")
        .attr("xlink:href", "Seacreatures/dolphin.svg")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", 10);

        typeLegend.append("text")
        .text("Super Earth")
        .attr("x", 25)
        .attr("y", 25);

        typeLegend.append("image")
        .attr("xlink:href", "Seacreatures/shark.svg")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", 40);

        typeLegend.append("text")
        .text("Neptune-like")
        .attr("x", 25)
        .attr("y", 55);
       
        typeLegend.append("image")
        .attr("xlink:href", "Seacreatures/octopus.svg")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", 70)

        typeLegend.append("text")
        .text("Gas Giant")
        .attr("x", 25)
        .attr("y", 85);

        typeLegend.append("image")
        .attr("xlink:href", "Seacreatures/seahorse.svg")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", 100)

        typeLegend.append("text")
        .text("Terresterial")
        .attr("x", 25)
        .attr("y", 115);
        const barHeight = 20;
        const countscale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(bardata))])
        .range([0, 80]);
        console.log(Object.entries(bardata))

        typeLegend.selectAll("rect")
        .data(Object.entries(bardata))
        // .enter()
        // .each(function(d) { console.log(d)})
        .join("rect")
        .attr("width", d => countscale(d[1]))
        .attr("height", barHeight)
        .attr("x", 150)
        .attr("y", (d, i) =>  i*30 - barHeight/2 )
        .style("fill", "red")
        .attr("transform", "translate(" + 10 + "," + 20 +")");

        typeLegend.selectAll(".legendCountText")
        .data(Object.entries(bardata))
        // .enter()
        .join("text")
        .text(d => d[1])
        .attr('class', "legendCountText")
        .attr("x", d => countscale(d[1])+ 170)
        .attr("y", (d, i) =>  i*30 - barHeight/2 +35 );

}

function loadImageWithFill(url, fill, callback) {
    d3.xml(url).then(image => {
      const importedNode = document.importNode(image.documentElement, true);
      d3.select(importedNode)
        .select('g') // Select the 'g' element
        .attr('fill', fill); // Modify the 'fill' attribute
  
      callback(importedNode);
    });
  }