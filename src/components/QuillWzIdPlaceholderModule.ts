import * as QuillTypes from 'quill'
import initWzIdPlaceholderBlot from '~/components/QuillWzIdPlaceholderBlot'

export default function initWzIdPlaceholderModule(Quill: any) {
	const Parchment = Quill.import('parchment')
	const PlaceholderBlot = initWzIdPlaceholderBlot(Quill)

	Quill.register(PlaceholderBlot)

	class WzIdPlaceholderModule {
		constructor(private quill: any) {
			this.quill.getModule('toolbar').addHandler('placeholder', this.toolbarHandler)
			this.quill.root.addEventListener('click', <EventListener>this.onClick)
			this.quill.on('text-change', this.onTextChange)
		}

		onTextChange = (
			delta: QuillTypes.Delta,
			oldDelta: QuillTypes.Delta,
			source: QuillTypes.Sources,
		) => {
			if (source === Quill.sources.USER) {
				const currentContents = this.quill.getContents()
				const delta = currentContents.diff(oldDelta)

				const shouldRevert = delta.ops.filter(
					(op: QuillTypes.DeltaOperation) => op.insert && op.insert.placeholder,
				).length

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

		toolbarHandler = () => {
			const selection = this.quill.getSelection()

			this.quill.deleteText(selection.index, selection.length)
			this.quill.insertEmbed(selection.index, 'placeholder', true, Quill.sources.USER)
			this.quill.setSelection(selection.index + 1, 0)
		}
	}

	return WzIdPlaceholderModule
}
