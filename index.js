const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Trim whitespace
    if (!query) {
        alert('Please enter a search term'); // Alert if empty
        return;
    }
    searchRepositories(query);
});

function searchRepositories(query) {
    const url = `https://api.github.com/search/repositories?q=${query}&per_page=10`; // Set results per page to 10
    console.log("Searching for: " + query);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.total_count === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>'; // Show a message if no results found
            } else {
                displayResults(data.items);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(repos) {
    resultsContainer.innerHTML = '';
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <div class="repo-owner">
                <img src="${repo.owner.avatar_url}" alt="Owner Avatar">
                <span>${repo.owner.login}</span>
            </div>
            <p>⭐ Stars: ${repo.stargazers_count}</p>
            <p>🍴 Forks: ${repo.forks_count}</p>
        `;
        resultsContainer.appendChild(repoCard);
    });
}
