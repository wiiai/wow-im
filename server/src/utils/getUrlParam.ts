export function getUrlParam(url: string, name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var s = url.split('?')[1] || '';
  var r = s.match(reg);

  if (r != null) {
    return decodeURIComponent(r[2]);
  }

  return null;
}