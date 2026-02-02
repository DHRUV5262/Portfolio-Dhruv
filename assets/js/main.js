/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

    // Scroll Fade In Animation
    $(document).ready(function() {
        // Auto-add class to elements
        $('.post, .posts article, .timeline .container').addClass('fade-in-scroll');

        var $fadeElems = $('.fade-in-scroll');
        
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('visible');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            }, { threshold: 0.1 });
            
            $fadeElems.each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback for older browsers
            $fadeElems.addClass('visible');
        }
		// Modal Logic
		const modal = document.getElementById('project-modal');
		const modalClose = document.querySelector('.modal-close');
		const modalVideo = document.getElementById('modal-video');
        const modalGallery = document.getElementById('modal-gallery');
        const modalSingleImage = document.getElementById('modal-single-image');
		const modalTitle = document.getElementById('modal-title');
		const modalTags = document.getElementById('modal-tags');
		const modalDescription = document.getElementById('modal-description');
		const modalGithub = document.getElementById('modal-github');

		// Open Modal
		document.querySelectorAll('.view-project-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const card = btn.closest('article');
				
				// Populate Modal Content
				modalTitle.textContent = btn.dataset.title;
				
                // GitHub Button Logic
                if (btn.dataset.github && btn.dataset.github !== "") {
                    modalGithub.href = btn.dataset.github;
                    modalGithub.style.display = 'inline-block';
                    modalGithub.textContent = "View Code on GitHub";
                } else {
                    modalGithub.style.display = 'none';
                }

                // Play Button Logic
                const playBtn = document.getElementById('modal-play');
                if (playBtn) playBtn.remove(); // Remove existing play button to avoid duplicates

                if (btn.dataset.play && btn.dataset.play !== "") {
                    const newPlayBtn = document.createElement('a');
                    newPlayBtn.id = 'modal-play';
                    newPlayBtn.href = btn.dataset.play;
                    newPlayBtn.target = '_blank';
                    newPlayBtn.className = 'button primary';
                    newPlayBtn.textContent = 'Play Game';
                    newPlayBtn.style.marginLeft = '1rem';
                    
                    // Insert after GitHub button
                    modalGithub.parentNode.insertBefore(newPlayBtn, modalGithub.nextSibling);
                }
				
                // Handle Video vs Gallery vs Single Image
                if (btn.dataset.video === 'gallery') {
                    // Show Gallery
                    modalVideo.style.display = 'none';
                    modalSingleImage.style.display = 'none';
                    modalGallery.style.display = 'grid';
                    modalGallery.innerHTML = ''; // Clear previous images
                    
                    // Reset container for gallery (same as video)
                    const container = document.getElementById('modal-media-container');
                    container.style.paddingBottom = '';
                    container.style.height = '';
                    
                    try {
                        const images = JSON.parse(btn.dataset.gallery);
                        images.forEach(imgSrc => {
                            const img = document.createElement('img');
                            img.src = imgSrc;
                            img.alt = "Project Screenshot";
                            modalGallery.appendChild(img);
                        });
                    } catch (e) {
                        console.error("Error parsing gallery images", e);
                    }
                } else if (btn.dataset.video === 'image') {
                    // Show Single Image
                    modalVideo.style.display = 'none';
                    modalGallery.style.display = 'none';
                    modalSingleImage.style.display = 'block';
                    modalSingleImage.src = btn.dataset.image;
                    
                    // Force display block on parent to ensure visibility
                    const container = document.getElementById('modal-media-container');
                    container.style.height = 'auto'; // Remove fixed height if any
                    container.style.paddingBottom = '0'; // Remove 16:9 padding for image
                } else {
                    // Show Video
                    modalGallery.style.display = 'none';
                    modalSingleImage.style.display = 'none';
                    modalVideo.style.display = 'block';
                    modalVideo.src = btn.dataset.video;
                    
                    // Reset container for video
                    const container = document.getElementById('modal-media-container');
                    container.style.paddingBottom = '';
                    container.style.height = '';
                }

				// Clear and set tags
				modalTags.innerHTML = '';
				btn.dataset.tags.split(',').forEach(tag => {
					const span = document.createElement('span');
					span.className = 'modal-tag';
					span.textContent = tag.trim();
					modalTags.appendChild(span);
				});

				// Set description from hidden div
				const details = card.querySelector('.hidden-details');
				modalDescription.innerHTML = details.innerHTML;

				// Show Modal
				modal.classList.add('active');
				document.body.style.overflow = 'hidden'; // Prevent scrolling
			});
		});

		// Close Modal
		function closeModal() {
			modal.classList.remove('active');
			modalVideo.src = ''; // Stop video
            modalGallery.innerHTML = ''; // Clear gallery
            modalSingleImage.src = ''; // Clear image
			document.body.style.overflow = ''; // Restore scrolling
		}

		if (modalClose) {
			modalClose.addEventListener('click', closeModal);
		}

		if (modal) {
			modal.addEventListener('click', (e) => {
				if (e.target === modal) {
					closeModal();
				}
			});
		}

		// Close on Escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('active')) {
				closeModal();
			}
		});

	});

})(jQuery);