name_ob="";
object=[];
status="";
video="";
function preload() {
    
}
function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video=  createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,480,380);
    if (status!="") {
        od.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Decteded";

            fill("#FF0000");
            precent= floor(object[i].confidence * 100);
            text(object[i].label+""+precent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==name_ob){
                video.stop();
                od.detect(gotResult);
                document.getElementById("found_object").innerHTML =name_ob+" found";
                synth= window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(name_ob+" found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("found_object").innerHTML =name_ob+" not found";
            }

        }
    }
}

function start() {
    od= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML ="Status: Decting Objects";
    name_ob=document.getElementById("ob_name").value;
}
function modelLoaded() {
    console.log("model loaded");
    status= true;
}

function gotResult(error,result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        object=result;
    }
}