{
	let view = {
		el:'.page > main',
		init(){
			this.$el = $(this.el)
		},
		template:`
		<form class="form">
        <div class="row">
          <label>
          歌名
          </label>
          <input name="name" type="text" value="__name__">
        </div>
        <div class="row">
          <label>
          歌手
          </label>
          <input name="singer" type="text" value="__singer__">
        </div>
        <div class="row">
          <label>
          外链
          </label>
          <input name="url" type="text" value="__url__">
        </div>
        <div class="row">
          <label>
          封面
          </label>
          <input name="cover" type="text" value="__cover__">
        </div>
        <div class="row">
          <label>
          歌词
          </label>
          <textarea cols=100 rows=10 name="lyrics">__lyrics__</textarea>
        </div>
        <div class="row actions">
          <button type="submit">保存</button>
        </div>
      </form>
		`,
		render(data = {}){
			let html = this.template
			let placeholder = ['name', 'singer', 'url', 'cover', 'lyrics']

			placeholder.map((string) => {
				html = html.replace(`__${string}__`, data[string] || '')
			})

			$(this.el).html(html)
			console.log(data.id)
			if(data.id){
				$(this.el).prepend('<h1>编辑歌曲</h1>')
			}else{
				$(this.el).prepend('<h1>新增歌曲</h1>')
			}
		},
		reset(){
			this.render({})
		}
	}

	let model = {
		data:{
			name:'',singer:'',url:'',cover:'',lyrics:'', id:''
		},
		update(data){
			var song = AV.Object.createWithoutData('Song', this.data.id)
			song.set('name', data.name)
			song.set('singer', data.singer)
			song.set('lyrics', data.lyrics)
			song.set('url', data.url)
			song.set('cover', data.cover)
			return song.save().then((reponse) => {
				return reponse
			})
		}
	}

	let controller = {
		init(view, model){
			this.view = view
			this.view.init()
			this.model = model
			this.view.render(this.model.data)
			this.bindEvents()
			window.eventHub.on('new', (data) => {
				if(this.model.data.id){
					this.model.data = {name:'',singer:'',url:'',cover:'',lyrics:'', id:''}
				}else{
					Object.assign(this.model.data, data)
				}
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
				let needs = 'name singer url cover lyrics'.split(' ')
				let data = {}
				needs.map((string) => {
					data[string] = $(this.view.el).find(`input[name=${string}]`).val()
				})
				this.model.update(data).then((response) => {
					window.eventHub.emit('update', data)
					Object.assign(this.model.data, {id, ...response.attributes})
					this.view.render(this.model.data)
				})
			})
		}
	}

	controller.init(view, model)
}