!function(){
	var model = Model({resourceName:'Message'})

	var view = View('section.message')

	var controller = Controller({
		init(view, model){
			this.messageList = this.view.querySelector('#messageList')
			this.form = this.view.querySelector('#postMessageForm')
			this.getMessages()
		},
		getMessages: function(){
			this.model.fetch().then(function (object) {
			  	let arr = object.map((item)=>{
			  		return item.attributes
			  	})
			  	arr.forEach((item, index)=>{
			  		let li = document.createElement('li')
			  		li.innerText = `${item.name}:${item.content}`
			  		this.messageList.appendChild(li)
			  	})
			  });
		},
		saveMessage:function(){
			let name = this.form.querySelector('input[name=name]').value
			let content = this.form.querySelector('input[name=content]').value

			this.model.save({
				'name':name, 
				'content':content
			}).then(function (object) {
				let li = document.createElement('li')
				li.innerText = `${object.attributes.name}:${object.attributes.content}`
				this.messageList.appendChild(li)
				this.form.querySelector('input[name=content]').value = ''
			});
		},
		bindEvents:function(){
			this.form.addEventListener('submit', (e)=>{
				e.preventDefault()
				this.saveMessage()
			})
		}
	})

	controller.init(view, model)
}.call()