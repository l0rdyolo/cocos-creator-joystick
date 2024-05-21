import { _decorator, EventTouch, UITransform, Vec3 } from "cc";
import { AbstractJoystick } from "./AbstractJoystick";
const { ccclass, property } = _decorator;

@ccclass("DynamicJoystick")
export class DynamicJoystick extends AbstractJoystick {
  private touched: boolean = false;
  private moved: boolean = false;

  start() {}

  onTouchStart(event: EventTouch): void {
    this.updateJoystickPosition(event);
    this.showJoystick();
    this.touched = true;
    this.touchId = 1;
  }
  onTouchMove(event: EventTouch): void {
    this.moved = true;
    this.resetStickPos();
    this.updateStickPosition(event);
    this.updateJoystickPosition(event);
    this.touchId = 2;
  }

  onTouchEnd(event: EventTouch): void {
    this.moved = false;
    this.touched = false;
    this.touchId = 0;
    this.resetStickPos();
    this.hideJoystick();
  }

  update(dt: number): void {
    if (this.touched && this.moved) {
      // this.car.move(this.direction)
    }
  }


}
