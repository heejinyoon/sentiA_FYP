import * as Plotly from 'plotly.js';

document.getElementById("submit").addEventListener("click", process_input);

// Configure how API Requests are handled
// handling success 
function success() {
    var data = JSON.parse(this.responseText); // parsing the string to JSON format
    update_image(data['sentiment'])
    update_plot(data['probabilities'])
}

// handling error
function error(err) {
    console.log('Request Failed', err); // details of error will be in the "err" variable
}

var xhr = new XMLHttpRequest(); // invoke a new instance of the XMLHttpRequest
xhr.onload = success; // calling success function if request successed
xhr.onerror = error;  // calling error function if request failed


function process_input() {
    var user_input = document.getElementById('user_input').value;
    // open a POST request
    xhr.open('POST', "http://127.0.0.1:8000/predict");
    xhr.send(JSON.stringify({'text': user_input})); // send the request to the server.
}

function update_plot(predicted_data){
    var layout = {  margin: {l: 25, r: 20, b: 25, t: 25, pad: 5 },
                    title: 'Probabilities',
                    font:{ family: 'Raleway, sans-serif'},
                }

    var data = [{predicted_data,
            x: Object.keys(predicted_data),
            y: Object.values(predicted_data),
            type: 'bar',
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
        }];
      Plotly.newPlot('statistics', data, layout, {displayModeBar: false});
}

function update_image(sentiment){
    if (sentiment === "positive"){
        document.getElementById("imgClickAndChange").src = "assets/positive.png";
    }
    else if (sentiment === "neutral"){
        document.getElementById("imgClickAndChange").src = "assets/neutral.png";
    }
    else if (sentiment === "negative"){
        document.getElementById("imgClickAndChange").src = "assets/negative.png";
    }
}
