export function scrollToTop() {
    const scrollToTop = () => {
        const position = window.pageYOffset;

        if (position > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, position - 30);
        }
    };
    scrollToTop();
}
