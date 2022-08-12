const API_KEY = 'Bbi_CRjUUStlYP_44bhcnXtDNBc';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
let resultsModal;

$(document).ready(function () {    
    resultsModal = new bootstrap.Modal($('#resultsModal')[0]);

    $('#status').click(e => getStatus(e));
});

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    $('#resultsModalTitle').text("API Key Status");
    $('#results-content').text(`Your key is valid until ${data.expiry}`);
    resultsModal.show();
}