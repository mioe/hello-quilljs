import * as QuillTypes from 'quill'
import { default as ParchmentTypes } from 'parchment'
import { Placeholder } from '~/components/types'

export default function initWzIdPlaceholderBlot(Quill: QuillTypes.Quill): any {
	const Embed: typeof ParchmentTypes.Embed = Quill.import('blots/embed')

	class WzIdPlaceholderBlot extends Embed {
		static blotName = 'placeholder'
		static tagName = 'span'
		static className: string
		static delimiter: '::$wazzupIdPlaceholder'
		public domNode?: HTMLElement

		static create(value: Placeholder) {
			const node: HTMLElement = <HTMLElement>super.create(value)

			node.setAttribute('data-id', value.id)
			node.setAttribute('data-label', value.label)
			node.setAttribute('spellcheck', 'false')

			const { delimiter } = WzIdPlaceholderBlot

			const label = document.createTextNode(delimiter)
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
