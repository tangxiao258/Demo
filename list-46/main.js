fakeData()

function View(options){
  this.el = options.el
  this.template = options.template
}

View.prototype.render = function(data){
  let TEMP = this.template
  for(let key in data){
    TEMP = TEMP.replace(`__${key}__`, data[key])
  }
  $(this.el).html(TEMP)
}

let view = new View({
  el:'#app',
  template:`
    <div>
      书名：__name__
      数量：<span id="number">__number__</span>
    </div>
    <div>
      <button id="addNum">加1</button>
      <button id="lessNum">减1</button>
      <button id="reset">清空</button>
    </div>`
})

function Model(options){
  this.data = {}
  this.resource = options.resource
  this.id = options.id
  console.log(this.resource)
}

Model.prototype.fetch = function(){
  console.log(this.resource)
  return axios.get(`/${this.resource}/${this.id}`).then((response) => {
    this.data = response.data
    return response
  })
}

Model.prototype.update = function(data){
  return axios.put(`/${this.resource}/${this.id}`, data).then((response) => {
    this.data = response.data
    return response
  })
}

let model = new Model({
  resource:'books',
  id:'1'
})
console.log(model)

let controller = {
  view:null,
  model:null,
  init(view, model){
    this.view = view
    this.model = model
    this.model.fetch().then((response) => {
      this.view.render(response.data)
    })
    this.bindEvents()
  },
  bindEvents(){
    $(this.view.el).on('click', '#addNum', (e) => {
      this.addOne()
    })
    $(this.view.el).on('click', '#lessNum', (e) => {
      this.lessOne()
    })
    $(this.view.el).on('click', '#reset', (e) => {
      this.resetZero()
    })
  },
  addOne(){
    let originNum = $('#number').text()
    let newNum = originNum - 0 + 1
    this.model.update({number:newNum}).then((response) => {
      this.view.render(response.data)
    })
  },
  lessOne(){
     let originNum = $('#number').text()
     let newNum = originNum - 0 - 1
     this.model.update({number:newNum}).then((response) => {
       this.view.render(response.data)
     })
  },
  resetZero(){
    this.model.update({number:0}).then((response) => {
       this.view.render(response.data)
     })
  }
}

controller.init(view, model)

// 不要看
function fakeData() {
  let book = {
    name: 'JavaScript 高级程序设计',
    number: 2,
    id: 1
  }
  axios.interceptors.response.use(function(response) {
    let {
      config: {
        method, url, data
      }
    } = response

    if (url === '/books/1' && method === 'get') {
      response.data = book
    } else if (url === '/books/1' && method === 'put') {
      data = JSON.parse(data)
      Object.assign(book, data)
      response.data = book
    }
    return response
  })
}