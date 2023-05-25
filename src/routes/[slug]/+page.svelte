<script>
    import {scaleLinear} from 'd3-scale';
    import {scaleOrdinal} from 'd3-scale';
    export let data;
    $: selectedOptionValueID = data.GPS_Coords[0].car_id;
    const rescale = function(x, domain_min, domain_max, range_min, range_max) {
        return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
    };
    const days = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const xscale = scaleLinear().domain([0,86400]).range([0,300]);
    const yscale = scaleLinear().domain([6,19]).range([0,300]);
    const colorScale = scaleOrdinal().domain(["professional", "housing", "domestic", "catering", "other"]).range(["brown", "royalblue", "red", "green", "black"]);   
    let sliderValue = 0;
    function moveRectangle(event) {
    sliderValue = event.target.value;
    }
    let sliderValueID
    $: sliderValueID = sliderValue? parseInt(sliderValue) : null;
</script>
<p><a class= "btn btn-info" href="/">Car Overview</a></p>

{#if selectedOptionValueID == 101}
    <p>
        <a href="/35">Previous Car</a>
        <a href="/104">Next Car</a>
    </p>
{/if}

{#if selectedOptionValueID == 104}
    <p>
        <a class= "btn btn-info" href="/101">Previous Car</a>
        <a class= "btn btn-info" href="/{selectedOptionValueID + 1}">Next Car</a>
    </p>
{/if}

{#if selectedOptionValueID == 35}
    <p>
        <a class= "btn btn-info" href="/{selectedOptionValueID - 1}">Previous Car</a>
        <a class= "btn btn-info" href="/101">Next Car</a>
    </p>
{/if}

{#if selectedOptionValueID < 35}
    <p>
        <a class= "btn btn-info" href="/{selectedOptionValueID - 1}">Previous Car</a>
        <a class= "btn btn-info" href="/{selectedOptionValueID + 1}">Next Car</a>
    </p>
{/if}

{#if selectedOptionValueID > 104}
    <p>
        <a class= "btn btn-info" href="/{selectedOptionValueID - 1}">Previous Car</a>
        <a class= "btn btn-info" href="/{selectedOptionValueID + 1}">Next Car</a>
    </p>
{/if}

<div class="container-fluid">
    <h1>Sounak Ghosh - KU Leuven - r0914328</h1>
    <h3>Details for car {selectedOptionValueID}</h3>
    <input type="range" min="0" max="4200" value={sliderValue} on:input={moveRectangle} style="width: 300px" />
</div>

<svg height="700" width="700">
    <svg height = "300" width= "300">
            {#each data.GPS_Coords as datapoint}
            {#if datapoint.car_id == data.GPS_Coords[0].car_id}
                <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 300)}
                    cy={rescale(datapoint.lat, 36.04802, 36.08961, 300, 0)}
                    r=3
                    fill= royalblue
                    fill-opacity={0.2}/>
            {/if}
        {/each}
        {#each data.GPS_Coords as datapoint}
            {#if Math.abs((sliderValueID * 4.8) - datapoint.cumulative_minute_total) <= 15}
                <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 300)}
                    cy={rescale(datapoint.lat, 36.04802, 36.08961, 300, 0)}
                    r=3
                    fill= red
                    fill-opacity={1}/>
            {/if}          
        {/each} 
    </svg>
    <svg height= "350" width="350" x = 350>
        <g transform="translate(20,0)">
            {#each data.CarStops as datapoint}
                {#each days as day}
                    {#if datapoint.start.day === day}
                        <rect x = {xscale(datapoint.start.time)}
                            y = {yscale(day)} 
                            width = {xscale(datapoint.end.time)- xscale(datapoint.start.time)}
                            height = "20"
                            fill = {colorScale(datapoint.location.location_type)}
                        ><title>{datapoint.start.time}-{datapoint.end.time}: {datapoint.location.name} ({datapoint.location.location_type})</title></rect>
                    {/if}
                {/each}
            {/each}
            <line x1 ="0" y1="0" x2="0" y2= "330" stroke = "grey" ></line>
            <line x1 ="75" y1="0" x2="75" y2= "330" stroke = "grey" ></line>
            <line x1 ="150" y1="0" x2="150" y2= "330" stroke = "grey" ></line>
            <line x1 ="225" y1="0" x2="225" y2= "330" stroke = "grey" ></line>
            <line x1 ="300" y1="0" x2="300" y2= "330" stroke = "grey" ></line>
            <text x="0" y="340" >0</text>
            <text x="70.5" y="340" >6</text>
            <text x="143.5" y="340" >12</text>
            <text x="217.5" y="340" >18</text>
            <text x="292.5" y="340" >24</text>
            {#if sliderValue <= 300}
            <rect 
            x={sliderValue}
            y={yscale(6)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 300 && sliderValue <= 600}
            <rect 
            x={sliderValue - (300)}
            y={yscale(7)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 600 && sliderValue <= 900}
            <rect 
            x={sliderValue - (600)}
            y={yscale(8)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 900 && sliderValue <= 1200}
            <rect 
            x={sliderValue - (900)}
            y={yscale(9)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 1200 && sliderValue <= 1500}
            <rect 
            x={sliderValue - (1200)}
            y={yscale(10)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 1500 && sliderValue <= 1800}
            <rect 
            x={sliderValue - (1500)}
            y={yscale(11)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 1800 && sliderValue <= 2100}
            <rect 
            x={sliderValue - (1800)}
            y={yscale(12)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 2100 && sliderValue <= 2400}
            <rect 
            x={sliderValue - (2100)}
            y={yscale(13)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 2400 && sliderValue <= 2700}
            <rect 
            x={sliderValue - (2400)}
            y={yscale(14)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 2700 && sliderValue <= 3000}
            <rect 
            x={sliderValue - (2700)}
            y={yscale(15)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 3000 && sliderValue <= 3300}
            <rect 
            x={sliderValue - (3000)}
            y={yscale(16)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 3300 && sliderValue <= 3600}
            <rect 
            x={sliderValue - (3300)}
            y={yscale(17)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 3600 && sliderValue <= 3900}
            <rect 
            x={sliderValue - (3600)}
            y={yscale(18)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
            {#if sliderValue > 3900 && sliderValue <= 4200}
            <rect 
            x={sliderValue - (3900)}
            y={yscale(19)}
            width="3" 
            height="20" 
            fill="black"
            />{/if}
        </g>
        <text x="8" y="12.5">6</text>  
        <text x="8" y="37.5">7</text>
        <text x="8" y="62.5">8</text>
        <text x="8" y="85.5">9</text>
        <text x="0" y="110.5">10</text>
        <text x="0" y="132.5">11</text>
        <text x="0" y="155.5">12</text>
        <text x="0" y="180.5">13</text>
        <text x="0" y="205.5">14</text>
        <text x="0" y="227.5">15</text>
        <text x="0" y="250.5">16</text>
        <text x="0" y="272.25">17</text>
        <text x="0" y="295.5">18</text>
        <text x="0" y="315.5">19</text>
    </svg>
</svg>