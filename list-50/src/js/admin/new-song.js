{
	let view = {
		el:'.new-container',
		template:'新建歌曲',
		render(){
			$(this.el).html(this.template)
		},
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
			this.view.render()
			this.view.active()
			this.bindEvents()
			this.bindEventHub()
		},
		bindEvents(){
			$(this.view.el).on('click', (e) => {
				this.view.active()
				window.eventHub.emit('new')
			})
		},
		bindEventHub(){
			window.eventHub.on('new', (e) => {
				this.view.active()
			})
			window.eventHub.on('select', (e) => {
				this.view.deactive()
			})
		}
	}

	controller.init(view, model)
}