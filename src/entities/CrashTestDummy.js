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

    this.dir = math.randf(Math.PI * 2)
    this.speed = math.rand(50, 150)

    this.vel = new Vec()
    this.acc = new Vec()

    this.bounds = bounds
  }

  update(dt) {
    const { pos, dir, speed, bounds, w, h } = this

    /* if (math.randOneIn(130)) {
      physics.applyImpulse(
        this,
        {
          x: math.rand(-300, 300),
          y: math.rand(-300, 300)
        },
        dt
      )
    } */

    this.rotation = this.dir + Math.PI / 4
    pos.add({
      x: Math.cos(dir) * speed * dt,
      y: Math.sin(dir) * speed * dt
    })

    // physics.applyFriction(this, 100);
    
    // const gravity = { x: 0, y: 500 }
    // physics.applyForce(this, gravity)
    
    physics.integratePos(this, dt);

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      // vel.x *= -1
      this.dir = -this.dir + Math.PI
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      // vel.y *= -1
      this.dir = -this.dir
    }
  }
}

export default CrashTestDummy