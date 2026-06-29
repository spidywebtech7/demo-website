document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = (window.location.port === '5500' || window.location.protocol === 'file:') ? 'http://localhost:3000/' : '';

    // DOM Elements
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const sectionsContainer = document.getElementById('sections-container');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    // Modal Elements
    const uploadModal = document.getElementById('upload-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const videoPreview = document.getElementById('video-preview');
    const confirmUploadBtn = document.getElementById('confirm-upload-btn');

    // State
    let currentToken = localStorage.getItem('adminToken');
    let currentSection = '';
    let currentIndex = 0;
    let selectedFile = null;
    let siteDataCache = null;

    // Initialize
    if (currentToken) {
        showDashboard();
    }

    // --- Authentication ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const btn = loginForm.querySelector('.login-btn');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        try {
            const res = await fetch(API_BASE + 'api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success) {
                currentToken = data.token;
                localStorage.setItem('adminToken', currentToken);
                loginError.classList.add('hidden');
                showDashboard();
                showToast('Logged in successfully!');
            } else {
                loginError.classList.remove('hidden');
            }
        } catch (error) {
            console.error(error);
            loginError.textContent = 'Server error. Try again.';
            loginError.classList.remove('hidden');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        currentToken = null;
        dashboardContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    // --- Dashboard UI ---
    async function showDashboard() {
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        await fetchSiteData();
    }

    async function fetchSiteData() {
        try {
            const timestamp = new Date().getTime();
            const res = await fetch(`${API_BASE}api/data.php?t=${timestamp}`);
            const data = await res.json();
            
            if (data.success) {
                siteDataCache = data.data;
                populateFilterDropdown(siteDataCache);
                renderSections(siteDataCache);
            } else {
                sectionsContainer.innerHTML = `<div class="error-msg" style="color:var(--error); text-align:center; padding: 2rem;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${data.message || 'Error loading data'}</p>
                    ${data.error ? `<p style="font-size:0.8rem; margin-top:0.5rem; opacity:0.8;">${data.error}</p>` : ''}
                </div>`;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            showToast('Failed to load data. Are you running a PHP server?', true);
            sectionsContainer.innerHTML = `<div class="error-msg" style="color:var(--error); text-align:center; padding: 2rem;">
                <i class="fa-solid fa-server" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Server Error: Failed to parse response.</p>
                <p style="font-size:0.8rem; margin-top:0.5rem; opacity:0.8;">If you are running locally, make sure you are using a PHP server (like XAMPP). Live Server will not work for PHP files.</p>
            </div>`;
        }
    }

    const imageSizeHints = {
        curated: [
            "Rings (400x440 Pixels)",
            "Necklace (400x440 Pixels)",
            "Earrings (400x900 Pixels)",
            "Bracelet (800x440 Pixels)",
            "Kada (400x440 Pixels)",
            "Pendant (400x900 Pixels)",
            "Bangles (400x440 Pixels)",
            "Mangalsutra (800x440 Pixels)",
            "Chain (800x900 Pixels)",
            "Pendent Set (400x900 Pixels)"
        ],
        hero: [
            "Banner 1 (1920x800 Pixels)",
            "Banner 2 (1920x800 Pixels)",
            "Banner 3 (1920x800 Pixels)",
            "Banner 4 (1920x800 Pixels)"
        ],

        promo: [
            "Promo Banner (1920x500 Pixels)"
        ],
        elegant: [
            "Timeless Elegance Card 1 (800x360 Pixels)",
            "Timeless Elegance Card 2 (800x360 Pixels)",
            "Timeless Elegance Card 3 (800x360 Pixels)"
        ],
        signature_col1: [
            "Col 1 - Image 1 (400x400 Pixels)",
            "Col 1 - Image 2 (400x400 Pixels)",
            "Col 1 - Image 3 (400x400 Pixels)",
            "Col 1 - Image 4 (400x400 Pixels)",
            "Col 1 - Image 5 (400x400 Pixels)",
            "Col 1 - Image 6 (400x400 Pixels)"
        ],
        signature_col2: [
            "Col 2 - Image 1 (400x400 Pixels)",
            "Col 2 - Image 2 (400x400 Pixels)",
            "Col 2 - Image 3 (400x400 Pixels)",
            "Col 2 - Image 4 (400x400 Pixels)",
            "Col 2 - Image 5 (400x400 Pixels)",
            "Col 2 - Image 6 (400x400 Pixels)"
        ],
        signature_col3: [
            "Col 3 - Image 1 (400x400 Pixels)",
            "Col 3 - Image 2 (400x400 Pixels)",
            "Col 3 - Image 3 (400x400 Pixels)",
            "Col 3 - Image 4 (400x400 Pixels)",
            "Col 3 - Image 5 (400x400 Pixels)",
            "Col 3 - Image 6 (400x400 Pixels)"
        ],
        signature_owner: [
            "Owner Image (750x500 Pixels)"
        ],
        exclusive: [
            "Lab Grown Diamond (600x600 Pixels)",
            "Real Diamond (600x600 Pixels)",
            "Real Polki (600x600 Pixels)",
            "Lab Grown Polki (600x600 Pixels)",
            "Platinum Collection (600x600 Pixels)",
            "Antique Jewellery (600x600 Pixels)",
            "Rose Gold (600x600 Pixels)",
            "Bridal Exclusive (600x600 Pixels)"
        ],
        reels: [
            "Video 1 (Vertical 9:16 - 1080x1920)",
            "Video 2 (Vertical 9:16 - 1080x1920)",
            "Video 3 (Vertical 9:16 - 1080x1920)",
            "Video 4 (Vertical 9:16 - 1080x1920)",
            "Video 5 (Vertical 9:16 - 1080x1920)",
            "Video 6 (Vertical 9:16 - 1080x1920)",
            "Video 7 (Vertical 9:16 - 1080x1920)"
        ],
        insta_col1: ["Img 1 (500x500 Pixels)","Img 2 (500x500 Pixels)","Img 3 (500x500 Pixels)","Img 4 (500x500 Pixels)"],
        insta_col2: ["Img 1 (500x500 Pixels)","Img 2 (500x500 Pixels)","Img 3 (500x500 Pixels)","Img 4 (500x500 Pixels)"],
        insta_col3: ["Img 1 (500x500 Pixels)","Img 2 (500x500 Pixels)","Img 3 (500x500 Pixels)","Img 4 (500x500 Pixels)"],
        insta_col4: ["Img 1 (500x500 Pixels)","Img 2 (500x500 Pixels)","Img 3 (500x500 Pixels)","Img 4 (500x500 Pixels)"],
        insta_gallery: [
            "Gallery 1 (500x500 Pixels)","Gallery 2 (500x500 Pixels)","Gallery 3 (500x500 Pixels)",
            "Gallery 4 (500x500 Pixels)","Gallery 5 (500x500 Pixels)","Gallery 6 (500x500 Pixels)",
            "Gallery 7 (500x500 Pixels)","Gallery 8 (500x500 Pixels)","Gallery 9 (500x500 Pixels)"
        ],
        rc_marquee: [
            "Mangalsutra 1 (440x560 Pixels)","Mangalsutra 2 (440x560 Pixels)",
            "Mangalsutra 3 (440x560 Pixels)","Mangalsutra 4 (440x560 Pixels)",
            "Mangalsutra 5 (440x560 Pixels)","Mangalsutra 6 (440x560 Pixels)",
            "Mangalsutra 7 (440x560 Pixels)","Mangalsutra 8 (440x560 Pixels)"
        ],
        latest_row1: [
            "Product 1 (500x500 Pixels)","Product 2 (500x500 Pixels)","Product 3 (500x500 Pixels)","Product 4 (500x500 Pixels)",
            "Product 5 (500x500 Pixels)","Product 6 (500x500 Pixels)","Product 7 (500x500 Pixels)","Product 8 (500x500 Pixels)"
        ],
        latest_row2: [
            "Product 1 (500x500 Pixels)","Product 2 (500x500 Pixels)","Product 3 (500x500 Pixels)","Product 4 (500x500 Pixels)",
            "Product 5 (500x500 Pixels)","Product 6 (500x500 Pixels)","Product 7 (500x500 Pixels)","Product 8 (500x500 Pixels)"
        ]
    };

    function renderSections(data) {
        sectionsContainer.innerHTML = '';
        
        const filterVal = document.getElementById('section-filter') ? document.getElementById('section-filter').value : 'all';
        
        for (const [sectionKey, sectionData] of Object.entries(data)) {
            if (filterVal !== 'all' && sectionKey !== filterVal) {
                continue;
            }
            
            const sectionBlock = document.createElement('div');
            sectionBlock.className = 'section-block';
            
            let imagesHtml = '';
            sectionData.images.forEach((imgUrl, index) => {
                let hint = (imageSizeHints[sectionKey] && imageSizeHints[sectionKey][index]) ? imageSizeHints[sectionKey][index] : `Image ${index + 1}`;
                let isVideo = imgUrl.toLowerCase().endsWith('.mp4') || imgUrl.toLowerCase().endsWith('.webm') || imgUrl.toLowerCase().endsWith('.mov');
                imagesHtml += `
                    <div class="image-card">
                        <div class="image-preview-box">
                            ${isVideo ? 
                            `<video src="${imgUrl.startsWith('http') ? imgUrl : API_BASE + imgUrl}" controls style="width:100%; height:100%; object-fit:cover;" preload="metadata"></video>` : 
                            `<img loading="lazy" src="${imgUrl.startsWith('http') ? imgUrl : API_BASE + imgUrl}" alt="${sectionData.name} ${index + 1}">`}
                        </div>
                        <div class="image-actions">
                            <span class="image-label" style="font-size: 0.8rem; line-height: 1.2;">${hint}</span>
                            <button class="edit-btn" onclick="openUploadModal('${sectionKey}', ${index})">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            sectionBlock.innerHTML = `
                <div class="section-settings-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.8rem; flex-wrap:wrap; gap:1rem;">
                    <div style="display:flex; flex-direction:column; gap:0.2rem; align-items:flex-start; text-align:left;">
                        <h3 style="margin:0; font-size:1.25rem; color:var(--primary-color);">${sectionData.name}</h3>
                        ${sectionData.description ? `<p style="margin:0; font-size:0.85rem; color:var(--text-muted); font-style:italic;">${sectionData.description}</p>` : ''}
                    </div>
                    <button class="btn-secondary" onclick="openTextModal('${sectionKey}')" style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem 1rem; border-radius:6px; font-size:0.85rem; cursor:pointer;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Text
                    </button>
                </div>
                <div class="image-grid">
                    ${imagesHtml}
                </div>
            `;
            sectionsContainer.appendChild(sectionBlock);
        }
    }

    function populateFilterDropdown(data) {
        const sectionFilter = document.getElementById('section-filter');
        if (!sectionFilter) return;
        
        const currentVal = sectionFilter.value;
        
        sectionFilter.innerHTML = '<option value="all" style="background:#151c24; color:#fff;">Show All Sections</option>';
        
        for (const [sectionKey, sectionData] of Object.entries(data)) {
            const opt = document.createElement('option');
            opt.value = sectionKey;
            opt.style.background = '#151c24';
            opt.style.color = '#fff';
            opt.textContent = sectionData.name;
            sectionFilter.appendChild(opt);
        }
        
        if (data[currentVal] || currentVal === 'all') {
            sectionFilter.value = currentVal;
        }
    }

    const sectionFilter = document.getElementById('section-filter');
    if (sectionFilter) {
        sectionFilter.addEventListener('change', () => {
            if (siteDataCache) {
                renderSections(siteDataCache);
            }
        });
    }

    // --- Modal & Upload Logic ---
    window.openUploadModal = (section, index) => {
        currentSection = section;
        currentIndex = index;
        resetModal();
        uploadModal.classList.remove('hidden');
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            uploadModal.classList.add('hidden');
        });
    });

    function resetModal() {
        selectedFile = null;
        fileInput.value = '';
        fileNameDisplay.textContent = '';
        fileNameDisplay.classList.add('hidden');
        previewArea.classList.add('hidden');
        imagePreview.src = '';
        videoPreview.src = '';
        imagePreview.classList.remove('hidden');
        videoPreview.classList.add('hidden');
        confirmUploadBtn.disabled = true;
        dropZone.classList.remove('hidden');
    }

    // File Input change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    function handleFileSelect() {
        if (fileInput.files.length > 0) {
            selectedFile = fileInput.files[0];
            
            if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
                showToast('Please select an image or video file', true);
                resetModal();
                return;
            }

            fileNameDisplay.textContent = selectedFile.name;
            fileNameDisplay.classList.remove('hidden');
            
            // Preview
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                previewArea.classList.remove('hidden');
                dropZone.classList.add('hidden');
                confirmUploadBtn.disabled = false;
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    function compressImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve) => {
            if (file.type.startsWith('video/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
                resolve(file);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const mimeType = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
                            const newExt = mimeType === 'image/webp' ? '.webp' : '.jpg';
                            
                            const compressedFile = new File([blob], file.name.substring(0, file.name.lastIndexOf('.')) + newExt, {
                                type: mimeType,
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    }, file.type === 'image/webp' ? 'image/webp' : 'image/jpeg', quality);
                };
                img.onerror = () => resolve(file);
            };
            reader.onerror = () => resolve(file);
        });
    }

    // Upload Submission
    confirmUploadBtn.addEventListener('click', async () => {
        if (!selectedFile || !currentToken) return;

        confirmUploadBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Resizing...';
        confirmUploadBtn.disabled = true;

        try {
            let fileToUpload = selectedFile;
            if (selectedFile.type.startsWith('image/')) {
                fileToUpload = await compressImage(selectedFile, 2000, 2000, 0.90);
            }

            confirmUploadBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Uploading...';

            const formData = new FormData();
            formData.append('image', fileToUpload);
            formData.append('section', currentSection);
            formData.append('index', currentIndex);

            const res = await fetch(API_BASE + 'api/upload.php', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${currentToken}`
                },
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                showToast('Image updated successfully!');
                uploadModal.classList.add('hidden');
                fetchSiteData(); // Refresh dashboard
            } else {
                showToast(data.message || 'Upload failed', true);
                if (res.status === 401 || res.status === 403) {
                    logoutBtn.click(); // Token expired or invalid
                }
            }
        } catch (error) {
            console.error(error);
            showToast('Server error during upload', true);
        } finally {
            confirmUploadBtn.innerHTML = 'Upload & Save';
            confirmUploadBtn.disabled = false;
        }
    });

    // --- Text Editing Modal Logic ---
    const textEditModal = document.getElementById('text-edit-modal');
    const editSectionNameInput = document.getElementById('edit-section-name');
    const editSectionDescInput = document.getElementById('edit-section-desc');
    const saveTextBtn = document.getElementById('save-text-btn');
    const closeTextModalBtn = document.getElementById('close-text-modal-btn');
    const cancelTextModalBtn = document.getElementById('cancel-text-modal-btn');
    let currentTextSection = '';

    window.openTextModal = (sectionKey) => {
        currentTextSection = sectionKey;
        const sectionData = siteDataCache[sectionKey];
        if (sectionData) {
            editSectionNameInput.value = sectionData.name || '';
            editSectionDescInput.value = sectionData.description || '';
            textEditModal.classList.remove('hidden');
        }
    };

    window.closeTextModal = () => {
        textEditModal.classList.add('hidden');
        currentTextSection = '';
    };

    if (closeTextModalBtn) closeTextModalBtn.addEventListener('click', window.closeTextModal);
    if (cancelTextModalBtn) cancelTextModalBtn.addEventListener('click', window.closeTextModal);

    if (saveTextBtn) {
        saveTextBtn.addEventListener('click', async () => {
            if (!currentTextSection || !currentToken) return;

            const name = editSectionNameInput.value.trim();
            const description = editSectionDescInput.value.trim();

            if (!name) {
                showToast('Section title is required', true);
                return;
            }

            saveTextBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
            saveTextBtn.disabled = true;

            try {
                const res = await fetch(API_BASE + 'api/update_text.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`
                    },
                    body: JSON.stringify({
                        section: currentTextSection,
                        name: name,
                        description: description
                    })
                });
                const data = await res.json();

                if (data.success) {
                    showToast('Text updated successfully!');
                    textEditModal.classList.add('hidden');
                    fetchSiteData(); // Refresh the list
                } else {
                    showToast(data.message || 'Update failed', true);
                    if (res.status === 401 || res.status === 403) {
                        logoutBtn.click();
                    }
                }
            } catch (error) {
                console.error(error);
                showToast('Server error during text update', true);
            } finally {
                saveTextBtn.innerHTML = 'Save Changes';
                saveTextBtn.disabled = false;
            }
        });
    }

    // --- Utils ---
    function showToast(message, isError = false) {
        toastMsg.textContent = message;
        toast.style.borderLeftColor = isError ? 'var(--error)' : 'var(--success)';
        toast.querySelector('i').className = isError ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-check';
        toast.querySelector('i').style.color = isError ? 'var(--error)' : 'var(--success)';
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
