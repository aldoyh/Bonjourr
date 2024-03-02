// Interface for representing a news item
interface NewsItem {
    title: string;
    link: string;
    thumbnail?: string; // Optional thumbnail URL
}

// Function to fetch and process RSS feed data
async function getNews(): Promise<NewsItem[]> {
    const feedUrl = "https://hacker-news.feedburner.com/atom/updates.xml"; // Replace with desired feed URL

    try {
        const response = await fetch(feedUrl);
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Extract relevant information from RSS feed
        const items = xmlDoc.querySelectorAll("item");
        const newsData: NewsItem[] = [];
        for (let i = 0; i < 5; i++) { // Limit to 5 items
            const item = items[i];
            const title = item?.querySelector("title")?.textContent || "";
            const link = item?.querySelector("link")?.textContent || "";
            const thumbnail = item.querySelector("enclosure")?.getAttribute("url") || undefined;
            newsData.push({ title, link, thumbnail });
        }

        return newsData;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        return []; // Return empty array on error
    }
}

// Function to display the news feed on the page
function displayNews(newsData: NewsItem[]) {
    const newsContainer = document.getElementById("news-feed")! as HTMLElement;


    if (!newsContainer) {
        console.error("News container element not found!");
        return;
    }

    newsContainer.innerHTML = ""; // Clear existing content

    const list = document.createElement("ul");
    newsData.forEach(item => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.title;
        listItem.appendChild(link);

        if (item.thumbnail) {
            const image = document.createElement("img");
            image.src = item.thumbnail;
            image.alt = item.title + " thumbnail";
            listItem.appendChild(image);
        }

        list.appendChild(listItem);
    });

    newsContainer.appendChild(list);
}

// Call the function to fetch and display news
getNews().then(displayNews);

