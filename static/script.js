function submitInput() {
    const input = document.getElementById("userInput").value;
    console.log(input);
    fetch('http://127.0.0.1:5000/check', {  // Change this to match Flask server port
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("result").innerText = "Something went wrong!";
    });
}
