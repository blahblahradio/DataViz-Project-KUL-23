<div class= "container-fluid">
    <h1>Sounak Ghosh - KU Leuven - r0914328</h1>
    <h3>Overview</h3>
</div>
<div class="container-fluid">
    <label for="dropdown">Select a car to highlight:</label>
    <select class="form-control-sm" on:change={handleSelect}>
        <option value=""></option>
        {#each Array.from({ length: 35 }, (_, i) => i + 1) as optionValue}
            <option value={"Car " + optionValue}>Car {optionValue}</option>
        {/each}
        <option value="Car 101">Car 101</option>
        <option value="Car 104">Car 104</option>
        <option value="Car 105">Car 105</option>
        <option value="Car 106">Car 106</option>
        <option value="Car 107">Car 107</option>
    </select>
    {#if selectedOptionValue != ""}
        <p>Go to <a class="btn btn-info" href="/{selectedOptionValueID}">details</a> for {selectedOptionValue}</p>
    {/if}
</div>
<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    let datapoints_GPS = [], datapoints_Business = [], datapoints_CarStops=[];
    fetch("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json")
        .then(res => res.json())
        .then(data => datapoints_GPS = data)
    fetch("https://vda-lab.github.io/assets/vast2021_businesses.json")
        .then(res => res.json())
        .then(data => datapoints_Business = data)
    fetch("https://vda-lab.github.io/assets/vast2021_carstops.json")
        .then(res => res.json())
        .then(data => datapoints_CarStops = data)
  
    const rescale = function(x, domain_min, domain_max, range_min, range_max) {
        return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
    }
    let selectedOptionValue = '';
    let selectedOptionValueID
    $: selectedOptionValueID = selectedOptionValue ? parseInt(selectedOptionValue.slice(4)) : null;
    function handleSelect(event) {
    selectedOptionValue = event.target.value;
    console.log(selectedOptionValue);
    }
</script>
<svg width="600" height="600">
    {#each datapoints_GPS as datapoint}
        <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
                cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
                r=1
                fill= black
                fill-opacity={0.2}/>
    {/each}
    {#each datapoints_Business as datapoint}
        {#if datapoint.type === "catering"}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
                cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
                r=3
                fill= green
                fill-opacity={1}>
                <title>{datapoint.name}</title>
            </circle>
        {/if}
        {#if datapoint.type === "domestic"}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
                cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
                r=1
                fill= red
                fill-opacity={1}>
                <title>{datapoint.name}</title>
                </circle>
        {/if}
        {#if datapoint.type === "professional"}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
            cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
            r=3
            fill= brown
            fill-opacity={1}>
            <title>{datapoint.name}</title>
            </circle>
        {/if}
        {#if datapoint.type === "housing"}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
            cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
            r=3
            fill= royalblue
            fill-opacity={3}>
            <title>{datapoint.name}</title>
            </circle>
        {/if}
        {#if datapoint.type === "other"}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
                cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
                r=3
                fill= black
                fill-opacity={1}>
                <title>{datapoint.name}</title>
            </circle>
        {/if}
    {/each}
    {#each datapoints_GPS as datapoint}
        {#if datapoint.car_id == selectedOptionValueID}
            <circle cx={rescale(datapoint.long, 24.82587, 24.90836, 0, 600)}
                cy={rescale(datapoint.lat, 36.04802, 36.08961, 600, 0)}
                r=3
                fill= red
                fill-opacity={1}/>
        {/if}
    {/each}
</svg>