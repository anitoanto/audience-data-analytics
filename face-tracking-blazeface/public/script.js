let video = document.getElementById("video");
let model;
// declare a canvas variable and get its context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let mid = window.location.href.substring(window.location.href.length - 36);
let userId = makeid(8);

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function writeUserData(mid, userId, isPresent) {

  // change api endpoint as per your project
  
  if (window.location.href.includes("?mid=")) {
    fetch(
      "https://ada-makeaton-tracking-default-rtdb.asia-southeast1.firebasedatabase.app/ada-makeaton-tracking-default-rtdb.json",
      {
        method: "PATCH",
        body: JSON.stringify({
          [userId]: {
            data: {
              mid: mid,
              isPresent: isPresent,
            },
          },
        }),
      }
    );
  }
}

const setupCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 600, height: 400 },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    });
};

const detectFaces = async () => {
  const prediction = await model.estimateFaces(video, false);

  let isPresent = prediction.length;
  // console.log(prediction.length);

  // console.log(window.location.href);
  // console.log(mid);
  // console.log(userId);
  await writeUserData(mid, userId, isPresent);

  // draw the video first

  ctx.drawImage(video, 0, 0, 600, 400);

  prediction.forEach((pred) => {
    // draw the rectangle enclosing the face
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    // the last two arguments are width and height
    // since blazeface returned only the coordinates,
    // we can find the width and height by subtracting them.
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[0] - pred.topLeft[0],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();

    // drawing small rectangles for the face landmarks
    ctx.fillStyle = "red";
    pred.landmarks.forEach((landmark) => {
      ctx.fillRect(landmark[0], landmark[1], 5, 5);
    });
  });
};

setupCamera();
video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();

  // call detect faces every 100 milliseconds or 10 times every second
  setInterval(detectFaces, 200);
});
