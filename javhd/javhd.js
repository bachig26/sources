async function searchResults(keyword) {
    const searchUrl = `https://javhd.icu/?s=${encodeURIComponent(keyword)}`;
    try {
        const response = await fetch(searchUrl);
        const html = await response.text();
        const results = [];

        const itemRegex = /<div class="item col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">[\s\S]*?<\/article><\/div>/g;
        const items = html.match(itemRegex) || [];

        items.forEach((itemHtml) => {
            const titleMatch = itemHtml.match(/title="([^"]+)"/i);
            const imgMatch = itemHtml.match(/<img[^>]*src="(https:\/\/javhd\.icu\/wp-content\/uploads\/[^"]+\.jpg)"/i);
            const hrefMatch = itemHtml.match(/<a\s+href="(https:\/\/javhd\.icu\/video\/[^"]+)"/i);

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
        console.log(JSON.stringify(results));
        return JSON.stringify(results);
    } catch (error) {
        throw error;
    }
}
