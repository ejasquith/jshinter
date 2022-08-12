const API_KEY = 'Bbi_CRjUUStlYP_44bhcnXtDNBc';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
let resultsModal;

$(document).ready(function () {
    resultsModal = new bootstrap.Modal($('#resultsModal')[0]);

    $('#status').click(e => getStatus(e));
    $('#submit').click(e => postForm(e));
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

async function postForm(e) {
    const form = new FormData($('#checksform')[0]);
    const response = await fetch(API_URL, {
                                 method: "POST",
                                 headers: {
                                     "Authorization": API_KEY,
                                 },
                                 body: form
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}

function displayErrors(data) {
    let results;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`
            results += `<div class="error">${error.error}</div>`;
        }
    }

    $('#resultsModalTitle').html(`JSHint Results for ${data.file}`);
    $('#results-content').html(results);
    resultsModal.show();
}