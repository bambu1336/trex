var sprite
var invisibleGround
var trex, trex_running, edges;
var groundImage;
var nuvem
var cloudImg
var pontos = 0
var obstaculo
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6
var cactusGroup
var nuvemGroup
var play = 1
var end = 0
var gameState = play
var trexCollide
var gameOverImagem
var gameOver
var restart
var restartImagem
var checkpoint
var die
var jump


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
  trexCollide = loadAnimation("trex_collided.png")
  gameOverImagem = loadImage("gameOver.png")
  restartImagem = loadImage("restart.png")
  checkpoint = loadSound("checkpoint.mp3")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")



}

function setup() {
  createCanvas(windowWidth, windowHeight);
  invisibleGround = createSprite(width/2, height-10, width, 6)
  invisibleGround.visible = false
  //criando o trex
  trex = createSprite(50, height-70, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollide);
  gameOver = createSprite(width/2, height/2)
  gameOver.addImage(gameOverImagem)
  restart = createSprite(width/2, height/2 +70)
  restart.addImage(restartImagem)
  gameOver.scale = 0.5
  restart.scale = 0.5
  gameOver.visible = false
  restart.visible = false
 

  edges = createEdgeSprites();
  cactusGroup = new Group()
  nuvemGroup = new Group()




  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  sprite = createSprite(width/2, height-20, width, 400)
  sprite.addImage(groundImage)
  trex.setCollider("circle", 0, 0, 40)
  trex.debug = false


}


function draw() {
  //definir a cor do plano de fundo 

  background("white");
  text("pontos: " + pontos, width-100, height/2)

    

  if (gameState === play) {
    sprite.velocityX = -(5+3*pontos/100)
    //pontos = pontos + Math.round(4*frameCount / 330)
    pontos = Math.round(0.6 + pontos)
    gerarNuvem()
    gerarObstaculo()
    if (sprite.x < 0) {
      sprite.x = sprite.width / 2
    }
    //pular quando tecla de espaço for pressionada
    if ((touches.length>0|| keyDown("space")) && trex.y > height-45) {
      trex.velocityY = -10;
      jump.play()
      touches=[]


    }
    if (pontos % 100 === 0) {
      checkpoint.play()




    }




    trex.velocityY = trex.velocityY + 0.5;
    if (cactusGroup.isTouching(trex)) {
      die.play()
      gameState = end
      //trex.velocityY=-10



    }


  } else if (gameState === end) {
    sprite.velocityX = 0
    trex.velocityY = 0
    cactusGroup.setVelocityXEach(0)
    nuvemGroup.setVelocityXEach(0)
    cactusGroup.setLifetimeEach(-1)
    nuvemGroup.setLifetimeEach(-1)


    trex.changeAnimation("collided")
    gameOver.visible = true
    restart.visible = true
    if (mousePressedOver(restart)) {
  reset ()

    }



  }



  //registrando a posição y do trex




  //impedir que o trex caia
  trex.collide(invisibleGround)
  drawSprites();
}

function gerarNuvem() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(width, 100, 40, 10)
    nuvem.velocityX = -3
    nuvem.addImage(cloudImg)
    nuvem.scale = 0.7
    nuvem.y = Math.round(random(height/2, height/2+100))
    trex.depth = nuvem.depth
    trex.depth = trex.depth + 1
    nuvem.lifetime = 300
    nuvemGroup.add(nuvem)




  }

}

function gerarObstaculo() {
  if (frameCount % 60 === 0) {

    obstaculo = createSprite(width, height-35, 10, 40)
    obstaculo.velocityX = -(5+3*pontos/100)
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstaculo.addImage(obstaculo1)
        break
      case 2:
        obstaculo.addImage(obstaculo2)
        break
      case 3:
        obstaculo.addImage(obstaculo3)
        break
      case 4:
        obstaculo.addImage(obstaculo4)
        break
      case 5:
        obstaculo.addImage(obstaculo5)
        break
      case 6:
        obstaculo.addImage(obstaculo6)
        break
      default:
        break




    }
    obstaculo.scale = 0.5
    obstaculo.lifetime = 300
    obstaculo.height = 100
    cactusGroup.add(obstaculo)



  }
}
function reset () {
  gameState=play
console.log ("funcionou")
cactusGroup.destroyEach ()
nuvemGroup.destroyEach ()
trex.changeAnimation ("running")
gameOver.visible = false
restart.visible = false
pontos=0

}









