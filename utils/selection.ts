import { getCaretCoordinates } from './textarea'

export function getCommonAncestorElement(selection?: Selection | null): HTMLElement | null {
  if (!selection || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  if (!range) return null
  let commonAncestor: Node | null = range.commonAncestorContainer
  while (commonAncestor && commonAncestor.nodeType !== Node.ELEMENT_NODE) {
    commonAncestor = commonAncestor.parentNode
  }
  return commonAncestor ? (commonAncestor as HTMLElement) : null
}

export function getSelectedText(selection?: Selection | null): string {
  if (!selection || selection.rangeCount === 0) return ''
  const range = selection.getRangeAt(0)
  return range.toString().trim()
}

export function getAnchorElement(selection?: Selection | null): HTMLElement | null {
  if (!selection || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  let anchorNode = range.startContainer as Node | null
  while (anchorNode && anchorNode.nodeType !== Node.ELEMENT_NODE) {
    anchorNode = anchorNode.parentNode
  }
  return anchorNode ? (anchorNode as HTMLElement) : null
}

export function isInputOrTextArea(el: HTMLElement): el is HTMLInputElement | HTMLTextAreaElement {
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
}

export function isContentEditable(el: HTMLElement): boolean {
  return el.isContentEditable
}

export function getSelectionBoundingRect(el: HTMLElement, selection?: Selection | null) {
  if (isInputOrTextArea(el)) {
    const coord = getCaretCoordinates(el, el.selectionStart ?? 0, el.selectionEnd ?? 0)
    const rect = el.getBoundingClientRect()
    return {
      top: coord.top + rect.top - el.scrollTop,
      left: coord.left + rect.left - el.scrollLeft,
      width: coord.width,
      height: coord.height,
      bottom: coord.top + rect.top + coord.height - el.scrollTop,
      right: coord.left + rect.left + coord.width - el.scrollLeft,
    }
  }
  else if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    return rect
  }
  else {
    return el.getBoundingClientRect()
  }
}

export function getEditableElementSelectedText(el: HTMLElement): string {
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    const inputEl = el as HTMLInputElement | HTMLTextAreaElement
    const text = inputEl.value
    const selectedText = text.substring(inputEl.selectionStart ?? 0, inputEl.selectionEnd ?? text.length).trim()
    return selectedText
  }
  else if (el.isContentEditable) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return ''
    const range = selection.getRangeAt(0)
    const selectedText = range.toString().trim()
    return selectedText
  }
  return el.textContent?.trim() || ''
}

export function replaceContentInRange(range: Range, replacement: string): void {
  const sel = window.getSelection()
  if (sel) {
    sel.removeAllRanges()
    sel.addRange(range)
  }
  range.deleteContents()
  range.insertNode(document.createTextNode(replacement))
}
