var monster_colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){
        this.r = args.r || random(40,150)  //設計的怪物主體，傳送args.r來設定大小
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量,由電腦亂數抽取初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數,會利用亂數抽取x,y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //代表活著
        this.timenum = 0

   }
    draw(){ //劃出元件
    if (this.dead == false){ //假如怪物活著
        push() //重新設定原點位置
            translate(this.p.x,this.p.y)
            //把原點(0,0)座標移到物件中心位置
            fill(this.color)
            //隨機填滿怪物的色彩設定值
            noStroke()
            //沒有邊框
            ellipse(0,0,this.r)
            //怪物的身體
        
            //+====================================
            if(this.mode == "happy"){ //假如是快樂"happy"模式
                fill(255) //填滿白色的底
                ellipse(0,0,this.r/2) //圓眼眶
                fill("#ff006e") //填滿紅色"#930000"
                ellipse(0,0,this.r/3) //圓眼睛
            }else{ //否則為"bad"模式
                fill(255) //填滿白色的底
                arc(0,0,this.r/2,this.r/2,0,PI) //半圓眼眶
                fill("#FF2D2D") //填滿紅色"#FF2D2D"
                arc(0,0,this.r/3,this.r/3,0,PI) //半圓眼睛

            }
          
            stroke(this.color) //框線顏色為怪物的隨機色彩設定
            strokeWeight(15) //框線粗細15
            // line(this.r/2,0,this.r,0)
            noFill() //不要填滿以下物體
            for(var j=0;j<10;j++){ //觸手的數量<4
                rotate(PI/5) //觸手設置(依圓周率進行分配)
                beginShape() //圖形繪製的開始(開始定義)
            for(var i = 0;i<(this.r/2);i++){ 
                vertex(this.r/2+i,sin(i/8+frameCount*100))
                } 
                //設置圖形的頂點，this.r/2+i 代表頂點的 x 坐標，
               // sin(i/8+frameCount*100) 則代表頂點的 y 坐標
            endShape() //結束定義圖形
            }
        pop()}
               else{ //怪物死亡的畫面
            this.timenum = this.timenum +8 //死亡畫面停留時間
            push() 
                translate(this.p.x,this.p.y) //位移位置
                fill(this.color) //隨機填滿怪物設定色彩
                noStroke() //沒有邊框 
                ellipse(0,0,this.r) //怪物死亡身體
                stroke(255) //以下線條顏色
                strokeWeight(4)//線條粗細
                line(-this.r/2,0,this.r/2,0)//線條的繪製
            pop()
                
        }
   }
   update(){ //計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 ||this.p.x>=width){ //X軸碰到左邊(<=0),或是碰到右邊(>=width)
            this.v.x= -this.v.x
          }
          if(this.p.y<=0 ||this.p.y>=height){ //Y軸碰到上邊(<=0),或是碰到下邊(>=height)
            this.v.y= -this.v.y //y軸方向,把速度改變
   }
}
    isBallInRanger(x,y){ //判斷飛彈是否在怪物的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(飛彈與物件的中心點)
        if(d<this.r/2){
          return true //滑鼠與物件的距離小於物件的寬度，
     }else{
       return false//滑鼠與物件的距離大於物件的寬度
     }
     }
}