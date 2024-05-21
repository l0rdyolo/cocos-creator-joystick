import {
    _decorator,
    Component,
    EventTouch,
    Node,
    UIOpacity,
    UITransform,
    Vec2,
    Vec3,
  } from "cc";
  import IJoystick from "./IJoystick";
import { tweenManager } from "../managers/TweenManager";
  const { ccclass, property } = _decorator;
  
  @ccclass("AbstractJoystick")
  export abstract class AbstractJoystick extends Component implements IJoystick {
    @property(Node) protected ring: Node | null = null;
    @property(Node) protected stick: Node | null = null;
  
    private opacityComponent : UIOpacity;

    protected touchStartPos: Vec3;
    protected stickStartPos: Vec3;
    protected radius: number;
    protected touchId: number;
    protected direction: Vec3 = new Vec3();
    protected lastDirection: Vec3 = new Vec3();
    protected isDynamic: boolean;
  
    abstract onTouchStart(event: EventTouch): void;
    abstract onTouchMove(event: EventTouch): void;
    abstract onTouchEnd(event: EventTouch): void;
  
    onLoad(): void {
      //activate listeners
      if (this.ring) {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  
        if (this.stick) {
          this.stickStartPos = this.stick.position;
        }
  
        //max radius
        this.radius = this.calculateMaxRadius();
        
      }
      //init opacity
      this.opacityComponent = this.ring.getComponent(UIOpacity);
      this.opacityComponent.opacity = 0;
    }
  
    onDestroy(): void {
      if (this.node) {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      }
    }
  
    getDirection(): Vec3 {
      return this.direction;
    }
  
    protected updateStickPosition(event: EventTouch): void {
      const touchPos = this.getVector3(event.getUILocation());
      
      if (this.ring && this.stick) {
        const worldPos: Vec3 = this.ring
        .getComponent(UITransform)
        .convertToNodeSpaceAR(touchPos);
        
        
        //converted touchStartPos
        this.limitJoystick(worldPos);
        this.stick.position = worldPos;        
        this.updateDirection(worldPos);
      }
  
      // //direction log
      // console.log(this.getDirection().x , this.getDirection().y);
      
    }

    protected updateJoystickPosition(event: EventTouch): void {
      const touchPos = this.getVector3(event.getUILocation());
      const worldPos: Vec3 = this.node
        .getComponent(UITransform)
        .convertToNodeSpaceAR(touchPos);
      this.touchStartPos = worldPos;

      // if(worldPos.length() > this.radius * 1.5 && this.touchId === 2){
      //   tweenManager.tweenTargetPos(this.ring ,worldPos)
        
      // }
    }
  
    protected resetStickPos(): void {
      this.stick.position = Vec3.ZERO;
    }
  
    protected hideJoystick(): void {
      // this.stick.active = false;
      tweenManager.tweenOpacity(this.opacityComponent , true)
    }
    protected showJoystick(): void {
      // this.stick.active = true;
      this.updateRingPosition();
      tweenManager.tweenOpacity(this.opacityComponent , false)


    }
  

    private updateRingPosition(){
      this.ring.setPosition(this.touchStartPos);
      
    }

    private limitJoystick(stickWorldPos : Vec3) : void{
      //stick mag > stick max radius 
      if(stickWorldPos.length() > this.radius){
          stickWorldPos.multiplyScalar(this.radius/stickWorldPos.length());
      }

    }
    //convert vec2 to vec3
    protected getVector3(_vec2: Vec2): Vec3 {
      return new Vec3(_vec2.x, _vec2.y, 0);
    }
  
    private calculateMaxRadius() : number{
      //this code accepts only if contentSize x and y is equal
      const ringContentSize = this.ring.getComponent(UITransform).contentSize.x;
      const stickContentSize = this.stick.getComponent(UITransform).contentSize.x;
  
      const ratioBetweenRingAndStick = ringContentSize / stickContentSize;
  
      const radius =  (ringContentSize / ratioBetweenRingAndStick) + (stickContentSize / ratioBetweenRingAndStick)  
   
      return radius;
    }
  
    protected updateDirection(stickWorldPos:Vec3):void{
      this.direction.set(stickWorldPos.x / this.radius, stickWorldPos.y / this.radius, 0);
      this.direction.clampf(new Vec3(-1, -1, -1), new Vec3(1, 1, 1));
  
    }
  }