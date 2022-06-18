function setup(){
    canvas=createCanvas(600,500);

    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotPoses);
}

function modelloaded(){
    console.log('PoseNet is Intialized');
}

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

score_leftWrist=0;
score_rightWrist=0;

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_leftWrist=results[0].pose.keypoints[9].score;
        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("score leftWrist" + score_leftWrist + "  score rightWrist" + score_rightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "; leftWristY= " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX);
        console.log("rightWristY= " + rightWristY);
    }
}
function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("black");
    if(score_leftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        NumberleftWistY=Number(leftWristY);
        remove_decimal = floor(NumberleftWistY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume: " + volume;
        song.setVolume(volume);
    }

    if(score_rightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<100){
            document.getElementById("speed").innerHTML="Speed = 0.5x"
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<500){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
    }
    
}

song=""

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


