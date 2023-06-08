class Obj{//宣告一個類別，針對一個畫的圖案
    constructor(args){//預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
      //this.p = {x:random(width),y:random(height)}//描述該物件的初始位置
                                             //
                                             //
      this.p = args.p||createVector(random(0,width),random(0,height))//描述該物件的初始位置                                       
      //this.v = {x:random(-1,1),y:random(-1,1)}//物件移動速度
      this.v = createVector(random(-1,1),random(-1,1))//物件移動速度
      this.size = random(5,10)//放大倍率
      this.color = random(fill_colors)//充滿顏色
      this.stroke = random(line_colors)//外框線條
    }
    
   draw(){
      push()
        translate(this.p.x,this.p.y) 
        //繪圖前，將原點移動到 this.p.x 和 this.p.y 的座標位置
        scale(this.v.x<0?1:-1,-1) //放大縮小
        fill(this.color)  //圖形內充滿this.color的參數色
        stroke(this.stroke) //線段塗色為this.stroke的參數
        noStroke() //不畫邊
        beginShape() //繪圖起始點
         for(var k=0; k<points.length; k=k+1){
             
    //設定一個點，當指令到endShape(close)，把所有點連一起
          
          curveVertex(points[k][0]*this.size,points[k][1]*this.size)//畫圓弧線
        }
        endShape(close) //繪圖終點,讓圖形進行封閉
      pop() //讓原點(0,0)設定回到視窗左上角
    }
    update(){
      //this.p.x = this.p.x + this.v.x
      //this.p.y = this.p.y + this.v.y
      this.p.add(this.v) //設定好向量,\使用add就可以與上面兩行
      

      if(this.p.x<=0 ||this.p.x>=width){ //X軸碰到左邊(<=0),或是碰到右邊(>=width)
        this.v.x= -this.v.x
      }
      if(this.p.y<=0 ||this.p.y>=height){ //Y軸碰到上邊(<=0),或是碰到下邊(>=height)
        this.v.y= -this.v.y //y軸方向,把速度改變

    }
}
    isBallInRanger(x,y){ // 功能：判斷飛彈的位置是否移動到物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件的中心點)
       if(d<4*this.size){ //使用d值的this.size跟4比較
        return true //假如小時4時代表轉為死亡/打中
      }else{
        return false//否則為大時4時代表沒有打中
      }
    }

}
