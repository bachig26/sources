async function searchResults(keyword) {
    const searchUrl = `https://javhd.icu/?s=${encodeURIComponent(keyword)}`;
    try {
        const response = await fetch(searchUrl);
        const html = await response.text();
        const results = [];

        const itemRegex = /<div[^>]*class="[^"]*item[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
        const items = html.match(itemRegex) || [];

        items.forEach((itemHtml) => {
            const titleMatch = itemHtml.match(/<a[^>]*>([^<]+)<\/a>/i);
            const imgMatch = itemHtml.match(/src="(https?:\/\/javhd\.icu\/wp-content\/uploads\/[^"]+)"/i);
            const hrefMatch = itemHtml.match(/<a\s+href="(https?:\/\/javhd\.icu\/video\/[^"]+)"/i);

            if (!titleMatch || !imgMatch || !hrefMatch) return;

            const title = titleMatch[1].trim();
            const imageUrl = imgMatch[1].trim();
            const href = hrefMatch[1].trim();

            results.push({
                title,
                image: imageUrl,
                href
            });
        });
        //console.log(results);
        console.log(JSON.stringify(results, null, 2));
        return JSON.stringify(results);
    } catch (error) {
        throw error;
    }
}
