!function(){
	var model = {
		init:function(){
			var APP_ID = '42t87AhMXsEIpGjWzmym0Utq-gzGzoHsz';
            var APP_KEY = '664M4Yi9RJfUl4IGgL6b9zYi';

			AV.init({
			  appId: APP_ID,
			  appKey: APP_KEY
			});
		},
		fetch:function(){
			var query = new AV.Query('Message')
			return query.find()
		},
		save:function(name, content){
			var Message = AV.Object.extend('Message');
			var message = new Message();
			return message.save({
				'name':name,
				'content':content
			})
		}
	}
	var view = document.querySelector('section.message')

	var controller = {
		view: null,
		messageList:null,
		form:null,
		init: function(view, model){
			this.view = view
			this.model = model
			this.messageList = this.view.querySelector('#messageList')
			this.form = this.view.querySelector('#postMessageForm')
			this.model.init()
			this.getMessages()
			this.bindEvents()
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

			this.model.save(name, content).then(function (object) {
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
	}

	controller.init(view, model)
}.call()