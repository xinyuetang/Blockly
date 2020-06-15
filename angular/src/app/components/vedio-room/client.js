// const socket = io.connect('http://localhost:3000');
// const socket = io.connect('http://ec2-3-86-88-216.compute-1.amazonaws.com:8080');
import io from './socket.io.js';
export const socket = io.connect('http://49.235.35.92:8759');

const CLIENT_RTC_EVENT = 'CLIENT_RTC_EVENT';
const SERVER_RTC_EVENT = 'SERVER_RTC_EVENT';

const CLIENT_USER_EVENT = 'CLIENT_USER_EVENT';
const SERVER_USER_EVENT = 'SERVER_USER_EVENT';

const CLIENT_USER_EVENT_LOGIN = 'CLIENT_USER_EVENT_LOGIN'; // 登录
const CLIENT_USER_EVENT_FINISH = 'CLIENT_USER_EVENT_FINISH';

const SERVER_USER_EVENT_UPDATE_USERS = 'SERVER_USER_EVENT_UPDATE_USERS';

const SIGNALING_OFFER = 'SIGNALING_OFFER';
const SIGNALING_ANSWER = 'SIGNALING_ANSWER';
const SIGNALING_CANDIDATE = 'SIGNALING_CANDIDATE';

export let remoteUser = ''; // 远端用户
export let localUser = ''; // 本地登录用户

function log(msg) {
    console.log(`[client] ${msg}`);
}

socket.on('connect', function () {
    log('ws connect.');
});

socket.on('connect_error', function () {
    log('ws connect_error.');
});

socket.on('error', function (errorMessage) {
    log('ws error, ' + errorMessage);
});


socket.on(SERVER_RTC_EVENT, function (msg) {
    const { type } = msg;

    switch (type) {
        case SIGNALING_OFFER:
            handleReceiveOffer(msg);
            break;
        case SIGNALING_ANSWER:
            handleReceiveAnswer(msg);
            break;
        case SIGNALING_CANDIDATE:
            handleReceiveCandidate(msg);
            break;
    }
});



async function handleReceiveOffer(msg) {
    log(`receive remote description from ${msg.payload.from}`);

    // 设置远端描述
    const remoteDescription = new RTCSessionDescription(msg.payload.sdp);
    remoteUser = msg.payload.from;
    createPeerConnection();
    await pc.setRemoteDescription(remoteDescription); // TODO 错误处理

    // 本地音视频采集
    const localVideo = document.getElementById('local-video');
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = mediaStream;
    mediaStream.getTracks().forEach(track => {
        pc.addTrack(track, mediaStream);
        // pc.addTransceiver(track, {streams: [mediaStream]}); // 这个也可以
    });
    // pc.addStream(mediaStream); // 目前这个也可以，不过接口后续会废弃

    const answer = await pc.createAnswer(); // TODO 错误处理
    await pc.setLocalDescription(answer);
    sendRTCEvent({
        type: SIGNALING_ANSWER,
        payload: {
            sdp: answer,
            from: localUser,
            target: remoteUser
        }
    });
}

async function handleReceiveAnswer(msg) {
    log(`receive remote answer from ${msg.payload.from}`);

    const remoteDescription = new RTCSessionDescription(msg.payload.sdp);
    remoteUser = msg.payload.from;

    await pc.setRemoteDescription(remoteDescription); // TODO 错误处理
}

async function handleReceiveCandidate(msg) {
    log(`receive candidate from ${msg.payload.from}`);
    await pc.addIceCandidate(msg.payload.candidate); // TODO 错误处理
}

/**
 * 发送用户相关消息给服务器
 * @param {Object} msg 格式如 { type: 'xx', payload: {} }
 */
function sendUserEvent(msg) {
    socket.emit(CLIENT_USER_EVENT, JSON.stringify(msg));
}

/**
 * 发送RTC相关消息给服务器
 * @param {Object} msg 格式如{ type: 'xx', payload: {} }
 */
function sendRTCEvent(msg) {
    socket.emit(CLIENT_RTC_EVENT, JSON.stringify(msg));
}

let pc = null;

/**
 * 邀请用户加入视频聊天
 *  1、本地启动视频采集
 *  2、交换信令
 */
