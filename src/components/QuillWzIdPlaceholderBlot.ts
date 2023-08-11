const ID = '::$wazzupIdPlaceholder'
const LABEL = 'ID: XXXX-XXXX'

export default function initWzIdPlaceholderBlot(Quill: any) {
	const Embed = Quill.import('blots/embed')

	class WzIdPlaceholderBlot extends Embed {
		static blotName = 'placeholder'
		static tagName = 'span'
		static className = 'ql-wz-id-placeholder'

		static create() {
			const node: HTMLElement = <HTMLElement>super.create()
			node.setAttribute('id', ID)
			node.setAttribute('spellcheck', 'false')

			const label = document.createTextNode(LABEL)
			node.appendChild(label)

			return node
		}

		static value(domNode: HTMLElement) {
			return domNode.id
		}

		length() {
			return 1
		}

		deleteAt(index: number, length: number) {
			super.deleteAt(index, length)
		}
	}

	return WzIdPlaceholderBlot
}
