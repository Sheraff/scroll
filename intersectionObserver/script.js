const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible')
		} else {
			entry.target.classList.remove('visible')
		}
	})
}, {
	rootMargin: '-25%'
})
for (const section of document.querySelectorAll('section')) {
	observer.observe(section)
}