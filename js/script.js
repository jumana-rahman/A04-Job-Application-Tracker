let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allCards = document.getElementById('all-cards');

function calculateCount(){
    total.innerText = allCards.children.length;
}
calculateCount();