document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter span');

    const startCounting = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / 200; // Adjust the duration of the animation by changing the number

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1); // Speed of the counter
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // IntersectionObserver to start the counter when the element is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target); // Stop observing once the counter starts
            }
        });
    }, {
        threshold: 0.1 // Adjust the threshold if needed
    });

    // Observe the .stats section
    const statsSection = document.querySelector('.stats');
    observer.observe(statsSection);
});
