{
	let view = {
		el:'.newSong',
		template:`新建歌曲`,
		render(data){
			$(this.el).html(this.template)
		}
	}

	let model = {}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.view.render(this.model.data)
			this.active()
			window.eventHub.on('new', (data) => {
				this.active()
			})
			window.eventHub.on('select', (data) => {
				this.deactive()
			})
			this.bindEvents()
		},
		active(){
			$(this.view.el).addClass('active')
		},
		deactive(){
			$(this.view.el).removeClass('active')
		},
		bindEvents(){
			$(this.view.el).on('click', (e) => {
				window.eventHub.emit('new', {})
			})
		}
	}

	controller.init(view, model)
}