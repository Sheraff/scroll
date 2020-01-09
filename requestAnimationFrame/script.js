const RATIO_PADDING = .5 // 0 < x < 1

const sections = Array.from(document.querySelectorAll('section'))
const rects = new WeakMap(sections.map(section => [section, {
	y: section.offsetTop - section.scrollTop + section.clientTop,
	height: section.offsetHeight,
}]))

function scrollAnim() {
	let scroll = 0
	let previousScroll
	let halfViewport = innerHeight / 2
	function frame() {
		if(scroll !== previousScroll) {
			const scrollCenter = scroll + halfViewport
			sections.forEach((section, i) => {
				const sectionCenter = rects.get(section).y + rects.get(section).height / 2
				const relativePosition = sectionCenter - scrollCenter
				const aboveFlag = relativePosition < 0
				const ratio = Math.min(1, Math.max(0, Math.abs(relativePosition / halfViewport)))
				const paddedRatio = ratio < RATIO_PADDING ? 0 : (ratio - RATIO_PADDING) * (1 / RATIO_PADDING)
				section.style.transform = `translate(${i%2 ? '-' : ''}${100*paddedRatio}%, ${aboveFlag ? '-' : ''}${50*paddedRatio}%)`
				section.style.opacity = 1 - paddedRatio
			})
			previousScroll = scroll
		}
		requestAnimationFrame(frame)
	}
	frame()
	addEventListener('scroll', () => scroll = scrollY, { passive: true })
}

scrollAnim()