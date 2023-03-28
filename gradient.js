const gradientColors = ['#004C92', '#0082D1', '#00A8FF', '#68CFFF', '#D2FCFF'];
    const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    gradientColors.forEach((color, i) => {
    gradient.append("stop")
        .attr("offset", `${i * 100 / gradientColors.length}%`)
        .attr("stop-color", color);
    });

// create a rectangle that uses the gradient
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "url(#gradient)");
