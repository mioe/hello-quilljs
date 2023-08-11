const ID = '::$wazzupIdPlaceholder'
const LABEL = 'ID: XXXX-XXXX'

export default function initWzIdPlaceholderBlot(Quill: any) {
	const Embed = Quill.import('blots/embed')

	class WzIdPlaceholderBlot extends Embed {
		static blotName = 'placeholder'
		static tagName = 'span'
		static className: string

		static create() {
			const node: HTMLElement = <HTMLElement>super.create()
			node.setAttribute('id', ID)
			node.setAttribute('spellcheck', 'false')

			const label = document.createTextNode(LABEL)
			node.appendChild(label)

			return node
		}

		static value(domNode: HTMLElement): DOMStringMap {
			return domNode.dataset
		}

		length(): number {
			return 1
		}

		deleteAt(index: number, length: number): void {
			super.deleteAt(index, length)
		}
	}

	return WzIdPlaceholderBlot
}
