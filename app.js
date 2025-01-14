document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-query').value;

  try {
    const response = await fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Server Response:', data);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>answer</h2>
      <p>${data.answer}</p>
      <h2>sources</h2>
      <ul>
        ${data.sources.map((source) => `<li><a href="${source.url}" target="_blank">${source.title}</a>: ${source.snippet}</li>`).join('')}
      </ul>
    `;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = `<p>an error occurred while fetching results: ${error.message}</p>`;
  }
});
