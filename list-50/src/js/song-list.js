{
	let view = {
		el:'.song-list-container',
		template:`
		<ul class="songs-container"></ul>
		`,
		render(data){
			$(this.el).html(this.template)
			let liList = data.map((song, index) => {
				return $('<li></li>').text(song.name).attr('data-index', index)
			})
			$(this.el).find('ul').append(liList)
		},
		active(index){
			$(this.el).find('li').eq(index).addClass('active')
			    .siblings('.active').removeClass('active')
		},
		deactive(){
			$(this.el).find('li').removeClass('active')
		}
	}

	let model = {
		data:[],
		find(){
			var query = new AV.Query('Song');
			return query.find().then((songs) => {
				this.data = songs.map((song) => {
					let {id, attributes} = song
					return {id, ...attributes}
				})
				return songs
			})
		}
	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.bindEvents()
			this.bindEventHub()
			this.getSongList()
		},
		bindEvents(){
			$(this.view.el).on('click', 'li', (e) => {
				let index = $(e.currentTarget).attr('data-index')
				this.view.active(index)
				window.eventHub.emit('select', this.model.data[index])
			})
		},
		bindEventHub(){
			window.eventHub.on('new', (data) => {
				if(data){
				    this.model.data.push(data)
				    this.view.render(this.model.data)
				}else{
					this.view.deactive()
				}
			})
		},
		getSongList(){
			this.model.find().then((response) => {
				this.view.render(this.model.data)
			})
		}
	}

	controller.init(view, model)
}