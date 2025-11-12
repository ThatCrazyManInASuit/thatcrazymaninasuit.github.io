const canvas = document.getElementById("drawCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const hider = document.getElementById('hider');

async function fetchJsonFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json(); // Directly parses JSON
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return null;
  }
}


fetchJsonFile("custom.geo.json").then(data => {
    const taiwan = data
    console.log(taiwan);
    const taiwanPoints = taiwan.features[0].geometry.coordinates[0][0]
    console.log(taiwanPoints)
    console.log(document.getElementById("canvasContainer").clientWidth);
    let centerX = taiwanPoints[0][0];
    let centerY = taiwanPoints[0][1];
    const SIZE = 200;
    for (let i = 1; i < taiwanPoints.length; i++) { 
        centerX += taiwanPoints[i][0]
        centerY += taiwanPoints[i][1]
    }
    centerX = centerX/taiwanPoints.length;
    centerY = centerY/taiwanPoints.length;
    let offsetX = canvas.width/2
    let offsetY = canvas.height/2
    for (let i = 1; i < taiwanPoints.length; i++) {
        ctx.beginPath();
        ctx.moveTo((taiwanPoints[i - 1][0] - centerX) * SIZE + offsetX, -(taiwanPoints[i - 1][1] - centerY) * SIZE + offsetY);
        ctx.lineTo((taiwanPoints[i][0] - centerX) * SIZE + offsetX, -(taiwanPoints[i][1] - centerY) * SIZE + offsetY);
        ctx.stroke();
    }
    for (let i = 1; i < taiwanPoints.length; i++) {
        taiwanPoints[i][0] = (taiwanPoints[i][0] - centerX) * SIZE + offsetX
        taiwanPoints[i][1] = -(taiwanPoints[i][1] - centerY) * SIZE + offsetY
    }

    let drawing = false;
    let points = [];
    let distanceAvg = 0
    
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    canvas.addEventListener("mousedown", () => {
        ctx.strokeStyle = "#50ff41";
        drawing = true;
        points = [];
        console.log("MOUSEDOWN");
        distanceAvg = 0
        ctx.clearRect(0,0,canvas.width, canvas.height)
        hider.classList.add('hidden');
    });

    canvas.addEventListener("mouseup", () => {
        drawing = false;
        hider.classList.remove('hidden');
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        points.push([x, y]);

        const i = points.length - 1;
        if (i < 1) return;

        let distances = []
        taiwanPoints.forEach(p => {
            distances.push(Math.sqrt((x - p[0]) ** 2 + (y - p[1]) ** 2))
        })

        let distance = Math.min(...distances)
        distanceAvg += distance
        console.log(Math.min(...distances))
        let score = Math.round((400 - distanceAvg/points.length) / .4) / 10
        document.getElementById("score").innerHTML = score + "%"

        if (distance <= 20) {
            let scale = distance / 20
            ctx.strokeStyle = `rgb(${80 + 175 * scale},${255 - 22 * scale}, ${65 - 60 * scale})`;
        } else if (distance > 20 && distance <= 40) {
            let scale = (distance - 20) / 20
            ctx.strokeStyle = `rgb(${255 - 51 * scale},${233 - 233 * scale}, ${5 - 233 * scale})`;
        } else {
            ctx.strokeStyle = "#cc0000"
        }

        if (score >= 90) {
            let scale = (100 - score) / 10
            document.getElementById("score").style.color = `rgb(${80 + 175 * scale},${255 - 22 * scale}, ${65 - 60 * scale})`;
        } else if (score < 90 && score >= 80) {
            let scale = (90 - score) / 10
            document.getElementById("score").style.color = `rgb(${255 - 51 * scale},${233 - 233 * scale}, ${5 - 233 * scale})`;
        } else {
            document.getElementById("score").style.color = "#cc0000"
        }
        

        ctx.beginPath();
        ctx.moveTo(points[i - 1][0], points[i - 1][1]);
        ctx.lineTo(points[i][0], points[i][1]);
        ctx.stroke();
        
    });
})





