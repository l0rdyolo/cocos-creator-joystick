import { _decorator, Component, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("carController")
export class carController extends Component {
    private speed: number = 2;

    move(direction: Vec3) {
        const movement = direction.normalize().multiplyScalar(this.speed);
        this.node.position = this.node.position.add(movement);
        this.setDirection(direction);
    }

    setDirection(direction: Vec3) {
        const angle = Math.atan2(direction.y, direction.x);
        this.node.setRotationFromEuler(0, 0, angle * (180 / Math.PI));
    }
}
