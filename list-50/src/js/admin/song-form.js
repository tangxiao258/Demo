{
	let view = {
		el:'main',
		template:`
		<form id="form-container">
			<div class="row">
				<label for="name">歌名</label>
			    <input type="text" name="name" value="__name__">
			</div>
			<div class="row">
				<label for="singer">歌手</label>
				<input type="text" name="singer" value="__singer__">
			</div>
			<div class="row">
				<label for="cover">封面</label>
			    <input type="text" name="cover" value="__cover__">
			</div>
			<div class="row">
				<label for="url">链接</label>
			    <input type="text" name="url" value="__url__">
			</div>
			<div class="row">
				<label for="lyric">歌词</label>
			    <textarea name="lyric" id="" cols="30" rows="10">__lyric__</textarea>
			</div>
			<div class="row">
				<input type="submit" value="保存">
			</div>
		</form>
		`,
		render(data){
			let html = this.template
			let keyList = ['name', 'singer', 'url', 'cover', 'lyric']
			keyList.map((key) => {
				html = html.replace(`__${key}__`, data[key] || '')
			})
			$(this.el).html(html)
			if(data.id){
				$(this.el).prepend('<h1>编辑歌曲</h1>')
			}else{
				$(this.el).prepend('<h1>新建歌曲</h1>')
			}
		}
	}

	let model = {
		data:{
			name:'', singer: '', url:'', id:'', cover:''
		},
		save(){
			var Song = AV.Object.extend('Song');
			var song = new Song();
			song.set('name', this.data.name);
			song.set('singer',this.data.singer);
			song.set('cover', this.data.cover);
			song.set('url', this.data.url);
			song.set('lyric', this.data.lyric);
			song.save().then(function (response) {
			    console.log(response)
			    return response
			}, function (error) {
			    console.error(error);
			});
		},
		update(){
			var song = AV.Object.createWithoutData('Song', this.data.id);
			song.set('name', this.data.name);
		    song.set('singer',this.data.singer);
		    song.set('cover', this.data.cover);
			song.set('url', this.data.url);
			song.set('lyric', this.data.lyric);
			return song.save().then(function (response) {
			    return response
			}, function (error) {
			    console.error(error);
			});
		}
	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.view.render(this.model.data)
			this.bindEventHub()
			this.bindEvents()
		},
		bindEventHub(){
			window.eventHub.on('upload', (data) => {
				Object.assign(this.model.data, data)
				this.view.render(this.model.data)
			})

			window.eventHub.on('new', (data) => {
				this.model.data = {name:'', singer:'', url:'', id:'', cover: '', lyric: ''}
				this.view.render(this.model.data)
			})

			window.eventHub.on('select', (data) => {
				this.model.data = data
				this.view.render(this.model.data)
			})
		},
		bindEvents(){
			$(this.view.el).on('submit', 'form', (e) => {
				e.preventDefault()
				let keyList = 'name url singer cover lyric'.split(' ')
				keyList.map((key) => {
					this.model.data[key] = $(this.view.el).find(`[name=${key}]`).val()
				})
				console.log(this.model.data)
			
				this.model.update().then((response) => {
					let {id, attributes} = response
					Object.assign(this.model.data, {id, ...attributes})
					window.eventHub.emit('new', this.model.data)
				})
			})
		}
	}

	controller.init(view, model)
}