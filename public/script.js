document.getElementById('toastForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const brideName = document.getElementById('brideName').value;
    const groomName = document.getElementById('groomName').value;
    const relationship = document.getElementById('relationship').value;

    try {
        const response = await fetch('/generate-toast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brideName, groomName, relationship }),
        });

        const data = await response.json();

        // Check if the 'toast' property exists in the response
        if ('toast' in data) {
            // Display the generated toast
            document.getElementById('generatedToast').innerText = data.toast;
        } else {
            console.error('Unexpected response format:', data);
            alert('Error generating toast. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('Error generating toast. Please try a.');
    }
});
