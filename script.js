var isDragging = false;
var offsetX = 0;
var offsetY = 0;
var zIndexCounter = 1000; // Starting z-index value

function openWindow(windowId) {
    var windowElement = document.getElementById(windowId);
    if (windowElement) {
        zIndexCounter++; // Increment the z-index for the new window
        windowElement.style.zIndex = zIndexCounter; // Set the z-index
        windowElement.style.display = "block";
        adjustIframeHeight(windowElement);

        // Center the window
        windowElement.style.top = '50%';
        windowElement.style.left = '50%';
        windowElement.style.transform = 'translate(-50%, -50%)';

        var titleBar = windowElement.querySelector('.title-bar');

        titleBar.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            bringWindowToFront(windowElement);
        });

        window.addEventListener('mousemove', dragWindow);
        window.addEventListener('mouseup', function () {
            isDragging = false;
        });
    }
}

function closeWindow(windowId) {
    var windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = "none";

        // Remove event listeners when the window is closed
        window.removeEventListener('mousemove', dragWindow);
    }
}

function dragWindow(e) {
    if (isDragging) {
        var windowElement = document.querySelector('.window');
        if (windowElement) {
            windowElement.style.left = e.clientX - offsetX + 'px';
            windowElement.style.top = e.clientY - offsetY + 'px';
        }
    }
}

function bringWindowToFront(windowElement) {
    zIndexCounter++; // Increment the z-index when a window is clicked
    windowElement.style.zIndex = zIndexCounter; // Set the updated z-index
}
