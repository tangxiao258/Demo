{
	let view = {
		el:'.page-3',
		active(){
			$(this.el).addClass('active')
			.siblings('.active').removeClass('active')
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
			window.eventHub.on('navShow', (data) => {
				if(data === 2){
					this.view.active()
				}
			})
		}
	}

	controller.init(view, model)
}