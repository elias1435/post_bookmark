// Save for Later button
document.addEventListener("DOMContentLoaded", () => {
    const bookmarkButton = document.getElementById("bookmark");
    const savedPostButton = document.getElementById("saved-post");
    const currentUrl = window.location.href;
    const currentTitle = document.title;

    // Retrieve bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedUrls")) || [];

    // Initial visibility check for the saved post button
    if (bookmarks.length === 0) {
        savedPostButton.style.display = "none";
    } else {
        savedPostButton.style.display = "block";
    }

    // Check if the current page is already bookmarked
    if (bookmarks.some(bookmark => bookmark.url === currentUrl)) {
        bookmarkButton.querySelector(".elementor-button-text").textContent = "Bookmarked";
    }

    // Handle the bookmarking process
    bookmarkButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Check if the bookmark already exists
        if (!bookmarks.some(bookmark => bookmark.url === currentUrl)) {
            bookmarks.push({ title: currentTitle, url: currentUrl });
            localStorage.setItem("bookmarkedUrls", JSON.stringify(bookmarks));
            bookmarkButton.querySelector(".elementor-button-text").textContent = "Bookmarked";

            // Make the saved-post button visible immediately
            savedPostButton.style.display = "block";
        }
    });
});



// Display Title, Link, and Add "Clear the List" Button
document.addEventListener("DOMContentLoaded", () => {
    const bookmarkList = document.getElementById("bookmark-list");
    const clearButton = document.getElementById("clear-bookmarks");

    if (!bookmarkList) {
        console.error("Element with id 'bookmark-list' not found.");
        return;
    }

    const renderBookmarks = () => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarkedUrls")) || [];

        console.log("Bookmarks retrieved from localStorage:", bookmarks); // Debugging log

        bookmarkList.innerHTML = ""; // Clear the list first
        if (bookmarks.length === 0) {
            bookmarkList.innerHTML = "<li>No bookmarks found.</li>";
        } else {
            bookmarks.forEach(bookmark => {
                // Ensure valid bookmark object structure
                if (bookmark.title && bookmark.url) {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title}</a>`;
                    bookmarkList.appendChild(listItem);
                } else {
                    console.warn("Invalid bookmark entry:", bookmark); // Debugging log for invalid data
                }
            });
        }
    };

    // Render bookmarks on page load
    renderBookmarks();

    // Clear all bookmarks
    clearButton.addEventListener("click", () => {
        localStorage.removeItem("bookmarkedUrls");
        renderBookmarks();
    });
});
