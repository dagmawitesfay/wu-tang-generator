
/*

MAIN JS JUST DO TWO LISTERNERS
1)FOF EVENT DELEGATION TO LISTEN FOR QUESTIONS 

*/
// hold the answer for each questions 
const answer = {}

document.querySelector("#reveal").addEventListener("click",doSmth)

function doSmth(){

    // convert the object into key and value when the get request is sent
    // tostring now makes the query as string
    const queryAnswer = new URLSearchParams(answer).toString()
    fetch(`/api?${queryAnswer}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.querySelector("#name").textContent = data.name
    })

}


// event delegation -> event is applied on the parent and use closest to identify which child was clicked 
document.querySelector(".questions").addEventListener("click",buttonLogic)

function buttonLogic(e){
const button = e.target.closest(".option")

// safety only run when we card is clicked
if(!button) return  

// get the answers and values from the dataset
const{question,value} = button.dataset
answer[question] = value 

// highligh the selected buttons in the gquestion 
// toggle only for the selected button 

document.querySelectorAll(`.option[data-question="${question}"]`).forEach((que)=>que.classList.toggle("selected",button==que))
}