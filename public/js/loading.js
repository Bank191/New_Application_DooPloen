/**
 * DooPloen Loading Animation - JavaScript Controller
 * Usage: DooPloen.show() | DooPloen.hide() | DooPloen.duration(ms)
 */

class DooPloenLoader {
  constructor() {
    this.autoHideDuration = 3000;
    this.created = false;
  }

  /**
   * Create loader HTML if not exists
   */
  createLoader() {
    if (this.created) return;

    const loaderHTML = `
      <div class="dooploen-loader" id="dooploenLoader">
        <div class="loader-background">
          <div class="loader-circle loader-circle-1"></div>
          <div class="loader-circle loader-circle-2"></div>
        </div>
        <div class="loader-content">
          <div class="loader-logo-wrapper">
            <div class="loader-play-btn"></div>
            <div class="loader-logo">DooPloen</div>
          </div>
          <div class="loader-spinner"></div>
          <div class="loader-text">
            <span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span>
          </div>
          <div class="loader-progress">
            <div class="loader-progress-bar"></div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    this.created = true;
  }

  /**
   * Show the loader
   */
  show() {
    this.createLoader();
    const loader = document.getElementById('dooploenLoader');
    if (loader) {
      loader.classList.add('active');
    }
  }

  /**
   * Hide the loader with fade out effect
   */
  hide() {
    const loader = document.getElementById('dooploenLoader');
    if (loader) {
      loader.style.transition = 'opacity 0.5s ease-out';
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.classList.remove('active');
        loader.style.opacity = '1';
        loader.style.transition = 'none';
      }, 500);
    }
  }

  /**
   * Show loader for specific duration then hide
   * @param {number} duration - Duration in milliseconds (default: 3000)
   */
  duration(duration = 3000) {
    this.show();
    setTimeout(() => {
      this.hide();
    }, duration);
  }

  /**
   * Show until action completes
   * @param {Promise} promise - Promise to wait for
   */
  async waitFor(promise) {
    this.show();
    try {
      await promise;
    } finally {
      this.hide();
    }
  }

  /**
   * Show while fetching data
   * @param {string} url - URL to fetch
   * @param {object} options - Fetch options
   */
  async fetch(url, options = {}) {
    this.show();
    try {
      const response = await fetch(url, options);
      this.hide();
      return response;
    } catch (error) {
      this.hide();
      throw error;
    }
  }
}

// Create global instance
const DooPloen = new DooPloenLoader();

// Example: Show on page load
document.addEventListener('DOMContentLoaded', () => {
  // Uncomment below to auto-show on load
  // DooPloen.duration(2000);
});
