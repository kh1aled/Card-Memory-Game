//            ===== variables =====

 let playBtn = document.querySelector(".starting span");
 let start_controlPage = document.querySelector(".starting");
 let blocksContainer = document.querySelector(".game-container");
 let blocks = document.querySelectorAll(".game-container .card")
 let username = document.querySelector(".username span")
 let tries = document.querySelector(".game-control .tries .try");
 let min = document.querySelector(".game-control .timer .min");
 let sec = document.querySelector(".game-control .timer .sec");
 let theName = document.querySelector(".result .name");
 let theTries = document.querySelector(".result .deg span");
 let trueCount = 0;
 let timer = document.querySelector(".game-result .timer")
 const cards = Array.from(blocks)
 console.log(blocks)

 const orderRange = Array.from(cards.keys())
 console.log(orderRange)

 //       === handle click button start  ===
 playBtn.onclick = starting;
 

 //       === start game handle ====
 

 function starting(){
    const user = prompt("Enter Your Name")

    if(user === "" || user === null){
        username.innerHTML = "Unknown";
        theName.innerHTML = "Unknown";
    }else{
        username.innerHTML = user;
        theName.innerHTML = user;
    }

    start_controlPage.remove();
    shuffle(orderRange)
cards.forEach((card,index)=>{
    card.style.order = orderRange[index]
})
startTimer()
 }





 //       === flip flop handle ====

cards.forEach((card)=>{



    card.addEventListener("click",function(){
        const click = new Audio("./audio/mouse-click-153941.mp3")
        click.play()
        fliping(card)
    })
})



function fliping(selectedCard){

    selectedCard.classList.add("isFliped")


    let allBlocksFliped = cards.filter((card)=> card.classList.contains("isFliped"));


    if(allBlocksFliped.length === 2){
        stopClicking();
        checkblocks(allBlocksFliped[0],allBlocksFliped[1])
    }
    
}
 //       === stop clicking handle ====

function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, 1000);
}




 //       === check cards are fliped ====
 
function checkblocks(card1,card2){
    if(card1.dataset.information === card2.dataset.information){
        const success = new Audio("./audio/success-1-6297.mp3")
        success.play()

        card1.classList.remove("isFliped")
        card2.classList.remove("isFliped")


        card1.classList.add("has-match")
        card2.classList.add("has-match")

        trueCount++;

        if(trueCount * 2 === cards.length){
            endGame();
        }

    }else{
        const fail = new Audio("./audio/error-2-126514.mp3")

        fail.play()

        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        theTries.innerHTML =  parseInt(theTries.innerHTML) + 1 ;
        
        setTimeout(function() {
            card1.classList.remove("isFliped")

            card2.classList.remove("isFliped")
        },1000)
        
    }

}

 //       === shuffle array ====

function shuffle(arr){
    let current = arr.length,
    tamp,
    random;

    while(current > 0){

        random = Math.floor(Math.random() * current)

        current--;
        
        //==== save current number ===
        tamp = arr[current];

        //==== save current number
        arr[current] = arr[random]

        arr[random] = tamp
    }
} 


function startTimer(){
    
    let startingTime = 2; // minutes time you need start them
    let time = startingTime * 60;  // عدد ثواني الوقت دا
    const timer = setInterval(() => {
        let minuts = Math.floor(time / 60)
        let seconds = time % 60
        sec.innerHTML = seconds;
        min.innerHTML = minuts;
        time--;
        if(time < 0){
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    min.innerHTML = countMin;
    sec.innerHTML = countSec;
 }


//             ==== save current number ===
function endGame(){
    start_controlPage.remove();
    document.querySelector(".result").classList.add("active")
 }