const initDynamicContent = async () => {
    const isLocalFile = window.location.protocol === 'file:' || window.location.port === '5500';
    const apiUrl = isLocalFile ? 'http://localhost:3000/api/data' : 'api/data.php';
    const baseUrl = isLocalFile ? 'http://localhost:3000/' : '';

    // Function to apply site data to DOM elements
    const applySiteData = (siteData) => {
        if (!siteData) return;

        // Update dynamic titles
        const dynamicTitles = document.querySelectorAll('[data-section-title]');
        dynamicTitles.forEach(el => {
            const section = el.getAttribute('data-section-title');
            if (siteData[section] && siteData[section].name) {
                el.innerHTML = siteData[section].name;
            }
        });

        // Update dynamic descriptions
        const dynamicDescs = document.querySelectorAll('[data-section-desc]');
        dynamicDescs.forEach(el => {
            const section = el.getAttribute('data-section-desc');
            if (siteData[section] && siteData[section].description !== undefined) {
                el.innerHTML = siteData[section].description;
            }
        });

        // Find all images and videos with data-section attribute
        const dynamicImages = document.querySelectorAll('img[data-section], video[data-section]');
        
        dynamicImages.forEach(img => {
            const section = img.getAttribute('data-section');
            const index = parseInt(img.getAttribute('data-index'), 10);
            
            if (siteData[section] && siteData[section].images && siteData[section].images[index]) {
                const imgPath = siteData[section].images[index];
                const fullPath = imgPath.startsWith('http') ? imgPath : baseUrl + imgPath;
                
                const isVideo = imgPath.toLowerCase().match(/\.(mp4|webm|mov)$/);
                const isImgTag = img.tagName.toLowerCase() === 'img';
                
                if (isVideo && isImgTag) {
                    // Replace img with video element
                    const video = document.createElement('video');
                    video.src = fullPath;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                    // Copy essential attributes
                    Array.from(img.attributes).forEach(attr => {
                        if (attr.name !== 'src') video.setAttribute(attr.name, attr.value);
                    });
                    if (img.parentNode) {
                        img.parentNode.replaceChild(video, img);
                    }
                } else if (!isVideo && !isImgTag) {
                    // Replace video with img element
                    const newImg = document.createElement('img');
                    newImg.src = fullPath;
                    Array.from(img.attributes).forEach(attr => {
                        if (attr.name !== 'src' && attr.name !== 'autoplay' && attr.name !== 'loop' && attr.name !== 'muted' && attr.name !== 'playsinline') {
                            newImg.setAttribute(attr.name, attr.value);
                        }
                    });
                    if (img.parentNode) {
                        img.parentNode.replaceChild(newImg, img);
                    }
                } else {
                    // Element matches file type, just update src
                    img.src = fullPath;
                    if (!isImgTag) {
                        img.load();
                        img.play().catch(e => console.log('Autoplay prevented:', e));
                    }
                }
            }
        });
    };

    // 1. Try to load and apply cached data from localStorage immediately to prevent layout shifts or default fallback images
    try {
        const cachedData = localStorage.getItem('siteDataCache');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            applySiteData(parsedData);
        }
    } catch (e) {
        console.error('Failed to load site data cache from localStorage:', e);
    }

    // 2. Fetch fresh data from the server
    try {
        const timestamp = new Date().getTime();
        const res = await fetch(`${apiUrl}?t=${timestamp}`, { cache: 'no-store' });
        const data = await res.json();
        
        if (data.success && data.data) {
            // Update cache and apply fresh data
            localStorage.setItem('siteDataCache', JSON.stringify(data.data));
            applySiteData(data.data);
        }
    } catch (error) {
        console.error('Failed to load dynamic images from server:', error);
    }
};

// Check if DOM is already fully loaded (e.g. on fast refresh/cache)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicContent);
} else {
    initDynamicContent();
}
