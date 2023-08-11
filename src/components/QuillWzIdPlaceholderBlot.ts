import * as QuillTypes from 'quill'
import { default as ParchmentTypes } from 'parchment'
import { Placeholder } from '~/components/types'

const ID = '::$wazzupIdPlaceholder'
const LABEL = 'ID: XXXX-XXXX'

export default function initWzIdPlaceholderBlot(Quill: QuillTypes.Quill): any {
	const Embed: typeof ParchmentTypes.EmbedBlot = Quill.import('blots/embed')

	class WzIdPlaceholderBlot extends Embed {
		static blotName = 'placeholder'
		static tagName = 'span'
		static className: string
		declare public domNode: HTMLElement

		static create(value: Placeholder) {
			const node: HTMLElement = <HTMLElement>super.create(value)
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
