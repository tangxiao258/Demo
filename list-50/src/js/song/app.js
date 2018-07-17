{
	let view = {
		el:'#app',
		render(data){
			$(this.el).find('audio').attr('src', data.url)
			$(this.el).find('#background').css('backgroundImage', `url(${data.cover})`)
			$(this.el).find('#cover').attr('src', data.cover)
			$(this.el).find('h2').text(data.name)

			this.initLyric(data.lyric)
		},
		initLyric(lyric){
			let lyricList = lyric.split('\n')
			let pList = lyricList.map((string) => {
				let p = document.createElement('p')
		        let regex = /\[([\d:.]+)\](.+)/
		        let matches =string.match(regex)
		        if(matches){
		          p.textContent = matches[2]
		          let time = matches[1]
		          let parts = time.split(':')
		          let minutes = parts[0]
		          let seconds = parts[1]
		          let newTime = parseInt(minutes,10) * 60 + parseFloat(seconds,10)
		          p.setAttribute('data-time', newTime)
		        }else{
		          p.textContent = string
		        }
				return p
			})
			$(this.el).find('.song-lyric').append(pList)
		},
		playOrPause(){
			let Audio = $(this.el).find('audio')[0]
			if(Audio.paused === true){
				Audio.play()
				$(this.el).find('.play-icon').addClass('hidden')
				$(this.el).find('.img-wrapper').addClass('playing')
			}else{
				Audio.pause()
				$(this.el).find('.play-icon').removeClass('hidden')
				$(this.el).find('.img-wrapper').removeClass('playing')
			}
	    }
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
			this.view.playOrPause()
			this.bindEvents()
		},
		bindEvents(){
			$(this.view.el).on('click', '.dist',  (e) => {
				this.view.playOrPause()
			})
		},
		initSong(){
			this.model.find().then((data) => {
				let {id, attributes} = data
				let song = {...attributes, id}
				this.view.render(song)
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