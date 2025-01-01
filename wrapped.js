let messages
const stats = document.getElementById("stats")
const track = document.getElementById("track")
const cards = document.getElementsByClassName("card");

const img = document.querySelector('#s2 div button img');
let rotation = 0;

img.addEventListener('click', function () {
    rotation += 360; // Increment the rotation angle
    img.style.transform = `rotate(${rotation}deg)`; // Apply the new rotation
    img.style.transition = 'transform 0.5s'; // Ensure smooth rotation
});

img.addEventListener('mouseover', function () {
  img.style.transform = `rotate(${rotation + 45}deg)`; // Add 45 degrees for hover
});

img.addEventListener('mouseout', function () {
  img.style.transform = `rotate(${rotation}deg)`; // Reset to the clicked rotation
});

async function getData() {
  track.dataset.prevPercentage = 0

    let user = document.getElementById("name").value
    const url = "https://thatcrazymaninasuit.github.io/messages.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }



      const json = await response.json();
      
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translate(${58 * Math.sin((i + 1) / cards.length * 2 * Math.PI)}%, 0%) scale(${.25 / 2 * (Math.cos((i + 1) / cards.length * 2 * Math.PI) - 1) + 1})`
        cards[i].style.opacity = .375 * Math.cos((i + 1) / cards.length * 2 * Math.PI) + .625
        cards[i].style.zIndex = Math.floor(cards[i].style.opacity * 1000)
      }

      messages = json[user]

      if (!messages) {
        document.getElementById("invalid-text").style.color = "red"
      } else {
        document.getElementById("invalid-text").style.color = "transparent"
        randomMessage()
        document.getElementById("welcome-box").style.display = 'none';
        stats.style.display = 'flex';
        
        let serverTotal = 0
        for (const [key, value] of Object.entries(json)) {
          serverTotal = serverTotal + value.length
        }

        // Message Iterator

        let wordCount = 0
        let monthData = [0,0,0,0,0,0,0,0,0,0,0,0]
        let pictureCount = 0

        for (let i = 0; i < messages.length; i++) {
          if (messages[i]["Content"] != "null") {
            wordCount = wordCount + messages[i]["Content"].split(" ").length
          }

          monthData[messages[i]["Month"] - 1]++
          
          if (/(.jpeg|.png|.jpg|.webp)/.test(messages[i]["Attachments"])) {
            pictureCount++
          }

        }
        
        console.log(monthData)
        // Message Count

        document.getElementById("message-count").innerText = `This year, you posted ${messages.length} messages with ${wordCount} words, making up ${Math.round(messages.length/serverTotal * 100000)/1000}% of all ${serverTotal} messages!\n\n` + `That's around ${Math.floor(wordCount/250)} pages worth of messages!`;
        
        // Message by Month

        let max = 0
        for (let i = 2; i < Math.max(...monthData); i*=2) {
          max = 2 * i
        }
        for (let i = 0; i < monthData.length; i++) {
          document.getElementById(`m${i + 1}`).style.height = `${monthData[i] / max * 100}%`;
        }
        
        const monthBars = document.getElementsByClassName("month-bar");

        let array = messages[0]["AuthorID"].toString().match(/\d{9}$/).toString().match(/\d{3}/g)
        let color = []
        for (let i = 0; i < array.length; i++) {
            color.push(Math.ceil(array[i] / 999 * 255))
        }

        for (let i of monthBars) {
          i.style.backgroundColor = `rgb(${color.toString()})`
        }
        
        for (let i = 0; i < 8; i++) {
          document.getElementById(`mk${i}`).innerText = Math.floor((i+1)/8 * max)
        }
        
        // Pictures

      }
      
    } catch (error) {
      console.error(error.message);
    }
}

function back() {
    document.getElementById("welcome-box").style.display = 'flex';
    stats.style.display = 'none';
}

function genRandomMessage() {
  let mRand = Math.floor(Math.random() * messages.length)
  if (messages[mRand]["Content"] == "null" || /https/.test(messages[mRand]["Content"])) {
    return genRandomMessage()
  } else {
    return messages[mRand]["Content"]
  }
}
const randomMessages = document.getElementsByClassName("random-message");

function randomMessage() {
  for (let i of randomMessages) {
    i.innerText = genRandomMessage()
  }
}

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}



window.onmousemove = e => {
  if (track.dataset.mouseDownAt == 0) return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth
  const percentage = (mouseDelta / maxDelta) * (1 - 1 / cards.length) * -2 * Math.PI
  
  let current = percentage + parseFloat(track.dataset.prevPercentage)
  track.dataset.percentage = current
  
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.transform = `translate(${70 * Math.sin(current + (i + 1) / cards.length * 2 * Math.PI)}%, 0%) scale(${.25 / 2 * (Math.cos(current + (i + 1) / cards.length * 2 * Math.PI) - 1) + 1})`
    cards[i].style.opacity = .375 * Math.cos(current + (i + 1) / cards.length * 2 * Math.PI) + .625
    cards[i].style.zIndex = Math.floor(cards[i].style.opacity * 1000)
  }
  document.getElementById("debug").innerText = parseFloat(track.dataset.prevPercentage) + percentage
} 

window.onmouseup = e => {
  track.dataset.mouseDownAt = 0;
  track.dataset.prevPercentage = track.dataset.percentage
}