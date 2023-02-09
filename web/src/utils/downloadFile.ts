export const downloadFile = (link: string, name: string) => {
  const anchor = document.createElement("a");
  anchor.style.display = "none";
  anchor.setAttribute("href", link);
  anchor.setAttribute("download", name);
  // anchor.setAttribute('target', '_blank');
  document.body.appendChild(anchor);

  setTimeout(function () {
    anchor.click();
    document.body.removeChild(anchor);
  }, 66);
  return true;
};

//   export function downloadFile(url, fileName) {
//     fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
//       .then(res => res.blob())
//       .then(res => {
//         const aElement = document.createElement('a');
//         aElement.setAttribute('download', fileName);
//         const href = URL.createObjectURL(res);
//         aElement.href = href;
//         aElement.setAttribute('target', '_blank');
//         aElement.click();
//         URL.revokeObjectURL(href);
//       });
//   };