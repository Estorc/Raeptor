export function stringFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to load URL: ${url}`));
      }
    };
    xhr.onerror = function () {
      reject(new Error(`Network error while loading URL: ${url}`));
    };
    xhr.send();
  });
}