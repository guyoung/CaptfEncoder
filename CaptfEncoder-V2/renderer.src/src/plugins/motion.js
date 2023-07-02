// 转场动画
export default {
    bind(el, binding) {
        el.addEventListener('click', () => {
            let cutto = document.getElementById(binding.arg)
            let initStyle = `
                display:none;
                position:absolute;
                left:0;
                right:0;
                height:0;
                z-index:1;
                transition:all 200ms;
                overflow:hidden;`
            if(binding.value) {
                let motionActive = 'display:block;top:' + el.offsetTop + 'px;height:' + el.offsetHeight + 'px'
                cutto.setAttribute('motion-enter', motionActive)
                cutto.style = initStyle + motionActive
                setTimeout(() => {
                    cutto.style = initStyle + 'display:block;top:0;height:100%;'
                }, 30)
                setTimeout(() => {
                    cutto.style.overflowY = 'auto'
                }, 200)
            } else {
                cutto.scrollTop = 0
                cutto.style = initStyle + cutto.getAttribute('motion-enter')
                setTimeout(() => {
                    cutto.style.opacity = 0
                    setTimeout(() => {
                        cutto.style = initStyle
                    }, 200)
                }, 200)
            }
        })
    },
    inserted(el, binding) {
        el.parentNode.style.position = 'relative'
        document.getElementById(binding.arg).style = `
            display:none;
            position:absolute;
            left:0;
            right:0;
            height:0;
            z-index:1;
            transition:all 200ms;
            overflow:hidden;`
    }
}