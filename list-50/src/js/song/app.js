{
	let view = {
		el:''
	}

	let model = {
		data:{
			name:'', id:'', singer: '', url:''
		},
		find(){
			var query = new AV.Query('Song');
			return query.get(this.data.id).then((song) => {
			    Object.assign(this.data, {...song.attributes})
			    return song
			})
		},
		setId(id){
			this.data.id = id
		}
	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			let id = this.getSongId()
			this.model.setId(id)
			this.initSong()
		},
		initSong(){
			this.model.find().then((data) => {
				console.log(data)
			})
		},
		getSongId(){
			let search = window.location.search
			if(search.indexOf('?') === 0){
				search = search.substring(1)
			}

			let itemList = search.split('&').filter(v => v)
			let id = ''

			itemList.map((item) => {
				let kv = item.split('=')
				let key = kv[0]
				let value = kv[1]
				if(key === 'id'){
					id = value
				}
			})
			return id
		}
	}

	controller.init(view, model)
}