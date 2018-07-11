{
	let view = {
		el:'.music-list',
		render(data){
			let liList = data.map((song) => {
				return `
				<li>
				    <a href="./song.html?id=${song.id}">
					<div class="music-content">
						<span class="name">${song.name}</span>
						<span class="singer">${song.singer}</span>
					</div>
					<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-play"></use>
					</svg>
					</a>
				</li>
				`
			})
			$(this.el).append(liList)
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
			this.getSongList()
		},
		getSongList(){
			this.model.find().then((data) => {
				this.view.render(this.model.data)
			})
		}
	}

	controller.init(view, model)
}