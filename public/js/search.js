async function liveSearch() {
    const query = document.getElementById('search-input').value;
    if (query.length < 2) { // พิมพ์ 2 ตัวอักษรขึ้นไปค่อยค้นหา
        document.getElementById('search-results').innerHTML = '';
        return;
    }

    const response = await fetch(`/api/search?q=${query}`);
    const movies = await response.json();

    let html = '';
    movies.forEach(movie => {
        html += `
            <div class="movie-card">
                <img src="${movie.poster_url}" alt="${movie.title}">
                <p>${movie.title}</p>
            </div>
        `;
    });
    document.getElementById('search-results').innerHTML = html;
}