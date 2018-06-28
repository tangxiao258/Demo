/**
 * Controller({
 *   init(){
 *       xxx
 *       xxx
 *   },
 *   xxx(){},
 *   yyy(){}
 * })
 */
function Controller(options){
	var init = options.init

	let object = {
		view:null,
		model:null,
		init(view, model){  // init在controller.init()调用时才会触发，这时候下面的for循环已经结束了
			this.view = view
			this.model = model
			this.model.init()
			init.call(this)
			this.bindEvents.call(this)
		}
	}

	for(let key in options){
		if(key !== 'init'){
			object[key] = options[key]
		}
	}

	return object
}