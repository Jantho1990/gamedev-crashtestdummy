import Texture from '../../pop/Texture';
import TileSprite from '../../pop/TileSprite'
import Vec from '../../pop/utils/Vec'
import math from '../../pop/utils/math'
import physics from '../../pop/utils/physics'

const texture = new Texture('res/img/crash_test.png')

class CrashTestDummy extends TileSprite {
  constructor(bounds) {
    super(texture, 48, 48)
    this.pivot = { x: 24, y: 24 }
    this.frame.x = math.rand(4)
    this.vel = new Vec()
    this.acc = new Vec()
    this.bounds = bounds
  }

  update(dt) {
    const { pos, vel, bounds, w, h } = this

    if (math.randOneIn(130)) {
      physics.applyImpulse(
        this,
        {
          x: math.rand(-300, 300),
          y: math.rand(-300, 300)
        },
        dt
      )
    }

    const friction = vel.clone()
      .multiply(-1)
      .normalize()
      .multiply(200)
    const gravity = { x: 0, y: 500 }

    physics.applyForce(this, friction)
    physics.applyForce(this, gravity)

    physics.integrate(this, dt)

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      vel.x *= -1
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      vel.y *= -1
    }

    this.rotation += vel.x * 0.05 * dt
  }
}

export default CrashTestDummy