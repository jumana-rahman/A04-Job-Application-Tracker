let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
const filterDiv = document.getElementById('filtered-div');

function calculateCount(){
    total.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id){
    allFilterBtn.classList.remove('active');
    interviewFilterBtn.classList.remove('active');
    rejectedFilterBtn.classList.remove('active');

    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');
   
    const selected = document.getElementById(id);

    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('active');
}

mainContainer.addEventListener('click', function(event){
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('.company-name').innerText;
    const jobPosition = parentNode.querySelector('.job-position').innerText;
    const jobType = parentNode.querySelector('.job-type').innerText;
    const jobTime = parentNode.querySelector('.job-time').innerText;
    const jobSalary = parentNode.querySelector('.job-salary').innerText;
    const status = parentNode.querySelector('.status').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    const cardInfo = {
        companyName,
        jobPosition,
        jobType,
        jobTime,
        jobSalary,
        status,
        notes
    }
    
    const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName);

    if(!companyExist){
        interviewList.push(cardInfo)
    }
});

function renderInterview(){
    filterDiv.innerHTML = '';

    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'jobs-card p-6 bg-white flex justify-between';
        div.innerHTML = '
            
        '
    }
}