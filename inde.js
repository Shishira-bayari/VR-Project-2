AFRAME.registerComponent('swipe-detector', {
    init() {
      this.el.addEventListener('touchstart', this.onTouchStart.bind(this));
      this.el.addEventListener('touchend', this.onTouchEnd.bind(this));
    },
    onTouchStart(event) {
      this.touchStartX = event.detail.x;
      this.touchStartY = event.detail.y;
    },
    onTouchEnd(event) {
      const touchEndX = event.detail.x;
      const touchEndY = event.detail.y;
      const dx = Math.abs(touchEndX - this.touchStartX);
      const dy = Math.abs(touchEndY - this.touchStartY);
      const swipeDist = Math.sqrt(dx * dx + dy * dy);
      if (swipeDist > 100) { // Adjust minimum swipe distance as needed
        this.checkCollisions(touchEndX, touchEndY);
      }
    },
    checkCollisions(x, y) {
      const raycaster = this.el.components.raycaster;
      const intersections = raycaster.getIntersections({
        objects: '.collidable',
      });
      // Check for intersections with both squares
      const redSquareHit = intersections.find(i => i.object.el.getAttribute('material').color === 'red');
      const blueSquareHit = intersections.find(i => i.object.el.getAttribute('material').color === 'blue');
      if (redSquareHit && blueSquareHit) {
        console.log('Squares collided!');
        // Add your collision logic here, e.g., play sound, change colors, trigger animations
      }
    },
  });
  