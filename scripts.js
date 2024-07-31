document.addEventListener('DOMContentLoaded', () => {
    updateUsageList();
    updateUsageSummary();
    loadGoal();
    drawChart();

    document.getElementById('waterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const usage = document.getElementById('usage').value;
        
        addUsage(date, usage);
        updateUsageList();
        updateUsageSummary();
        drawChart();
    });

    document.getElementById('goalForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const goal = document.getElementById('goal').value;
        setGoal(goal);
        loadGoal();
    });
});

function addUsage(date, usage) {
    const usageData = getUsageData();
    usageData.push({ date, usage: parseFloat(usage) });
    localStorage.setItem('usageData', JSON.stringify(usageData));
}

function getUsageData() {
    const usageData = localStorage.getItem('usageData');
    return usageData ? JSON.parse(usageData) : [];
}

function updateUsageList() {
    const usageData = getUsageData();
    const usageList = document.getElementById('usageList');
    usageList.innerHTML = '';
    usageData.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Date: ${entry.date}, Usage: ${entry.usage} liters 
                              <button onclick="editUsage(${index})">Edit</button>
                              <button onclick="deleteUsage(${index})">Delete</button>`;
        usageList.appendChild(listItem);
    });
}

function editUsage(index) {
    const usageData = getUsageData();
    const entry = usageData[index];
    document.getElementById('date').value = entry.date;
    document.getElementById('usage').value = entry.usage;
    deleteUsage(index);
}

function deleteUsage(index) {
    const usageData = getUsageData();
    usageData.splice(index, 1);
    localStorage.setItem('usageData', JSON.stringify(usageData));
    updateUsageList();
    updateUsageSummary();
    drawChart();
}

function updateUsageSummary() {
    const usageData = getUsageData();
    const totalUsage = usageData.reduce((total, entry) => total + entry.usage, 0);
    document.getElementById('usageSummary').textContent = `Total Usage: ${totalUsage} liters`;
}

function setGoal(goal) {
    localStorage.setItem('dailyGoal', goal);
}

function loadGoal() {
    const goal = localStorage.getItem('dailyGoal');
    const goalMessage = document.getElementById('goalMessage');
    if (goal) {
        goalMessage.textContent = `Your daily goal is ${goal} liters.`;
    } else {
        goalMessage.textContent = '';
    }
}

function drawChart() {
    const ctx = document.getElementById('usageChart').getContext('2d');
    const usageData=getUsageData();
    const labels =usageData.map(entry => entry.date);
    const data = usageData.map(entry => entry.usage);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Water Usage (liters)',
                data: data,
                borderColor: 'rgba(46, 139, 87, 1)',
                backgroundColor: 'rgba(46, 139, 87, 0.2)',
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('refreshButton').addEventListener('click', function() {
    location.reload();
});

document.addEventListener('DOMContentLoaded', function() {
    const popupBar = document.getElementById('popupBar');
    const showPopupButton = document.getElementById('showPopup');
    const closeBtn = document.querySelector('.popup-bar .close-btn');

    showPopupButton.addEventListener('click', function() {
        popupBar.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        popupBar.style.display = 'none';
    });
});
