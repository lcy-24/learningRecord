import { getUserInfoApi, loginApi } from "@/api/mock"
import router from "@/router"
import { anyRouter, asyncRouter, constRouter } from "@/router/route"
import { GETTOKEN, REMOVETOKEN, SETTOKEN } from "@/utils/local"
import cloneDeep from "lodash/cloneDeep"
import { defineStore } from "pinia"
import { ref } from "vue"
import type { RouteLocationOptions } from "vue-router"

interface loginParams {
  username: string
  password: number
}
export const useUserStore = defineStore(
  "user",
  () => {
    /***
     * @登录
     */
    const token = ref("" || GETTOKEN())
    const userinfo = ref(<any>{})
    // 用户登录
    const loginUp = async (loginParams: loginParams) => {
      const res = await loginApi(loginParams)
      console.log(res)
      if (res.code === 200) {
        token.value = res.data.token
        SETTOKEN(res.data.token)
        // 获取用户信息
        await getUserInfo(res.data.token)
        return "登录成功"
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    /**
     * @路由
     */

    // 路由表
    const routerMenuList = ref(constRouter as RouteLocationOptions[])
    // 获取用户信息
    const getUserInfo = async (token: string) => {
      const res = await getUserInfoApi(token)

      if (res.code === 200) {
        userinfo.value = res.data

        const lastRoute = filterRoute(cloneDeep(res.data.routes), asyncRouter)

        //常量路由，异步路由，任意路由综合在一起,合成路由表
        routerMenuList.value = [...constRouter, ...lastRoute, ...anyRouter]
        // 动态添加路由
        console.log(routerMenuList.value)

        routerMenuList.value.forEach((item: any) => {
          router.addRoute(item)
        })
        // console.log(routerMenuList);
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    // 权限路过滤
    const filterRoute = (routes: any, asyncRoute: any) => {
      return asyncRoute.filter((route: any) => {
        let isFilter = false

        if (routes.includes(route.name)) {
          if (route.children && route.children.length > 0) {
            route.children = filterRoute(routes, route.children)
          }
          isFilter = true
        } else {
          isFilter = false
        }
        return isFilter
      })
    }
    // 重置路由
    const resetRoutes = () => {
      //获取所有路由
      routerMenuList.value.forEach((route: any) => {
        router.removeRoute(route.name)
      })
    }

    // 退出登录
    const loginOut = () => {
      // 重置路由
      resetRoutes()
      REMOVETOKEN()
      userinfo.value = {}
      // 置空侧边栏
      routerMenuList.value = []
    }

    return {
      token,
      routerMenuList,
      userinfo,
      loginUp,
      loginOut,
      getUserInfo,
    }
  },
  {
    persist: {
      key: "userinfo",
      paths: ["userinfo", "routerMenuList"],
    },
  },
)
