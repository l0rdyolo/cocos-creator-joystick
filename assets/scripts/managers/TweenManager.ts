import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TweenManager')
export class TweenManager extends Component {


    opacityDuration:number = 0.5;
    targetPosDuration:number = 0.5;
    isMoveTweening:boolean = false;

    start() {

    }

    tweenOpacity(targetNode : UIOpacity , decrease : boolean){
        const targetOpacityValue = decrease ? 0 : 255;

        tween(targetNode)
        .to(
            this.opacityDuration,
            {opacity:targetOpacityValue},
            {easing:"sineInOut"},
        )
        .start();
    }

    tweenTargetPos( tweenNode : Node,targetPos : Vec3 ){
        tween(tweenNode)
        .to(
            this.targetPosDuration,
            {
                position:targetPos
            }
        )
        .call(()=>{
            // this.isMoveTweening = false;
        })
        .start();
    }

    update(deltaTime: number) {
        
    }
}

export const tweenManager = new TweenManager();