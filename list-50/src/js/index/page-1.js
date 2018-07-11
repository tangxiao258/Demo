{
	let view = {
		el:'.page-1',
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
			this.initPageList()
			this.bindEventHub()
		},
		initPageList(){
			let page_1_1 = $('<script src="./js/index/page-1-1.js"></script>')
			let page_1_2 = $('<script src="./js/index/page-1-2.js"></script>')
			$(this.view.el).append(page_1_1)
			$(this.view.el).append(page_1_2)
		},
		bindEventHub(){
			window.eventHub.on('navShow', (data) => {
				if(data === 0){
					this.view.active()
				}
			})
		}
	}

	controller.init(view, model)
}