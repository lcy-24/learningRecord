<template>
  <div class="home">
    <div class="home-info">
      <div class="home_user">
        <el-row gutter="10">
          <el-col class="leftCol" :xs="24" :sm="24" :md="24" :lg="10">
            <el-card>
              <div class="home-user">
                <el-avatar
                  :size="60"
                  :src="userStore.userinfo.avatar"
                  @error="() => true"
                >
                  <img src="@/assets/image/login/avatar.png" />
                </el-avatar>
                <div class="user_content">
                  <div class="tip">
                    Hello，{{ userStore.userinfo.username }}
                  </div>
                  <div class="content">
                    {{ now }} 今日天气晴朗，气温在15℃至25℃之间，美好的一天。
                  </div>
                </div>
              </div>
              <div class="good_tip">
                <text>冰冻三尺，非一日之寒，成大事者不拘小节</text>
                <text>Mr. Xie</text>
              </div>
            </el-card>
          </el-col>
          <el-col class="rightCol" :xs="24" :sm="24" :md="24" :lg="14">
            <el-card>
              <div class="introduce">
                <text>🚩欢迎使用 {{ basic.title }}</text>
                <text>
                  这是一款基于 Vue3.4 + Vite + Pinia + Element-plus
                  的轻量级（自用）后台管理模板！！
                </text>
                <text>
                  <el-button type="primary" @click="goDocument">
                    文档说明
                  </el-button>
                </text>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="store">
        <el-card>
          <div class="tit">技术栈</div>
          <div class="store_content">
            <el-row gutter="8">
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/vue.png" alt="" />
                    <el-button class="vue" @click="goVue" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">
                    渐进式 JavaScript 框架 易学易用，性能出色，适用场景丰富的
                    Web 前端框架。
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/pinia.svg" alt="" />
                    <el-button class="pinia" @click="goPinia" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">Pinia 符合直觉的 Vue.js 状态管理库</div>
                </div>
              </el-col>
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/element.png" alt="" />
                    <el-button @click="goElement" class="element" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">
                    网站快速成型工具，
                    Element-plus一套为开发者、设计师和产品经理准备的桌面端组件库
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/ts.png" alt="" />
                    <el-button class="ts" @click="goTs" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">
                    TypeScript具有类型系统，且是JavaScript的超集。
                    它可以编译成普通的JavaScript代码。
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/vite.png" alt="" />
                    <el-button class="vite" @click="goVite" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">
                    Vite 下一代的前端工具链 为开发提供极速响应
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :md="12" :lg="8">
                <div class="store_item">
                  <div class="logo">
                    <img src="../../assets/image/ECharts.png" alt="" />
                    <el-button @click="goECharts" class="ECharts" size="small">
                      Go
                    </el-button>
                  </div>
                  <div class="content">
                    Apache ECharts 一个基于 JavaScript 的开源可视化图表库
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <div class="EChart_Group">
      <el-row gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="15">
          <el-card>
            <div class="tit">访问量</div>
            <div class="line">
              <component :is="chartComponent('line')" />
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="9">
          <el-card>
            <div class="tit">工作城市</div>
            <div class="pie">
              <component :is="chartComponent('pie')" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment"
import { useUserStore } from "@/stores/modules/user"
import { defineAsyncComponent } from "vue"
import { useRouter } from "vue-router"
import { basic } from "../../config/setting"
const userStore = useUserStore()
const router = useRouter()
let now = moment().format("YYYY-MM-DD HH:mm:ss")
const goVue = () => {
  window.open("https://cn.vuejs.org/guide/introduction.html")
}
const goTs = () => {
  window.open("https://www.tslang.cn/")
}
const goPinia = () => {
  window.open("https://pinia.web3doc.top/")
}
const goElement = () => {
  window.open("https://element-plus.org/zh-CN/component/button.html")
}
const goVite = () => {
  window.open("https://cn.vitejs.dev/")
}
const goECharts = () => {
  window.open("https://echarts.apache.org/zh/index.html")
}
const goDocument = () => {
  window.open("https://github.com/lcy-24/learningRecord")
}
// 异步加载图表
const chartComponent = (val: string) => {
  return defineAsyncComponent(() => import(`./components/${val}.vue`))
}
</script>

<style scoped lang="scss">
.el-card {
  border: 0;
}
.home {
  height: 100vh;

  .home-info {
    width: 100%;
    display: flex;
    flex-direction: column;

    .home_user {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
      .rightCol {
        margin-top: 8px;
      }
      .leftCol {
        margin-top: 8px;
      }
      .el-card {
        height: 100%;

        .home-user {
          display: flex;

          .user_content {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            .tip {
              font-size: 18px;
              font-weight: bold;
            }
            .content {
              font-size: 10px;
              color: gray;
            }
          }
        }
        .good_tip {
          padding: 10px;
          font-size: 14px;
          color: gray;
          border-top: 1px var(--el-border-color-dark) solid;
          margin-top: 10px;
          text {
            width: 100%;
            &:nth-child(2) {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              position: relative;
              color: #c5c3c3;
              &::before {
                content: "";
                position: absolute;
                width: 25px;
                height: 1px;
                background-color: #c5c3c3;
                top: 8px;
                right: 50px;
              }
            }
          }
        }
        .introduce {
          width: 100%;
          height: 120px;
          display: flex;
          flex-direction: column;
          text {
            &:nth-child(1) {
              font-size: 20px;
            }
            &:nth-child(2) {
              font-size: 12px;
              color: gray;
              margin-top: 20px;
            }
            &:nth-child(3) {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .message {
      display: flex;
      justify-content: flex-end;

      .mesItem {
        display: flex;
        flex-direction: column;
        margin: 5px 5px 0px 5px;
        text {
          &:nth-child(1) {
            font-size: 12px;
            color: gray;
          }
          &:nth-child(2) {
            font-size: 16px;
          }
        }
      }
    }
    .store {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
      .el-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        :deep(.el-card__body) {
          padding: 0 !important;
        }

        .tit {
          width: 100%;
          border-bottom: 1px var(--el-border-color-dark) solid;
          padding: 20px;
          padding-bottom: 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .store_content {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          flex-wrap: wrap;
          padding: 10px;
          .store_item {
            width: 100%;
            padding: 10px;
            height: 125px;
            border-radius: 5px;
            margin-bottom: 8px;
            border: 1px var(--el-border-color-dark) solid;
            .logo {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .el-button {
                color: #fff;
              }
              .vue {
                background-color: #41b883;
              }
              .vite {
                background-color: #9c5cfe;
              }
              .element {
                background-color: #409eff;
              }
              .ECharts {
                background-color: #a9314d;
              }
              .pinia {
                background-color: #ffc61e;
              }
              .ts {
                background-color: #007acc;
              }
              img {
                width: 50px;
                height: 50px;
              }
            }
            .content {
              margin-top: 5px;
              // color: gray;
            }
          }
        }
      }
    }
  }
  .EChart_Group {
    .el-card {
      height: 400px;
      width: 100%;
      margin-bottom: 8px;
      .tit {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px var(--el-border-color-dark) solid;
      }
      .line {
        height: 300px;
        width: 100%;
        // justify-content: space-between;
      }
      .pie {
        height: 300px;
        width: 100%;
      }
    }
  }
}
</style>
