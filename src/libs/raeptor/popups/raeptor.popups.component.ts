  export function createPopUp(text : string) : void {

    let popup = document.createElement('div');
    popup.classList.add("popup");
    popup.innerHTML = `<p>${text}</p>`
    popup.addEventListener("animationend", (e : AnimationEvent) => {
      if (e.currentTarget) (e.currentTarget as HTMLElement).remove();
    }, false);
    document.body.appendChild(popup);

  }

  export function copyURLToClipboard(url : string, target : EventTarget | null) : void {

    createPopUp("Le lien a été copié dans le presse-papier !");

    if (url === 'play-button') {
      const element = target as HTMLElement | null;
      if (element?.parentNode?.parentNode?.children[0]) {
        navigator.clipboard.writeText((element.parentNode.parentNode.children[0] as HTMLAnchorElement).href);
      }

    } else {

      navigator.clipboard.writeText(url);

    }

  }