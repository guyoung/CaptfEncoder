import Vue from 'vue'
import Router from 'vue-router'

//import Home from "@/extensions/ext.app.home/view.component.vue";

Vue.use(Router)

const homeRoute = {
    name: "ext.app.home",
    path: "/extensions/ext.app.home",
    title: "Home",
};

const router = new Router({
    mode: 'hash',
    isAdd: false,
    routes: [

    ]
});


router.beforeEach((to, from, next) => {
    if (router.options.isAdd) {
        next();
    } else {        
        
        router.app.$store.dispatch('loadExtensions').then(() => {          
            let routes = filterAsyncRoutes(router.app.$store.getters.extensions);

            router.addRoutes(routes);

            router.options.isAdd = true;

            next({ ...to, replace: true });
        });
        
        
    }
});


function filterAsyncRoutes(extensions) {

    
    let routes = [];
    let existHome = false;


    if (extensions && extensions.items && extensions.items.length > 0) {
        extensions.items.forEach(function (item, index) {
            let route = {};

            route.name = item.name;
            route.path = item.path;
            route.component = loadComponent(item.name, item.component);
            route.meta = { title: item.title, titles: item.titles, catalog: item.catalog };

            routes.push(route);

            if (!existHome && item.name == homeRoute.name) {
                existHome = true;
            }
        });
    }

    if (existHome) {
        routes.unshift({
            path: '/',
            redirect: `/extensions/${homeRoute.name}/`
        });
    }

    return routes;
}

function loadComponent(name, component) {
    const __require = eval('require');   

    return () => Promise.resolve()
        .then(() => {           
            const dir = router.app.$getExtensionsFolder();

            return dir;
        })
        .then((dir ) => {          
            return __require(dir + `/${name}/${component}`);
        });
}



//获取原型对象上的push函数
const originalPush = Router.prototype.push

//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router;