async function startVideoTalk() {
    // 开启本地视频
    const localVideo = document.getElementById('local-video');
    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    localVideo.srcObject = mediaStream;

    // 创建 peerConnection
    createPeerConnection();

    // 将媒体流添加到webrtc的音视频收发器
    mediaStream.getTracks().forEach(track => {
        pc.addTrack(track, mediaStream);
        // pc.addTransceiver(track, {streams: [mediaStream]});
    });
    // pc.addStream(mediaStream); // 目前这个也可以，不过接口后续会废弃
}

function createPeerConnection() {
    const iceConfig = {
        "iceServers": [
            { url: 'stun:stun.ekiga.net' },
            { url: 'turn:turnserver.com', username: 'user', credential: 'pass' }
        ]
    };

    pc = new RTCPeerConnection(iceConfig);

    pc.onnegotiationneeded = onnegotiationneeded;
    pc.onicecandidate = onicecandidate;
    pc.onicegatheringstatechange = onicegatheringstatechange;
    pc.oniceconnectionstatechange = oniceconnectionstatechange;
    pc.onsignalingstatechange = onsignalingstatechange;
    pc.ontrack = ontrack;

    return pc;
}

async function onnegotiationneeded() {
    log(`onnegotiationneeded.`);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer); // TODO 错误处理

    sendRTCEvent({
        type: SIGNALING_OFFER,
        payload: {
            from: localUser,
            target: remoteUser,
            sdp: pc.localDescription // TODO 直接用offer？
        }
    });
}

function onicecandidate(evt) {
    if (evt.candidate) {
        log(`onicecandidate.`);

        sendRTCEvent({
            type: SIGNALING_CANDIDATE,
            payload: {
                from: localUser,
                target: remoteUser,
                candidate: evt.candidate
            }
        });
    }
}

function onicegatheringstatechange(evt) {
    log(`onicegatheringstatechange, pc.iceGatheringState is ${pc.iceGatheringState}.`);
}

function oniceconnectionstatechange(evt) {
    log(`oniceconnectionstatechange, pc.iceConnectionState is ${pc.iceConnectionState}.`);
}

function onsignalingstatechange(evt) {
    log(`onsignalingstatechange, pc.signalingstate is ${pc.signalingstate}.`);
}

// 调用 pc.addTrack(track, mediaStream)，remote peer的 onTrack 会触发两次
// 实际上两次触发时，evt.streams[0] 指向同一个mediaStream引用
// 这个行为有点奇怪，github issue 也有提到 https://github.com/meetecho/janus-gateway/issues/1313
let stream;
function ontrack(evt) {
    if (!stream) {
        stream = evt.streams[0];
    } else {
        console.log(`${stream === evt.streams[0]}`); // 这里为true
    }
    log(`ontrack.`);
    const remoteVideo = document.getElementById('remote-video');
    remoteVideo.srcObject = evt.streams[0];
}

// 进入房间
export async function linkRemoteRoom(remoteId) {
  remoteUser = remoteId;
  await startVideoTalk(remoteUser);
}


/**
 * 用户登录
 * @param {String} loginName 用户名
 */
export function login(loginName) {
    localUser = loginName;
    sendUserEvent({
        type: CLIENT_USER_EVENT_LOGIN,
        payload: {
            loginName: loginName
        }
    });
}

/*用于释放webrtc资源
* 1、挂断所有正在通信的视频通话（hangup all()）（释放peerconnection实例）
* 2、释放localstream
* 3、释放camera资源（VideoSource.dispose() 方法）
* 4、释放PeerConnectionFactory资源
* */
export function releaseRTC() {
  let localVideo = document.getElementById('local-video');
  // localVideo.pause();
  localVideo.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  localVideo.srcObject = null;

  let remoteVideo = document.getElementById('remote-video');
  // remoteVideo.pause();
  remoteVideo.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  remoteVideo.srcObject = null;

  pc = null;
  stream = null;
  remoteUser = '';

}

export function tellRemoteToClose(){
  sendUserEvent({
    type: CLIENT_USER_EVENT_FINISH,
    payload: {
      target: remoteUser
    }
  })
  releaseRTC();
  log("Finish committed.");
}

socket.on(SERVER_USER_EVENT, function (msg) {
  if (msg.type === CLIENT_USER_EVENT_FINISH) {
    log("Finish received.");
    releaseRTC();
    alert("The other side leaved room");
  }
})



