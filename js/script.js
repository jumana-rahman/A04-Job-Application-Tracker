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

    if(id == 'interview-filter-btn'){
        allCards.classList.add('hidden');
        filterDiv.classList.remove('hidden');
    }
    else if(id == 'all-filter-btn'){
        allCards.classList.remove('hidden');
        filterDiv.classList.add('hidden');
    }
    else if(id == 'rejected-filter-btn'){
        allCards.classList.add('hidden');
        filterDiv.classList.remove('hidden');
    }
}

mainContainer.addEventListener('click', function(event){

    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobTime = parentNode.querySelector('.job-time').innerText;
        const jobSalary = parentNode.querySelector('.job-salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = 'Interview';

        const cardInfo = {
            companyName,
            jobPosition,
            jobType,
            jobTime,
            jobSalary,
            status: 'Interview',
            notes
        }
        
        const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName);


        if(!companyExist){
            interviewList.push(cardInfo)
        }

        
        calculateCount();

        renderInterview()
    }
    else if(event.target.classList.contains('rejected-btn')){
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobTime = parentNode.querySelector('.job-time').innerText;
        const jobSalary = parentNode.querySelector('.job-salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = 'Rejected';

        const cardInfo = {
            companyName,
            jobPosition,
            jobType,
            jobTime,
            jobSalary,
            status: 'Rejected',
            notes
        }
        
        const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName);


        if(!companyExist){
            rejectedList.push(cardInfo)
        }

        calculateCount();

        renderRejected()
    }
});

function renderInterview(){
    filterDiv.innerHTML = '';

    for(let interview of interviewList){
        console.log(interview);
        let div = document.createElement('div');
        div.className = 'jobs-card p-6 bg-white flex justify-between mb-4';
        div.innerHTML = `
            <div class="jobs-content space-y-4">
                    <div>
                        <h4 class="company-name text-[18px]/[26px] font-semibold black capitalize">${interview.companyName}</h4>
                        <p class="job-position text-[16px]/[22px] font-normal gray capitalize">${interview.jobPosition}</p>
                    </div>

                    <div>
                        <ul class="list-disc text-[14px]/[20px] font-normal gray flex gap-2 ">
                            <li class="job-type list-none pr-3.5">${interview.jobType}</li>
                            <li class="job-time pr-3.5">${interview.jobTime}</li>
                            <li class="job-salary">${interview.jobSalary}</li>
                        </ul>
                    </div>

                    <div>
                        <button class="status px-3 py-2 bg-[#EEF4FF] rounded-sm text-sm font-medium black uppercase ">${interview.status}</button>
                        <p class="notes text-sm font-normal dark-gray pt-1.5">${interview.notes}</p>
                    </div>

                    <div>
                        <button class="interview-btn px-3 py-2 bg-transparent border border-[#10B981] rounded-sm green text-sm font-semibold uppercase cursor-pointer hover:shadow-sm transition-all duration-300 mr-1.5">interview</button>
                        
                        <button class="rejected-btn px-3 py-2 bg-transparent border border-[#EF4444] rounded-sm red text-sm font-semibold uppercase cursor-pointer hover:shadow-sm transition-all duration-300">rejected</button>
                    </div>
                </div>
                
                <div class="job-delete-btn">
                    <button class="btn-delete text-[#64748B] p-1.5 border border-[#F1F2F4] rounded-full cursor-pointer hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300"> <i class="fa-solid fa-trash"> </i> </button>
                </div>
        `

        filterDiv.appendChild(div)
    }
}

function renderRejected(){
    filterDiv.innerHTML = '';

    for(let rejected of rejectedList){
        console.log(rejected);
        let div = document.createElement('div');
        div.className = 'jobs-card p-6 bg-white flex justify-between mb-4';
        div.innerHTML = `
            <div class="jobs-content space-y-4">
                    <div>
                        <h4 class="company-name text-[18px]/[26px] font-semibold black capitalize">${rejected.companyName}</h4>
                        <p class="job-position text-[16px]/[22px] font-normal gray capitalize">${rejected.jobPosition}</p>
                    </div>

                    <div>
                        <ul class="list-disc text-[14px]/[20px] font-normal gray flex gap-2 ">
                            <li class="job-type list-none pr-3.5">${rejected.jobType}</li>
                            <li class="job-time pr-3.5">${rejected.jobTime}</li>
                            <li class="job-salary">${rejected.jobSalary}</li>
                        </ul>
                    </div>

                    <div>
                        <button class="status px-3 py-2 bg-[#EEF4FF] rounded-sm text-sm font-medium black uppercase ">${rejected.status}</button>
                        <p class="notes text-sm font-normal dark-gray pt-1.5">${rejected.notes}</p>
                    </div>

                    <div>
                        <button class="interview-btn px-3 py-2 bg-transparent border border-[#10B981] rounded-sm green text-sm font-semibold uppercase cursor-pointer hover:shadow-sm transition-all duration-300 mr-1.5">interview</button>
                        
                        <button class="rejected-btn px-3 py-2 bg-transparent border border-[#EF4444] rounded-sm red text-sm font-semibold uppercase cursor-pointer hover:shadow-sm transition-all duration-300">rejected</button>
                    </div>
                </div>
                
                <div class="job-delete-btn">
                    <button class="btn-delete text-[#64748B] p-1.5 border border-[#F1F2F4] rounded-full cursor-pointer hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300"> <i class="fa-solid fa-trash"> </i> </button>
                </div>
        `

        filterDiv.appendChild(div)
    }
}