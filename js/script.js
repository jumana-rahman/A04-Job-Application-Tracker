let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
let availableCount = document.getElementById('available-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
const filterDiv = document.getElementById('filtered-div');

function calculateCount(){
    const totalJobs = allCards.children.length;
    total.innerText = totalJobs;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if(currentStatus === 'all-filter-btn'){
        availableCount.innerText = totalJobs + " jobs";
    }
    else if(currentStatus === 'interview-filter-btn'){
        const count = interviewList.length;
        availableCount.innerText = count + " of " + totalJobs + " jobs";
    }
    else if(currentStatus === 'rejected-filter-btn'){
        const count = rejectedList.length;
        availableCount.innerText = count + " of " + totalJobs + " jobs";
    }
}
calculateCount();

function checkAllJobs(){
    if(allCards.children.length === 0){
                allCards.innerHTML = `
                    <div class="jobs-card p-6 bg-white">
                        <div class="jobs-content">
                            <div class="text-center space-y-2">
                                <img class="w-auto mx-auto" src="./images/jobs.png" alt="jobs">
                                <h4 class=" text-[24px]/[32px] font-semibold black">No jobs available</h4>
                                <p class=" text-[16px]/[22px] font-normal gray capitalize">Check back for new opportunities</p>
                            </div>
                        </div>
                    </div>
                `;
    }
}

function getStatusClasses(status){
    if(status === 'Interview'){
        return 'bg-[#10B981] text-white';
    }
    if(status === 'Rejected'){
        return 'bg-[#EF4444] text-white';
    }
    return 'bg-[#EEF4FF] black'
}

function toggleStyle(id){
    allFilterBtn.classList.remove('active');
    interviewFilterBtn.classList.remove('active');
    rejectedFilterBtn.classList.remove('active');

    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');
   
    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('active');

    if(id == 'interview-filter-btn'){
        allCards.classList.add('hidden');
        filterDiv.classList.remove('hidden');
        availableCount.innerText = interviewList.length + " jobs";
        renderInterview();
        calculateCount();
    }
    else if(id == 'all-filter-btn'){
        allCards.classList.remove('hidden');
        filterDiv.classList.add('hidden');
        availableCount.innerText = allCards.children.length + " jobs";
    }
    else if(id == 'rejected-filter-btn'){
        allCards.classList.add('hidden');
        filterDiv.classList.remove('hidden');
        availableCount.innerText = rejectedList.length + " jobs";
        renderRejected();
        calculateCount();
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


        const statusBtn = parentNode.querySelector('.status');
        statusBtn.innerText = 'Interview';

        statusBtn.innerText = 'Interview';
        statusBtn.className = `status px-3 py-2 rounded-sm text-sm font-medium uppercase ${getStatusClasses('Interview')}`;


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

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);
        calculateCount();

        if(currentStatus === 'rejected-filter-btn'){
            renderRejected();
        }

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

        const statusBtn = parentNode.querySelector('.status');
        statusBtn.innerText = 'Rejected';

        statusBtn.innerText = 'Rejected';
        statusBtn.className = `status px-3 py-2 rounded-sm text-sm font-medium uppercase ${getStatusClasses('Rejected')}`;

        const cardInfo = {
            companyName,
            jobPosition,
            jobType,
            jobTime,
            jobSalary,
            status: 'Rejected',
            notes
        }
        
        const companyExist = rejectedList.find(item => item.companyName == cardInfo.companyName);


        if(!companyExist){
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        if(currentStatus === 'interview-filter-btn'){
            renderInterview();
        }

        calculateCount();
    }
    else if(event.target.closest('.btn-delete')){
        const card = event.target.closest('.jobs-card');
        const companyName = card.querySelector('.company-name').innerText;
        
        card.remove();

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        calculateCount();

        if(currentStatus === 'interview-filter-btn'){
            renderInterview();
        }
        if(currentStatus === 'rejected-filter-btn'){
            renderRejected();
        }

        checkAllJobs();
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
                        <button class="status px-3 py-2 rounded-sm text-sm font-medium uppercase ${getStatusClasses(interview.status)}">${interview.status}</button>
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

    if(interviewList.length === 0){
        filterDiv.innerHTML = `
            <div class="jobs-card p-6 bg-white">
                <div class="jobs-content">
                    <div class="text-center space-y-2">
                        <img class="w-auto mx-auto" src="./images/jobs.png" alt="jobs">
                        <h4 class=" text-[24px]/[32px] font-semibold black">No jobs available</h4>
                        <p class=" text-[16px]/[22px] font-normal gray capitalize">Check back for new opportunities</p>
                    </div>
                </div>
            </div>
        `;
        return;
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
                        <button class="status px-3 py-2 rounded-sm text-sm font-medium uppercase ${getStatusClasses(rejected.status)}">${rejected.status}</button>
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

    if(rejectedList.length === 0){
        filterDiv.innerHTML = `
            <div class="jobs-card p-6 bg-white">
                <div class="jobs-content">
                    <div class="text-center space-y-2">
                        <img class="w-auto mx-auto" src="./images/jobs.png" alt="jobs">
                        <h4 class=" text-[24px]/[32px] font-semibold black">No jobs available</h4>
                        <p class=" text-[16px]/[22px] font-normal gray capitalize">Check back for new opportunities</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }
}