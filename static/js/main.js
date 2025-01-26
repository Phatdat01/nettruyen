document.addEventListener("DOMContentLoaded", function () {
    // Load header
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-placeholder").innerHTML = data);
    // Load main
    fetch("main.html")
        .then(response => response.text())
        .then(data => document.getElementById("main-content").innerHTML = data);
    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);

    // Load recommend file
    async function fetchLocalDataAndAppend() {
        try {
            const response = await fetch('recommend.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.status}`);
            }
    
            const data = await response.json();
    
            const contentContainer = document.querySelector('.main__recommend-content');
    
            data.forEach(item => {    
                const anchor = document.createElement('a');
                anchor.className = 'main__recommend-content-item';
                anchor.href = item.link;
    
                const img = document.createElement('img');
                img.className = 'main__recommend-content-img';
                img.src = item.image;
                img.alt = 'image';
    
                const infoDiv = document.createElement('div');
                infoDiv.className = 'main__recommend-content-info';
    
                const nameDiv = document.createElement('div');
                nameDiv.className = 'main__recommend-content-name';
                nameDiv.textContent = item.name;
    
                const detailDiv = document.createElement('div');
                detailDiv.className = 'main__recommend-content-detail';
    
                const chapterDiv = document.createElement('div');
                chapterDiv.className = 'main__recommend-content-chapter';
                chapterDiv.textContent = item.chapter;
    
                const datepostDiv = document.createElement('div');
                datepostDiv.className = 'main__recommend-content-datepost';
                datepostDiv.textContent = item.datepost;
    
                detailDiv.appendChild(chapterDiv);
                detailDiv.appendChild(datepostDiv);
                infoDiv.appendChild(nameDiv);
                infoDiv.appendChild(detailDiv);
                anchor.appendChild(img);
                anchor.appendChild(infoDiv);
                contentContainer.appendChild(anchor);
            });
        } catch (error) {
            console.error('Error loading JSON file:', error);
        }
    }
    fetchLocalDataAndAppend();
});