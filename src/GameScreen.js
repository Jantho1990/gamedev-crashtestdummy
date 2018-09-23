import pop from '../pop/'
const { Container, math } = pop
import CrashTestDummy from './entities/CrashTestDummy'

class GameScreen extends Container {
  constructor(game, controls) {
    super()
    this.w = game.w
    this.h = game.h
    this.controls = controls
    this.bounds = { x: 0, y: 0, w: this.w, h: this.h }

    for (let i = 0; i < 30; i++) {
      const ctd = this.add(new CrashTestDummy(this.bounds, this.controls))
      ctd.pos.set(this.w / 2, this.h / 2)
    }
  }
}

export default GameScreen