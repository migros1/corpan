document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('https://darkness.ashlynn.workers.dev/chat/?prompt=' + encodeURIComponent(userInput) + '&model=meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo');
        const data = await response.json();
        responseDiv.innerHTML = formatResponse(data.response);
    } catch (error) {
        responseDiv.innerHTML = 'Bir hata oluştu: ' + error.message;
    }
});

document.getElementById('analyze-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const fileInput = document.getElementById('file-input');
    const responseDiv = document.getElementById('response');

    if (!userInput.trim()) {
        responseDiv.innerHTML = 'Lütfen önce bir mesaj girin.';
        return;
    }

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = event.target.result;
            try {
                const response = await fetch('https://darkness.ashlynn.workers.dev/chat/?prompt=' + encodeURIComponent(userInput + "\n" + fileContent) + '&model=meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo');
                const data = await response.json();
                responseDiv.innerHTML = formatResponse(data.response);
            } catch (error) {
                responseDiv.innerHTML = 'Bir hata oluştu: ' + error.message;
            }
        };
        reader.readAsText(file);
    } else {
        responseDiv.innerHTML = 'Lütfen bir dosya seçin.';
    }
});

function formatResponse(response) {
    // Kod bloklarını vurgulamak için basit bir işlev
    return response.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
}
