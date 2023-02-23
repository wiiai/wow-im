export function getUserMedia(constrains: any, success: any, error: any) {
  return navigator.mediaDevices
    .getUserMedia(constrains)
    .then(success)
    .catch(error);
}

export function canGetUserMediaUse() {
  return !!navigator.mediaDevices.getUserMedia;
}
