
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
                rCheckboxes.forEach(other => { if (other !== checkbox) other.checked = false; });
            }
            const currentR = getSelectedR();
            graphDrawer.drawCanvas(currentR);
            const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            graphDrawer.redrawAllPoints(history);
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
            errorMessage.textContent = 'Ошибка: X должен быть числом.';
            return false;
        }
        const xNum = parseFloat(xValue);
        if (xNum <= -5 || xNum >= 5) {
            errorMessage.textContent = 'Ошибка: X должен быть в диапазоне (-5 ... 5).';
            return false;
        }
        if (!form.querySelector('input[name="y-value"]:checked')) {
            errorMessage.textContent = 'Ошибка: Пожалуйста, выберите значение Y.';
            return false;
        }
        if (!getSelectedR()) {
            errorMessage.textContent = 'Ошибка: Пожалуйста, выберите значение R.';
            return false;
        }
        return true;
    }

    async function sendData() {
        const x = xInput.value.trim().replace(',', '.');
        const y = form.querySelector('input[name="y-value"]:checked').value;
        const r = getSelectedR();

        const formData = new URLSearchParams();
        formData.append('x', x);
        formData.append('y', y);
        formData.append('r', r);

        try {
            const response = await fetch('/api', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
        updateTableFromHistory(data.history || []);
            const last = data.result;
            const isHit = (last.hit === 'Попадание');
            graphDrawer.drawPoint(parseFloat(last.x), parseFloat(last.y), parseFloat(last.r), isHit);
            sessionStorage.setItem('resultsHistory', JSON.stringify(data.history || []));
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            errorMessage.textContent = 'Произошла ошибка при связи с сервером.';
        }
    }

    function updateTableFromHistory(history) {
        resultsBody.innerHTML = '';
        history.forEach(item => {
            const row = document.createElement('tr');
            ['x','y','r','hit','serverTime','execMs'].forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key] !== undefined ? item[key] : '';
                row.appendChild(td);
            });
            resultsBody.appendChild(row);
        });
    }

    

    function getSelectedR() {
        const checked = form.querySelector('input[name="r-value"]:checked');
        return checked ? parseFloat(checked.value) : null;
    }
});