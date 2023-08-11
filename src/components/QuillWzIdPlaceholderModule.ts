import * as QuillTypes from 'quill'

import initWzIdPlaceholderBlot from '~/components/QuillWzIdPlaceholderBlot'
import {
	Placeholder,
	ModuleOptions,
} from '~/components/types'

export interface ModuleType {
	new(quill: any, options: ModuleOptions): any
}

export default function initWzIdPlaceholderModule(
	Quill: any,
	options?: {
		className?: string
	},
): ModuleType {
	const Parchment = Quill.import('parchment')
	const PlaceholderBlot = initWzIdPlaceholderBlot(Quill)
	PlaceholderBlot.className = options?.className || 'ql-wz-id-placeholder'

	Quill.register(PlaceholderBlot)

	class WzIdPlaceholderModule {
		private placeholders: Placeholder[] = []

		constructor(private quill: any, options: ModuleOptions) {
			this.placeholders = options.placeholders
			this.quill.getModule('toolbar').addHandler('placeholder', this.toolbarHandler)
			this.quill.root.addEventListener('click', <EventListener>this.onClick)
			this.quill.on('text-change', this.onTextChange)
		}

		onTextChange = (_: any, oldDelta: any, source: QuillTypes.Sources) => {
			if (source === Quill.sources.USER) {
				const currrentContents = this.quill.getContents()
				const delta = currrentContents.diff(oldDelta)

				const shouldRevert = delta.ops.filter((op: any) => op.insert &&
					op.insert.placeholder && op.insert.placeholder.required).length

				if (shouldRevert) {
					this.quill.updateContents(delta, Quill.sources.SILENT)
				}
			}
		}

		onClick = (ev: any) => {
			const blot = Parchment.find(ev.target.parentNode)

			if (blot instanceof PlaceholderBlot) {
				const index = this.quill.getIndex(blot)
				this.quill.setSelection(index, blot.length(), Quill.sources.USER)
			}
		}

		toolbarHandler = (identifier: string) => {
			const selection = this.quill.getSelection()
			const placeholder = this.placeholders.filter((pl: Placeholder) => pl.id === identifier)[0]
			if (!placeholder) throw new Error(`Missing placeholder for ${identifier}`)

			this.quill.deleteText(selection.index, selection.length)
			this.quill.insertEmbed(selection.index, 'placeholder', placeholder, Quill.sources.USER)
			this.quill.setSelection(selection.index + 1, 0)
		}
	}

	return WzIdPlaceholderModule
}
