import { _decorator, Component, Node, Vec3 } from "cc";
import { DynamicJoystick } from "../joystick/DynamicJoystick";
const { ccclass, property } = _decorator;

@ccclass("carController")
export class carController extends Component {
    @property(Node) joystickManager: Node | null = null;
    private joystick: DynamicJoystick | null = null;
    private speed: number = 2;

    onLoad(): void {
        if (this.joystickManager) {
            this.joystick = this.joystickManager.getComponent(DynamicJoystick);
          }
        else{
            console.warn("no joystick")
          }
    }

    move(direction: Vec3) {
        if(direction.length() <= 0) return;
        const movement = direction.normalize().multiplyScalar(this.speed);
        this.node.position = this.node.position.add(movement);
        this.setDirection(direction);
    }

    setDirection(direction: Vec3) {
        const angle = Math.atan2(direction.y, direction.x);
        this.node.setRotationFromEuler(0, 0, angle * (180 / Math.PI));
    }
    update(deltaTime: number) {
        if (this.joystick) {
            
          this.move(this.joystick.getDirection());
        }
      }
}
