function goToPage(page) {
    const url = new URL(window.location.href);
    url.searchParams.set('currentPage', page);
    window.location.href = url.toString();
}