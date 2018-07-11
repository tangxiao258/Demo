{
	let view = {
		el:'.site-loading',
		active(){
			$(this.el).addClass('active')
		},
		deactive(){
			$(this.el).removeClass('active')
		}
	}

	let model = {}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.bindEventHub()
		},
		bindEventHub(){
			window.eventHub.on('beforeUpload', (data) => {
				this.view.active()
			})

			window.eventHub.on('afterUpload', (data) => {
				this.view.deactive()
			})
		}
	}

	controller.init(view, model)
}