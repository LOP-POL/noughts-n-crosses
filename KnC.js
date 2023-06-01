const restartBtn =  document.querySelector(".Restart")
const nGame = document.querySelector(".nGame")

const boxes =  document.querySelectorAll(".box p")
const blur1 = document.querySelector(".blur")

const addBtns = Array.from(document.querySelectorAll(".add"))
const subBtns = Array.from(document.querySelectorAll(".sub"))

const turn = document.getElementById("turn")
const nPlayed = document.getElementById("nPlayed")

//creating a board
const boxesCol = Array.from(boxes)
const trackers = {
    change:"",
    completion:0,
    gamesPlayed:0,
}
const points = {
    tie:0,
    Xs:0,
    Os:0,
}

//functions for manipulating board
function restart(){
    boxesCol.forEach(box=>{
        box.classList.remove("selected")
        box.textContent = "."
        box.style.color = "white"
       
    })
    trackers.completion = 0
    trackers.change=""
    turn.textContent = ""
}
function newGame(){
    for(var i = 0;i<points.length;i++){
        points[i] = 0
    }
    trackers.gamesPlayed = 0
    restart()
    addBtns.forEach(btn=>{
        scoreCounter = 0
        btn.nextElementSibling.textContent = 0
    })

    nPlayed.textContent = "."

}

// score manipulation 
//access to the points object
function addToScore(player){
    if(player=="X"){
        points.Xs++
        document.querySelector(".X").textContent = points.Xs
    }
    else if(player=="O"){
        points.Os++
        document.querySelector(".O").textContent = points.Os
    }
    else{
        points.tie++
        document.querySelector(".T").textContent = points.tie
    }
    trackers.gamesPlayed++
    nPlayed.textContent = trackers.gamesPlayed
}
function subtractScore(player){
    if(player=="X"){
        points.Xs--
        document.querySelector(".X").textContent = points.Xs
    }
    else if(player=="O"){
        points.Os--
        document.querySelector(".O").textContent = points.Os
    }
    else{
        points.tie--
        document.querySelector(".T").textContent = points.tie
    }
}
addBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
        addToScore(btn.nextElementSibling.classList[1])
        restart()
    })
})
subBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
        subtractScore(btn.previousElementSibling.classList[1])
        restart()
    })
})


//finishers  - tie and winner
function check_tie(){
    if(trackers.completion==9){
        addToScore("T")
        restart()
    }
    else{
        console.log(trackers.completion)
    }
}
function check_winner(mchange){
   
    // check rows
    const tdMat = [
        [boxesCol[0].innerHTML,boxesCol[1].textContent,boxesCol[2].textContent],
        [boxesCol[3].textContent,boxesCol[4].textContent,boxesCol[5].textContent],
        [boxesCol[6].textContent,boxesCol[7].textContent,boxesCol[8].textContent]
        ]
    var answer = false
    tdMat.forEach(row=>{
        if(row.every(value=>{return value==mchange})){
            answer=true
            addToScore(mchange)
            restart()
            return true
        }
    })
    //check columns
    for(var i = 0;i<4;i++){
        if(tdMat[0][i]==mchange && tdMat[1][i]==mchange && tdMat[2][i]==mchange){
            answer=true
            addToScore(mchange)
            restart()
            return true
        }
    }
    //check diagonals
    if(tdMat[0][0]==mchange && tdMat[1][1]==mchange && tdMat[2][2]==mchange){
        answer=true
        addToScore(mchange)
        restart()
        return true
    }
    if(tdMat[0][2]==mchange && tdMat[1][1]==mchange && tdMat[2][0]==mchange){
        answer=true
        addToScore(mchange)
        restart()
        return true
    }
    return answer
}


//var player = ""
restartBtn.onclick = restart

nGame.onclick = (e)=>{
    newGame()
    restart()
}


//Main changes 
boxesCol.forEach(box=>{
    box.addEventListener("click",(e)=>{
        
        if(box.classList.contains("selected")==false){
            if(trackers.change=="X"){
                trackers.change="O"
                turn.textContent = "X"
            }
            else {
                trackers.change="X"
                turn.textContent = "O"
            }
            trackers.change=="X" ? 
            e.target.style.color = "lighgray"
            :
            e.target.style.color="lightgray"

            e.target.textContent = trackers.change
            box.classList.add("selected")
            trackers.completion++
            check_winner(trackers.change)
            check_tie()
        }
        
    })
    
})
        


function animateBlur(x,y){
    // blur1.animate([{left:`${x}px`,top:`${y}px`}],{duration:800,fill:"forwards",delay:80})
    blur1.style.left = `${x}px`
    blur1.style.top = `${y}px`
}

// document.querySelector(".board").addEventListener("mouseover",e=>{
//     window.addEventListener("mousemove",e=>{
//         animateBlur(e.clientX,e.clientY)
//         // blur1.style.right=`${e.clientX}`
//         // blur.style.left=`${e.clientX}`
//     })
// })

