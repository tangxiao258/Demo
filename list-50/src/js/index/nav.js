{
	let view = {
		el:'nav',
		active($target){
			$target.addClass('active')
				.siblings('.active').removeClass('active')
		}
	}

	let model = {}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.bindEvent()
		},
		bindEvent(){
			$(this.view.el).on('click', 'li', (e) => {
				this.view.active($(e.currentTarget))
				window.eventHub.emit('navShow', $(e.currentTarget).index())
			})
		}
	}

	controller.init(view,model)
}