/**
 * Creative Gallery Script
 * This script allows you to easily change gallery images by modifying the imageMap array
 */
document.addEventListener('DOMContentLoaded', function() {
    // Direct mapping of gallery images to their file paths
    // To change an image, just update the path here
    const imageMap = [
        { id: 'gallery-1', path: '../image/edit 1.jpg' },
        { id: 'gallery-2', path: '../image/edited 2.jpg' },
        { id: 'gallery-3', path: '../image/IMG_0728.JPG' },
        { id: 'gallery-4', path: '../image/FINAL.jpg'},
        { id: 'gallery-5', path: '../image/kaws.png' },
        { id: 'gallery-6', path: '../image/Mong_Foo_Yuen_2300143_GD_Final Project_Concept_1.jpg' },
        { id: 'gallery-7', path: '../image/ikf 1.png' },
        { id: 'gallery-8', path: '../image/IMG_7709.jpg' },
        { id: 'gallery-9', path: '../image/IMG_7522%20copy.jpg' }, 
        { id: 'gallery-10', path: '../image/editied%20A1.png'}
    ];

    // Get all required elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCounter = document.querySelector('.modal-counter');
    const closeModalBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    // Exit if we're not on the gallery page
    if (!galleryItems.length || !galleryModal || !modalImage) {
        console.error('Not on gallery page or missing required elements');
        return;
    }
    
    console.log('Gallery script loaded');
    
    // Current image index
    let currentImageIndex = 0;
    
    // Set up click handlers for gallery items
    galleryItems.forEach((item, index) => {
        // Make the entire gallery item clickable
        item.addEventListener('click', function() {
            console.log('Gallery item clicked:', index);
            showImage(index);
        });
        
        // Also handle click on view button
        const viewBtn = item.querySelector('.gallery-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('View button clicked:', index);
                showImage(index);
            });
        }
    });
    
    // Set up modal navigation
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            hideModal();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous button clicked');
            showPrevImage();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Next button clicked');
            showNextImage();
        });
    }
    
    // Click outside image to close
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            hideModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            hideModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Click on image for next/previous
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
        const x = e.clientX;
        const width = window.innerWidth;
        
        if (x < width / 2) {
            showPrevImage();
        } else {
            showNextImage();
        }
    });
    
    // Helper functions
    function showImage(index) {
        if (index < 0 || index >= imageMap.length) {
            console.error('Invalid image index:', index);
            return;
        }
        
        currentImageIndex = index;
        
        // Get image info
        const imageInfo = imageMap[index];
        
        console.log('Showing image:', imageInfo.path);
        
        // Update modal content
        modalImage.src = imageInfo.path;
        modalImage.alt = `Gallery image ${index + 1}`;
        
        // Handle image loading errors
        modalImage.onerror = function() {
            console.error('Failed to load image:', imageInfo.path);
            modalImage.src = '../image/placeholder.jpg';
        };
        
        // Update counter
        modalCounter.textContent = `${index + 1} / ${imageMap.length}`;
        
        // Show the modal
        galleryModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function hideModal() {
        console.log('Hiding modal');
        galleryModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    function showPrevImage() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = imageMap.length - 1;
        showImage(newIndex);
    }
    
    function showNextImage() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= imageMap.length) newIndex = 0;
        showImage(newIndex);
    }
    
    // Preload images for better performance
    imageMap.forEach(img => {
        const preloader = new Image();
        preloader.src = img.path;
    });
    
    // HOW TO CHANGE GALLERY IMAGES:
    // 1. Find the imageMap array at the top of this file
    // 2. Change the 'path' value for any image you want to update
    // 3. Make sure your image files are in the correct location
}); 