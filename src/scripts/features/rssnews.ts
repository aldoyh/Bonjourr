
export default
async function fetchLatestNews() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const newsIds = await response.json();
        console.log('Latest news:', newsIds);

        const news = await Promise.all(newsIds.slice(0, 10).map((id: number) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        }));
        console.log('News:', news.length);


        const newsData = await Promise.all(news.map((response: any) => response.json()));

        console.log('News data:', newsData);

        insertNewsToDom(newsData);



    } catch (error) {
        console.error('Error fetching news:', error);
    }


}

function insertNewsToDom(news: any) {
    const newsContainer = document.getElementById('news_container');
    if (!newsContainer) {
        return;
    }
    newsContainer.innerHTML = '';

    news.forEach((item: any) => {
        const newsItem = document.createElement('div');
        newsItem.innerHTML = `
            <a href="${item.url}" target="_blank" class="news-item">
                <h3 class="news-title">${item.title}</h3>
                <p class="news-by">${item.by}</p>
            </a>
        `;
        newsContainer.appendChild(newsItem);
    });
}