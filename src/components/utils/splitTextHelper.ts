export class SplitText {
  elements: HTMLElement[];
  chars: HTMLSpanElement[] = [];
  words: HTMLSpanElement[] = [];
  lines: HTMLSpanElement[] = [];
  originalHTMLs: string[] = [];

  constructor(target: any, options?: { type?: string; linesClass?: string }) {
    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      this.elements = target
        .flatMap((t) =>
          typeof t === "string"
            ? Array.from(document.querySelectorAll(t))
            : [t]
        )
        .filter(Boolean) as HTMLElement[];
    } else if (target instanceof NodeList || target instanceof HTMLCollection) {
      this.elements = Array.from(target) as HTMLElement[];
    } else if (target) {
      this.elements = [target as HTMLElement];
    } else {
      this.elements = [];
    }

    const type = options?.type || "chars,lines";
    const linesClass = options?.linesClass || "split-line";

    this.elements.forEach((el) => {
      this.originalHTMLs.push(el.innerHTML);
      const text = el.textContent || "";
      el.innerHTML = "";

      const wordsArr = text.split(" ");
      wordsArr.forEach((wordText, wIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";

        if (type.includes("chars")) {
          Array.from(wordText).forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = linesClass;
            charSpan.style.display = "inline-block";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          });
        } else {
          wordSpan.textContent = wordText;
        }

        el.appendChild(wordSpan);
        this.words.push(wordSpan);

        if (wIdx < wordsArr.length - 1) {
          const space = document.createElement("span");
          space.style.display = "inline-block";
          space.textContent = " ";
          el.appendChild(space);
        }
      });
    });
  }

  revert() {
    this.elements.forEach((el, idx) => {
      if (this.originalHTMLs[idx] !== undefined) {
        el.innerHTML = this.originalHTMLs[idx];
      }
    });
  }
}
