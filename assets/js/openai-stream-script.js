// Get the block editor element by its class name
var editor = document.querySelector('.block-editor__container');

// Create a new EventSource object that connects to the custom REST API route
var source = new EventSource('/wp-json/openai-stream/v1/completion');

// Define a function that updates the content of the editor with the data received from the stream
function updateEditor(data) {
    // Get the current content of the editor
    var content = editor.textContent;

    // Append the data to the content
    content += data;

    // Set the new content of the editor
    editor.textContent = content;
}

// Define a function that handles any errors or interruptions in the stream
function handleError(error) {
    // Close the connection to the stream
    source.close();

    // Display an alert message with the error details
    alert('An error occurred: ' + error.message);
}

// Add an event listener for message events from the stream and call updateEditor function with the data
source.addEventListener('message', function(event) {
    updateEditor(event.data);
});

// Add an event listener for error events from the stream and call handleError function with the error object
source.addEventListener('error', function(event) {
    handleError(event.error);
});