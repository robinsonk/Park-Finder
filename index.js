
function getInput() {
    console.log('function getInput is running');
 //Form listener. Handles input data.
    $('.submit-button').click(function(event) {
        event.preventDefault();
        $('.results-box').empty();
        console.log('The form has collected user input');

        let stateField = $('#state-search').val();
        let stateChoice = stateField.replace(/[, ]+/g, "%2C");
        let resultLimit = $('#result-limit').val() -1;

        if (resultLimit > 50 || resultLimit < 0) {
            alert('Please eneter a number between 1 and 50');
        } else {
            console.log(`The user wants to see ${resultLimit} parks in ${stateChoice}`);
            pullParkData(stateChoice, resultLimit);
        }
    })  
}

function pullParkData(stateChoice, resultLimit) {
    console.log('function pullParkData is running');
    console.log(`https://api.nps.gov/api/v1/parks?stateCode=${stateChoice}&limit=${resultLimit}`);
 //Pulls data from the NPS API 
    fetch(`https://api.nps.gov/api/v1/parks?stateCode=${stateChoice}&limit=${resultLimit}`)
        .then(response => response.json())
        .then(responseJson => 
            displayParkData(responseJson))
            .catch(e => alert('Oops something went wrong!'));
}

function displayParkData(responseJson) {
    console.log('function displayParkData is running');
    console.log(responseJson);
 //Displays Park Data in the DOM

    if (responseJson.total === 0) {
        $('.results-box').append(`
            <h2>Sorry, looks like that's not a valid state. Please enter a valid state abbreviation and try again.</h2>
                `);
    }

    else if (responseJson.total > 0 && responseJson.total < responseJson.limit) {
        $('.results-box').append(`
            <h2>You selected a total of ${responseJson.limit +1} parks, but there are only ${responseJson.total} national parks in your destination:</h2>
                `);
        for (let i = 0; i < responseJson.data.length; i++) {
            $('.results-box').append(`<ul class="repository-details">
                <li><span class="result-name">${i +1}.  ${responseJson.data[i].fullName}</span></li>
                <li><span class="result-states">Location</span><br>${responseJson.data[i].states}</li>
                <li>${responseJson.data[i].description}</li>
                <li><span class="result-weather">How to get there<br></span>${responseJson.data[i].directionsInfo}</li>
                <li><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName} Website</a></li>
            </ul>
        `);
        }
    } else {
        $('.results-box').append(`
                <h2 class="user-title">National Parks in your desitnation:</h2>`);
        for (let i = 0; i < responseJson.data.length; i++) {
                $('.results-box').append(`<ul class="repository-details">
                    <li><span class="result-name">${i +1}.  ${responseJson.data[i].fullName}</span></li>
                    <li><span class="result-states">Location</span><br>${responseJson.data[i].states}</li>
                    <li>${responseJson.data[i].description}</li>
                    <li><span class="result-weather">How to get there<br></span>${responseJson.data[i].directionsInfo}</li>
                    <li><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName} Website</a></li>
                </ul>
                `);
        }
    }
}

function runParkApp() {
    console.log('The Park Finder app is running');
 // Run app on page load
    getInput();
}

$(runParkApp);