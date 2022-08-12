const API_KEY = 'Bbi_CRjUUStlYP_44bhcnXtDNBc';
const API_URL = 'https://ci-jshint.herokuapp.com/api';

$(document).ready(function () {    
    const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

    $('#status').click(e => getStatus(e));
});

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();

    if (response.ok) {
        console.log(data.expiry);
    }
}