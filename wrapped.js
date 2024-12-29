let messages
const stats = document.getElementById("stats")
const track = document.getElementById("track")
const cards = document.getElementsByClassName("card");
async function getData() {
  track.dataset.prevPercentage = 0
    

    let user = document.getElementById("name").value
    console.log(user)
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
      } else{
        randomMessage()
        document.getElementById("welcome-box").style.display = 'none';
        stats.style.display = 'flex';
        
        
        let wordCount = 0
        let a = 1, b = 0
        let monthData = []
        for (let i = 0; i < messages.length; i++) {
          if (messages[i]["Content"] != "null") {
            wordCount = wordCount + messages[i]["Content"].split(" ").length
          }
          if (i == messages.length - 1) {
                monthData.push(b)
                b = 0
                console.log(a)
            }
            if (messages[i]["Month"] == a) {
                b++
            } else {
                a++
                monthData.push(b)
                b = 0
                console.log(a - 1)
            }
        }

        

        document.getElementById("message-count").innerText = `This year, you posted ${messages.length} messages with ${wordCount} words!\nThat's around ${Math.floor(wordCount/250)} pages!!`;
        
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
  if (messages[mRand]["Content"] == "null" || !messages[mRand]["Content"]) {
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