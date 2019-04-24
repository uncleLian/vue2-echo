import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter,
        $route: Route,
        $Progress: any,
        $indicator: any,
        $toast: any
    }
}
