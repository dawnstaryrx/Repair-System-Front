import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import CustomerView from '@/views/customer/CustomerView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue'
import OperatorView from '@/views/repair/OperatorView.vue';
import EngineerView from '@/views/repair/EngineerView.vue';
import RevistorView from '@/views/repair/RevistorView.vue';
import RepairListView from '@/views/repair/RepairListView.vue';
import NotFoundView from '@/views/error/NotFoundView.vue';
import ProductTypeView from '@/views/product/ProductTypeView.vue';
import ProductInfoView from '@/views/product/ProductInfoView.vue';
import RepairServiceListView from '@/views/repair/RepairServiceListView.vue'
import RepairRevisitListView from '@/views/repair/RepairRevisitListView.vue'
import SettingView from '@/views/setting/SettingView.vue';
import ManageView from '@/views/manage/ManageView.vue';
import PrintView from '@/views/print/PrintView.vue';
import InfoView from '@/views/my/InfoView.vue'
import ResetPwdView from '@/views/my/ResetPwdView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "/dashboard",
    meta: {
      requireAuth: true
    },
    children:[
      {
        path: 'customer',
        name: 'customer',
        component: CustomerView
      },
      {
        path: '/repair',
        name: 'repair',
        children:[
          {
            path: 'operator',
            name: 'operator',
            component: OperatorView
          },
          {
            path: 'engineer',
            name: 'engineer',
            component: EngineerView
          },
          {
            path: 'revistor',
            name: 'revistor',
            component: RevistorView
          },
          {
            path: 'list',
            name: 'repairList',
            component: RepairListView
          },
        ]
      },
      {
        path: "/setting",
        name: "setting",
        component: SettingView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/print",
        name: "print",
        component: PrintView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/manage",
        name: "manage",
        component: ManageView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/product',
        name: 'product',
        children:[
          {
            path: 'type',
            name: 'productType',
            component: ProductTypeView
          },
          {
            path: 'info',
            name: 'productInfo',
            component: ProductInfoView
          },
        ]
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: '/my',
        name: 'my',
        children:[
          {
            path: 'info',
            name: 'MyInfo',
            component: InfoView
          },
          {
            path: 'reset',
            name: 'MyReset',
            component: ResetPwdView
          },
        ]
      },
    ]
  },
  {
    path: "/repair/service/:id",
    name: "repairService",
    component: RepairServiceListView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/repair/revisit/:id",
    name: "repairRevisit",
    component: RepairRevisitListView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFoundView
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { useTokenStore } from '@/stores/token.js'
// 解析token，判断有没有过期
import { jwtDecode } from "jwt-decode";

// to跳转到哪个页面， from表示从哪个页面跳转过去
// next的表示将页面要不要执行下一步操作，写之前首先要记录每一个未授权界面
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore()
  // pinia出来
  var nowtoken = tokenStore.token;
  if (to.meta.requireAuth && (nowtoken === "" || nowtoken == null)) {
    next({name: "login"});
  } else {
    if(!to.meta.requireAuth){
      next();
      return;
    }
    // 判断token有没有过期
    // 解析出来
    const decode = jwtDecode(nowtoken);
    // 如果过期
    if (decode.exp * 1000  < Date.now()) {
      // 删除token
      tokenStore.removeToken;
      next({name:"login"});
    }else{
      next();
    }

  }
})

export default router
