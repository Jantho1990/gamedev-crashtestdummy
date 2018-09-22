import Texture from '../../pop/Texture';
import TileSprite from '../../pop/TileSprite'
import Vec from '../../pop/utils/Vec'
import math from '../../pop/utils/math'

const texture = new Texture('res/img/crash_test.png')

class CrashTestDummy extends TileSprite {
  constructor(bounds) {
    super(texture, 48, 48)
    this.pivot = { x: 24, y: 24 }
    this.frame.x = math.rand(4)
    this.vel = new Vec()
    this.acc = new Vec()
    this.bounds = bounds
    this.time = 0
  }

  update(dt) {
    const { pos, vel, bounds, w, h, acc } = this

    const ACCELERATION = 200
    acc.x += ACCELERATION

    vel.x += acc.x * dt
    vel.y += acc.y * dt

    // Move in the direction of the path
    pos.x += vel.x * dt
    pos.y += vel.y * dt

    // Print out what we expect from displacement test
    this.time += dt
    if (this.time >= 2 && !this.prnt) {
      const expectedPos = 0.5 * ACCELERATION * this.time * this.time
      console.log(this.time, pos.x, expectedPos, expectedPos - pos.x)
      this.prnt = true
    }

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      vel.x *= -1
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      vel.y *= -1
    }

    this.rotation += vel.x * 0.05 * dt

    acc.set(0, 0)
  }
}

export default CrashTestDummy