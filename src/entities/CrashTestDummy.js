import Texture from '../../pop/Texture';
import TileSprite from '../../pop/TileSprite'
import Vec from '../../pop/utils/Vec'
import math from '../../pop/utils/math'
import physics from '../../pop/utils/physics'

const texture = new Texture('res/img/crash_test.png')

class CrashTestDummy extends TileSprite {
  constructor(bounds, controls) {
    super(texture, 48, 48)
    this.pivot = { x: 24, y: 24 }
    this.frame.x = math.rand(4)

    this.dir = math.randf(Math.PI * 2)
    this.speed = math.rand(50, 150)

    this.clockwise = math.randOneIn(2)

    this.bounds = bounds
    this.controls = controls
  }

  update(dt) {
    const { pos, dir, speed, bounds, w, h, controls } = this

    this.rotation = this.dir + Math.PI / 4

    pos.add({
      x: Math.cos(dir) * speed * dt,
      y: Math.sin(dir) * speed * dt
    })

    this.dir += 0.8 * dt * controls.x

    if (math.randOneIn(30)) {
      this.clockwise = !this.clockwise
    }

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      this.dir = -this.dir + Math.PI
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      this.dir = -this.dir
    }
  }
}

export default CrashTestDummy