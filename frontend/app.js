let sites = [[ 53.903192, -1.629799 ],
[ 53.902806, -1.629651 ],
[ 53.818928, -1.603168 ],
[ 53.818772, -1.603207 ],
[ 53.798325, -1.525394 ],
[ 53.799408, -1.535259 ],
[ 53.799186, -1.534937 ],
[ 53.796056, -1.547675 ],
[ 53.796259, -1.547696 ],
[ 53.796012, -1.540937 ],
[ 53.782096, -1.559061 ],
[ 53.782096, -1.559061 ]];

let global_data = [];

fetch('site_7.json').then(res => res.json().then(data => {
    console.log(data[0]);
    global_data = data;
    initChart(global_data, 'Co2');
}))


var mymap = L.map('map').setView([ 53.782096, -1.559061 ], 13);

addMarkers(sites);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

OpenStreetMap_Mapnik.addTo(mymap);

function addMarkers(points) {
    points.forEach(point => {
        let marker = L.marker(point);
        marker.addTo(mymap);
    })

    // mymap.panTo([points[0][0], points[0][1]]);
}

let chart = null;

function initChart(data, field) {
    let points = data.map(p => p[field])
    let counts = Object.entries(_.countBy(points))
    let labels = counts.map(([k, v], i) => {
        return k;
    });
    let values = counts.map(([k, v], i) => {
        return v;
    });
    let ctx = document.getElementById("myChart");
    if (chart != null) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scaleShowValues: true,
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    })
}

let dropdown = document.getElementById("dropdown");

dropdown.addEventListener('change', e => {
    initChart(global_data, e.target.value);
})