function getUserMedia(constrains, success, error) {
  let promise;
  if (navigator.mediaDevices.getUserMedia) {
    promise = navigator.mediaDevices
      .getUserMedia(constrains)
      .then(success)
      .catch(error);
  } else if (navigator.webkitGetUserMedia) {
    promise = navigator
      .webkitGetUserMedia(constrains)
      .then(success)
      .catch(error);
  } else if (navigator.mozGetUserMedia) {
    promise = navigator.mozGetUserMedia(constrains).then(success).catch(error);
  } else if (navigator.getUserMedia) {
    promise = navigator.getUserMedia(constrains).then(success).catch(error);
  }
  return promise;
}

function canGetUserMediaUse() {
  return !!(
    navigator.mediaDevices.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}

// STUN,TURN服务器配置参数
const iceServer = {
  iceServers: [
    {
      urls: ["stun:ss-turn1.xirsys.com"],
    },
    {
      username:
        "CEqIDkX5f51sbm7-pXxJVXePoMk_WB7w2J5eu0Bd00YpiONHlLHrwSb7hRMDDrqGAAAAAF_OT9V0dWR1d2Vi",
      credential: "446118be-38a4-11eb-9ece-0242ac140004",
      urls: [
        "turn:ss-turn1.xirsys.com:80?transport=udp",
        "turn:ss-turn1.xirsys.com:3478?transport=udp",
      ],
    },
  ],
};

// 本地流
let localStream = null;

export const useCall = (socket, options) => {
  const { userInfo, onGetLocalStream, onRemoteTrack } = options;
  console.log(`useCall userInfo`, userInfo);

  // 存放 RTCPeerConnection 的数组
  const pc = {};
  window.pc = pc;

  function initCall(partner, isCreateOffer) {
    console.log(`initCall`, partner, isCreateOffer);
    const a = new RTCPeerConnection(iceServer);
    pc[partner] = a;

    // 将自己的 stream 添加到 peer con track
    localStream.getTracks().forEach((track) => {
      pc[partner].addTrack(track, localStream);
    });

    const onnegotiationneeded = async () => {
      console.log(`onnegotiationneeded`);
      const offer = await pc[partner].createOffer();

      // 将 offer 设置为 peer con 的 localDescription
      console.log(`setLocalDescription`);
      await pc[partner].setLocalDescription(offer);

      // 把  peer con 的 localDescription 发送给中间服务器
      // 把发起者的描述信息通过Signal Server发送到接收者
      console.log("send sdp");
      socket.emit("sdp", {
        type: "video-offer",
        description: pc[partner].localDescription,
        to: partner,
        sender: userInfo.id,
      });
    };

    // 本地流创建完毕，发起SDP消息
    if (isCreateOffer) {
      // 每当WebRTC基础结构需要你重新启动会话协商过程时，都会调用此函数。
      // 它的工作是创建和发送一个请求，给被叫方，要求它与我们联系。
      // https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection/createOffer
      // 添加 track 后, onnegotiationneeded 会被触发
      pc[partner].onnegotiationneeded = onnegotiationneeded;
    }

    // 当向连接中添加磁道时，track 事件的此处理程序由本地WebRTC层调用。
    // 例如，可以将传入媒体连接到元素以显示它。详见 Receiving new streams 。
    pc[partner].ontrack = (ev) => {
      let str = ev.streams[0];
      onRemoteTrack?.(str)
    };

    // 通过 RTCPeerConnection.setLocalDescription() (en-US) 方法更改本地描述之后，
    // 该 RTCPeerConnection 会抛出 icecandidate 事件。
    // 该事件的监听器需要将更改后的描述信息传送给远端 RTCPeerConnection，以更新远端的备选源。
    pc[partner].onicecandidate = ({ candidate }) => {
      console.log(`onicecandidate`);
      socket.emit("ice candidates", {
        candidate: candidate,
        to: partner,
        sender: userInfo.id,
      });
    };
  }

  // 获取本地流
  function initLocal(cb) {
    if (localStream) {
      onGetLocalStream(localStream);
      cb && cb();
      return;
    }

    if (canGetUserMediaUse()) {
      getUserMedia(
        {
          video: true,
          audio: true,
        },
        function (stream) {
          localStream = stream;
          onGetLocalStream(stream);
          cb && cb();
        },
        function (error) {
          console.log("访问用户媒体设备失败：", error.name, error.message);
        }
      );
    } else {
      alert("您的浏览器不兼容");
    }
  }

  // 接收ICE候选
  // addIceCandidate
  socket.on("ice candidates", (data) => {
    console.log("ice candidate: ", data);
    console.log(`pc[data.sender]`, pc[data.sender]);
    if (data.candidate) {
      var candidate = new RTCIceCandidate(data.candidate);
      pc[data.sender].addIceCandidate(candidate).catch(); // catch err function empty
    }
  });

  // 处理请求 ：首先它需要创建自己的 RTCPeerConnection
  // 并添加包含麦克风和网络摄像头的音频和视频的磁道。其次，它需要对收到的请求进行处理，构建并返回应答。
  socket.on("sdp", (data) => {
    console.log("receive sdp ", data);
    if (data.description.type === "offer") {
      // initCall(socketID, false);
      initLocal(() => {
        initCall(data.sender, false);
        // 把发送者(offer)的描述，存储在接收者的 remoteDesc 中。
        let desc = new RTCSessionDescription(data.description);
        pc[data.sender].setRemoteDescription(desc).then(() => {
          pc[data.sender]
            .createAnswer()
            .then((answer) => {
              return pc[data.sender].setLocalDescription(answer);
            })
            .then(() => {
              socket.emit("sdp", {
                type: "video-answer",
                description: pc[data.sender].localDescription,
                to: data.sender,
                sender: userInfo.id,
              });
            })
            .catch(); // catch error function empty
        });
      });
    } else if (data.description.type === "answer") {
      // 应答
      pc[data.sender].setRemoteDescription(
        new RTCSessionDescription(data.description)
      );
    }
  });

  const close = (partner) => {
    pc[partner]?.close();
  }

  return {
    initCall,
    initLocal,
    close
  };
};
