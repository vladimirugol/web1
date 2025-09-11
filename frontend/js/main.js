

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('data-form');
    const xInput = document.getElementById('x-value');
    const rCheckboxes = document.querySelectorAll('.r-checkbox');
    const errorMessage = document.getElementById('error-message');
    const resultsBody = document.getElementById('results-body');

    graphDrawer.init('graph-canvas'); 
    loadHistoryAndDraw(); 
    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                rCheckboxes.forEach(other => { 
                    if (other !== checkbox) other.checked = false; 
                });
            }
            const currentR = getSelectedR();
            graphDrawer.drawCanvas(currentR);
            const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            graphDrawer.drawPointsForCurrentR(history, currentR);
        });
    });

    form.addEventListener('submit', (event) => {
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
        if (!getSelectedR()) {
            errorMessage.textContent = 'Error: Please, select R-value.';
            return false;
        }
        return true;
    }
    async function sendData() {
        const x = xInput.value.trim().replace(',', '.');
        const y = form.querySelector('input[name="y"]:checked').value;
        const r = getSelectedR();

        const formData = new URLSearchParams();
        formData.append('x', x);
        formData.append('y', y);
        formData.append('r', r);

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json(); 
            let history = [];
        
            if (data.history && Array.isArray(data.history)) {
                history = data.history;
                sessionStorage.setItem('resultsHistory', JSON.stringify(history));
            } else {
                history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            }
            
            updateTableFromHistory(history);
            const currentR = getSelectedR();
            graphDrawer.drawCanvas(currentR);
            graphDrawer.redrawAllPoints(history);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            errorMessage.textContent = 'Произошла ошибка при связи с сервером.';
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
            resultsBody.appendChild(row);
        });
    }

    function getSelectedR() {
        const checked = form.querySelector('input[name="r"]:checked');
        return checked ? parseFloat(checked.value) : null;
    }
    function loadHistoryAndDraw() {
        const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
        updateTableFromHistory(history);

        const currentR = getSelectedR();
        graphDrawer.drawCanvas(currentR); 
        graphDrawer.redrawAllPoints(history); 
    }
});