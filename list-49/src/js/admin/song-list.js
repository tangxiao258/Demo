{
	let view = {
		el:'#songList-container',
		template:`
		<ul class="songList"></ul>
		`,
		render(data){
			let $el = $(this.el)
			$el.html(this.template)

			let liList = data.map((song, index) => {
				return $('<li></li>').text(song.name).attr('data-index', index)
			})

			$el.find('ul').append(liList)
		}
	}

	let model = {
		data:{
			songs:[]
		},
		find(){
			var query = new AV.Query('Song')
			return query.find().then((songs) => {
				songs.map((song) => {
					this.data.songs = songs.map((song) => {
						return {id:song.id, ...song.attributes}
					})
				})
				return songs
			})
		}
	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.view.render(this.model.data.songs)
			this.bindEvent()
			this.bindEventHub()
			this.getSong()
		},
		bindEvent(){
			$(this.view.el).on('click' ,'li', (e) => {
				let index = $(e.currentTarget).attr('data-index')
				$(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
				window.eventHub.emit('select', this.model.data.songs[index])
			})
		},
		bindEventHub(){
			window.eventHub.on('update', (data) => {
				this.model.data['songs'].push(data)
				this.view.render(this.model.data['songs'])
			})
			window.eventHub.on('new', (data) => {
				this.view.render(this.model.data['songs'])
			})
		},
		getSong(){
			return this.model.find().then(() => {
				this.view.render(this.model.data['songs'])
			})
		}
	}

	controller.init(view, model)
}