import { _decorator, EventTouch, UITransform, Vec3 } from "cc";
import { AbstractJoystick } from "./AbstractJoystick";
const { ccclass, property } = _decorator;

@ccclass("DynamicJoystick")
export class DynamicJoystick extends AbstractJoystick {

  start() {}

  onTouchStart(event: EventTouch): void {
    this.updateJoystickPosition(event);
    this.showJoystick();
    this.touchId = 1;
  }
  onTouchMove(event: EventTouch): void {
    this.resetStickPos();
    this.updateStickPosition(event);
    this.updateJoystickPosition(event);
  }

  onTouchEnd(event: EventTouch): void {

    this.resetStickPos();
    this.updateStickPosition(event);
    this.hideJoystick();
    this.touchId = 2;

  }

  update(dt: number): void {
    
  }


}
