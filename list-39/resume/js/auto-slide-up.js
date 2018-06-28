!function(){
    // 添加offset类
    var specialTags = document.querySelectorAll('[data-x]')
    for(var i = 0; i < specialTags.length; i++){
        specialTags[i].classList.add('offset')
    }
    findClosetAndRemoveOffset()
    window.addEventListener('scroll', function(x){
        findClosetAndRemoveOffset()
    })

    /* helper */
    function findClosetAndRemoveOffset(){
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0
        let targetId = undefined
        for(let i = 0; i < specialTags.length; i++){
            if(Math.abs(specialTags[i].offsetTop - window.scrollY) <= Math.abs(specialTags[minIndex].offsetTop - window.scrollY)){
                minIndex = i
                targetId = specialTags[i].id
            }
        }
        // minIndex 就是离窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset')
        let a = document.querySelector('a[href="#'+targetId+'"]')
        let li = a.parentNode
        let bortherAndMe = li.parentNode.children
        for(let i = 0; i < bortherAndMe.length; i++){
            bortherAndMe[i].classList.remove('highlight')
        }
        li.classList.add('highlight')    
    }

    var liTags = document.querySelectorAll('nav.menu > ul > li')
    for(var i = 0; i < liTags.length; i++){
        liTags[i].onmouseenter = function(xxx){
            xxx.currentTarget.classList.add('active')
        }
        liTags[i].onmouseleave = function(xxx){
            xxx.currentTarget.classList.remove('active')
        }
    }
}.call()


