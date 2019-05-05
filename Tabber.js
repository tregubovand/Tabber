export default class Tabber {
    constructor(container){
        this.btnSelector = '.tabber-btn';
        this.contentSelector = '.tabber-content';
        this.activeClassBtn = 'active';
        this.activeClassContent = 'active';
        this.autoTrigger = true;
        this.buttons = [];
        this.contents = [];
        this.container = false;
        this.callback = false;

        this.container = document.querySelector(container);

        let dataset = this.container.dataset;

        this.btnSelector = dataset.tabberButton ? dataset.tabberButton : this.btnSelector;
        this.contentSelector = dataset.tabberContent ? dataset.tabberContent : this.contentSelector;
        this.activeClassBtn = dataset.tabberBtnActive ? dataset.tabberBtnActive : this.activeClassBtn;
        this.activeClassContent = dataset.tabberContentActive ? dataset.tabberContentActive : this.activeClassContent;
        this.autoTrigger = dataset.tabberAutoTrigger ? dataset.tabberAutoTrigger : this.autoTrigger;
        this.callback = dataset.tabberCallback ? dataset.tabberCallback : this.callback;

        this.init();
    }
    init(){
        this.buttons = this.container.querySelectorAll(this.btnSelector);
        this.contents = this.container.querySelectorAll(this.contentSelector);
        this.bind();
        if(this.autoTrigger){
            this.buttons[0].click();
        }
    }
    bind(){
      this.buttons.forEach(el => {
          el.onclick = () => {this.toggle(el)};
      })
    }
    toggle(el){
        let target = el.dataset.tabberId;
        console.log(el);
        this.contents.forEach(el => {
            el.classList.remove(this.activeClassContent);
        });
        this.buttons.forEach(el => {
            el.classList.remove(this.activeClassBtn);
        });
        el.classList.add(this.activeClassBtn);

        this.contents.forEach(el=>{
            if(el.dataset.tabberId == target){
                el.classList.add(this.activeClassContent);
            }
        })
        if(this.callback){
            setTimeout(`${this.callback}(${el.dataset.tabberHelper})`)
        }
    }
    trigger(eq){
        this.buttons[eq].click();
    }
}
