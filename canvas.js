window.addEventListener('load', () =>{
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');


//===================

	//Resizing
	canvas.height = window.innerHeight-8;
	canvas.width = window.innerWidth-8;
  //var date1 = new Date();
  //var date2 = new Date();


	//variables
	let painting = false;
  //===== Initial =====
  var xInitial = 1;
  var yInitial = 1;
  var timeInitial;
  //===== Final =====
  var xFinal = 1;
  var yFinal = 1;
  var timeFinal;
  //Other Var
  var timeUsed = 0;
  var speedX = 0;
  var speedY = 0;
  var xLanding = 0;
  var yLanding = 0;
  var score = 0;

  //Speed Factor
  var speedFac = 1;  //Default = 1

  ctx.arc(canvas.width*0.5, canvas.height*0.35, 70, 0, 2 * Math.PI);
  ctx.fillStyle = "#edeeef";
  ctx.fill();
  ctx.strokeStyle = "#dbdee0";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvas.width*0.5, canvas.height*0.9, 25, 0, 2 * Math.PI);
  ctx.fillStyle = "BLACK";
  ctx.fill();

  
	function startPosition(e) {

		painting = false;
		//draw(e);

    timeInitial = new Date();
    xInitial = e.clientX;
    yInitial = e.clientY;
    //console.log("X(i) = ", xInitial,"Y(i) = ", yInitial);
    //console.log("t(i) = ", timeInitial);
    ctx.arc(xInitial, yInitial, 5, 0, 2 * Math.PI);

	}

	function finishedPosition(e) {
      painting = true;
      ctx.beginPath();

      timeFinal = new Date();
      xFinal = e.clientX;
      yFinal = e.clientY;
      
      timeUsed = timeFinal-timeInitial;
      

      speedX = (xFinal-xInitial)/timeUsed*speedFac;
      speedY = (yFinal-yInitial)/timeUsed*speedFac;
      
      drawLine();
	}

  function drawLine() {
    if (xInitial>canvas.width*0.5-25 && xInitial<canvas.width*0.5+25 && yInitial>canvas.height*0.9-25 && yInitial<canvas.height*0.9+25) {
        if(!painting) return;
        painting = true;
        ctx.lineCap = "round";
        var x = xFinal;
        var y = yFinal;

        xLanding = x+(speedX*x);
        yLanding = y+(speedY*y);
        
        painting = false;
        writeScore();
        animate();
        
    }
  }


  async function animate() {
      
    var distanceX = xLanding - xInitial;
    var distanceY = yLanding - yInitial;
    var xCurrent = xInitial;
    var yCurrent = yInitial;
    
    for (var i=0;i<150;i++) {

      (function(ind) {
        setTimeout(function(){
          ctx.strokeStyle = "GREY";
          ctx.lineWidth = 0.1;
          ctx.arc(xCurrent+distanceX/150, yCurrent+distanceY/150, 3, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          xCurrent = xCurrent+distanceX/150;
          yCurrent = yCurrent+distanceY/150;
        }, 0 + (2 * ind));
      })(i);
    }

    (function(ind) {
        setTimeout(function(){
        ctx.arc(xLanding, yLanding, 10, 0, 2 * Math.PI);
        ctx.fill();
        }, 300 + (0 * ind));
      })(i);
  }
    

  function writeScore() {
    // if (xLanding>canvas.width*0.5-70 && xLanding<canvas.width*0.5+70 && yLanding>canvas.height*0.35-70 && yLanding<canvas.height*0.35+70) {
    //   score = score + 1;
    //   console.log("SCORE = ", score);
    // }
     a = xLanding - canvas.width*0.5;
    b = yLanding - canvas.height*0.35;
    var r = Math.sqrt(Math.pow(Math.abs(a),2) + Math.pow(Math.abs(b),2) );
    ctx.font = "30px Arial";
    ctx.fillStyle = "BLACK";
    ctx.clearRect(150, 5, 40, 30);
    ctx.fillText("SCORE : ", 10, 30);
    ctx.fillText(score, 150, 30);
    if (r<=70) {
      score = score + 1;
      console.log("SCORE = ", score);
      ctx.fillStyle = "GREEN";
    } else {
      ctx.fillStyle = "RED";
    }
    
  }
  
  // NOT USED VVV
	function draw(e) {
		if(!painting) return;
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
    var x = e.clientX;
    var y = e.clientY;


		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		//ctx.moveTo(x, y);
    //ctx.moveTo(e.clientX, e.clientY);


	}
	

	//EventListeners
	canvas.addEventListener('mousedown',startPosition);
	canvas.addEventListener('mouseup',finishedPosition);
	//canvas.addEventListener('mousemove',draw);
  // canvas.addEventListener('touchstart',getTouchPos, false);
  // canvas.addEventListener('touchend',finishedPosition);

});

