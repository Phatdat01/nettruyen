document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Load header
        const headerResponse = await fetch("header.html");
        const headerHTML = await headerResponse.text();
        document.getElementById("header-placeholder").innerHTML = headerHTML;

        // Load main
        const mainResponse = await fetch("main.html");
        const mainHTML = await mainResponse.text();
        document.getElementById("main-content").innerHTML = mainHTML;

        // Load footer
        const footerResponse = await fetch("footer.html");
        const footerHTML = await footerResponse.text();
        document.getElementById("footer-placeholder").innerHTML = footerHTML;

        // Load recommend file
        const recommendResponse = await fetch("recommend.json");
        if (!recommendResponse.ok) throw new Error(`Failed to fetch recommend.json: ${recommendResponse.status}`);
        const recommendData = await recommendResponse.json();

        const recommendContainer = document.querySelector(".main__recommend-content");
        recommendData.forEach(item => {
            const anchor = document.createElement("a");
            anchor.className = "main__recommend-content-item";
            anchor.href = item.link;

            const img = document.createElement("img");
            img.className = "main__recommend-content-img";
            img.src = item.image;
            img.alt = "image";

            const infoDiv = document.createElement("div");
            infoDiv.className = "main__recommend-content-info";

            const nameDiv = document.createElement("div");
            nameDiv.className = "main__recommend-content-name";
            nameDiv.textContent = item.name;

            const detailDiv = document.createElement("div");
            detailDiv.className = "main__recommend-content-detail";

            const chapterDiv = document.createElement("div");
            chapterDiv.className = "main__recommend-content-chapter";
            chapterDiv.textContent = item.chapter;

            const datepostDiv = document.createElement("div");
            datepostDiv.className = "main__recommend-content-datepost";
            datepostDiv.textContent = item.datepost;

            detailDiv.appendChild(chapterDiv);
            detailDiv.appendChild(datepostDiv);
            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(detailDiv);
            anchor.appendChild(img);
            anchor.appendChild(infoDiv);
            recommendContainer.appendChild(anchor);
        });

        // Load product list
        const productResponse = await fetch("product.json");
        if (!productResponse.ok) throw new Error(`Failed to fetch product.json: ${productResponse.status}`);
        const productData = await productResponse.json();

        const productList = document.getElementById("product-list");
        productData.forEach(product => {
            const productHTML = `
                <div class="col-sm-3 main__product">
                    <a class="main__item" href="">
                        <img class="main__item-img" src="${product.image}" alt="image">
                        <div class="main__item-info">
                            <i class="fa fa-eye"></i>
                            <div class="main__item-info-viewer">${product.viewers}</div>
                            <i class="fa fa-comment"></i>
                            <div class="main__item-info-heart">${product.hearts}</div>
                            <i class="fa fa-heart"></i>
                        </div>
                    </a>
                    <div class="main__detail">
                        <div class="main__detail-name">${product.name}</div>
                        <div class="main__detail-previous">
                            ${product.chapters
                                .map(
                                    chapter => `
                                        <div class="main__detail-previous-item">
                                            <a class="main__detail-previous-info" href="">${chapter.chapter}</a>
                                            <div class="main__detail-previous-datepost">${chapter.date}</div>
                                        </div>
                                    `
                                )
                                .join("")}
                        </div>
                    </div>
                </div>
            `;
            productList.insertAdjacentHTML("beforeend", productHTML);
        });
    } catch (error) {
        console.error("Error loading content:", error);
    }
});
