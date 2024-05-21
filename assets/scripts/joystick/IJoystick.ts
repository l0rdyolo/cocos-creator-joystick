import { _decorator,  EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export default interface IJoystick {
    onTouchStart(event: EventTouch): void;
    onTouchMove(event: EventTouch): void;
    onTouchEnd(event: EventTouch): void;
    getDirection(v : Vec3): Vec3;
   } 