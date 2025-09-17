

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('data-form');
    const xInput = document.getElementById('x-value');
    const rCheckboxes = document.querySelectorAll('.r-checkbox');
    const errorMessage = document.getElementById('error-message');
    const resultsBody = document.getElementById('results-body');
    const themeButton = document.getElementById("theme");
    const themes = ['default', 'blue', 'red', 'purple', 'orange'];
    const submitButton = document.getElementById("submit-button");
    document.body.className = themes[0];

    themeButton.addEventListener('click', function() {
        const currentTheme = document.body.className;
        let newTheme;
        do {
            const randomIndex = Math.floor(Math.random() * themes.length);
            newTheme = themes[randomIndex];
        } while (newTheme === currentTheme);
        document.body.className = newTheme;
    });
    // function getRandom(min, max) {
    //     return Math.random() * (max - min) + min;
    // }
    // submitButton.addEventListener("mousemove", function(){
    //     submitButton.style.left = `${getRandom(1, 90)}%`
    //     submitButton.style.top = `${getRandom(1, 90)}%`
    // })

    graphDrawer.init('graph-canvas'); 
    loadHistoryAndDraw(); 
    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => { 
            const currentR = getSelectedR();
            graphDrawer.drawCanvas(currentR.length > 0 ? currentR[0] : null);
            const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            graphDrawer.drawPointsForCurrentR(history, currentR);
        });
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        if (validateForm()) {
            sendData(); 
        }
    });

    function validateForm() {
        errorMessage.textContent = ''; 
        const xValue = xInput.value.trim().replace(',', '.');
        if (xValue === '' || isNaN(xValue)) {
            errorMessage.textContent = 'X must be a count';
            return false;
        }
        const xNum = parseFloat(xValue);
        if (xNum <= -5 || xNum >= 5) {
            errorMessage.textContent = 'X must be from -5 to 5';
            return false;
        }
        if (!form.querySelector('input[name="y"]:checked')) {
            errorMessage.textContent = 'Error: Please, select Y-value.';
            return false;
        }
        if (getSelectedR().length===0) {
            errorMessage.textContent = 'Error: Please, select R-value.';
            return false;
        }
        return true;
    }
    async function sendData() {
        const x = xInput.value.trim().replace(',', '.');
        const y = form.querySelector('input[name="y"]:checked').value;
        const selectedR = getSelectedR();
        const requests = [];
        selectedR.forEach(r => {
            const formData = new URLSearchParams();
            formData.append('x', x);
            formData.append('y', y);
            formData.append('r', r);
            const req = fetch('/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            });
            
            requests.push(req);
        });

        try {
            const results = await Promise.all(requests);

            let oldHistory = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            const newHistoryEntries = results.map(result => result.history[0]); 
            const finalHistory = oldHistory.concat(newHistoryEntries);
            sessionStorage.setItem('resultsHistory', JSON.stringify(finalHistory));
            updateTableFromHistory(finalHistory);      
            const firstR = getSelectedR()[0] || null;
            graphDrawer.drawCanvas(firstR);
            graphDrawer.redrawAllPoints(finalHistory);
        } catch (error) {
            console.error('Error sending data:', error);
            errorMessage.textContent = 'Connection Error. One or more requests failed.';
        }
    }

    function updateTableFromHistory(history) {
        resultsBody.innerHTML = ''; 
        history.forEach(item => {
            const row = document.createElement('tr');
            const keys = ['x', 'y', 'r', 'hit', 'currentTime', 'execMs'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key] !== undefined ? item[key] : '';
                row.appendChild(td);
            });
            resultsBody.prepend(row);
        });
    }

    function getSelectedR() {
        const checked = form.querySelectorAll('input[name="r"]:checked');
        return Array.from(checked).map(checkbox => parseFloat(checkbox.value));
    }
    function loadHistoryAndDraw() {
        const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
        updateTableFromHistory(history);

        const currentR = getSelectedR();
        const firstR = currentR.length > 0 ? currentR[0] : null;
        graphDrawer.drawCanvas(firstR); 
        graphDrawer.redrawAllPoints(history); 
    }
});