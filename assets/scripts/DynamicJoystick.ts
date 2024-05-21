import { _decorator, EventTouch, Vec3 } from "cc";
import { AbstractJoystick } from "./AbstractJoystick";
import { carController } from "./car/carController";
const { ccclass, property } = _decorator;

@ccclass("DynamicJoystick")
export class DynamicJoystick extends AbstractJoystick {
  @property(carController) car: carController | null = null;

  private touched: boolean = false;
  private moved: boolean = false;


  start() {}

  onTouchStart(event: EventTouch): void {
    this.updateStickPosition(event);
    this.touched = true;
  }
  onTouchMove(event: EventTouch): void {
    this.moved = true;
    this.updateStickPosition(event);
  }

  onTouchEnd(event: EventTouch): void {
    this.moved = false;
    this.touched = false;
    this.resetJoystickPos();
  }

  update(dt: number): void {
    if(this.touched && this.moved){
        this.car.move(this.direction)        
    }
  }
}
