import cameraIcon from "@/assets/img/camera_fill.svg";
import photoIcon from "@/assets/img/photo_fill.svg";
import videoIcon from "@/assets/img/video_dial_fill.svg";
import fileIcon from "@/assets/img/file_fill.svg";
import friendIcon from "@/assets/img/yuyin_fill.svg";

const menus = [
  {
    key: "photo",
    text: "照片",
    icon: photoIcon,
  },
  {
    key: "camera",
    text: "拍摄",
    icon: cameraIcon,
  },
  {
    key: "friend_call",
    text: "语音",
    icon: friendIcon,
  },
  {
    key: "video_call",
    text: "视频",
    icon: videoIcon,
  },
  {
    key: "file",
    text: "文件",
    icon: fileIcon,
  },
];

export { menus, cameraIcon, photoIcon, videoIcon, fileIcon, friendIcon };
