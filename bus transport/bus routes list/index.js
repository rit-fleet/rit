
    const searchBar = document.getElementById('search-bar');
    const busRoutesContainer = document.getElementById('bus-routes-container');

        searchBar.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            const sections = busRoutesContainer.children;

            for (const section of sections) {
                const h2Text = section.querySelector('h2').textContent.toLowerCase();
                if (h2Text.includes(searchQuery)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            }
        });