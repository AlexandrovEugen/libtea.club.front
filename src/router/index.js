import Vue from "vue";
import Router from "vue-router";

import role from "@/constants/role";

import Home from "@/views/Home.vue";
import Join from "@/views/Join.vue";
import UserCabinet from "@/views/user/Cabinet";
import TeacherCabinet from "@/views/teacher/Cabinet";
import AdminCabinet from "@/views/admin/Cabinet";
import AdminUsers from "@/views/admin/Users";
import InfoLayout from "@/components/layout/Info";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Courses from "@/views/courses/Courses";
import CourseDescription from "@/views/courses/CourseDescription";
import VideoContent from "@/views/content/VideoContent";
import NotFound from "@/views/NotFound";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/join",
            name: "join",
            component: Join
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "@/views/About.vue")
        },
        {
            path: "/site-license",
            name: "site-license",
            component: () =>
                import(/* webpackChunkName: "license" */ "@/views/License.vue")
        },
        {
            path: "/user",
            name: "userCabinet",
            component: UserCabinet,
            children: [
                {path: "", component: InfoLayout},
                {path: "cabinet", component: InfoLayout}
            ],
            meta: {
                requiresAuth: true,
                role: role.ROLE_USER
            }
        },
        {
            path: "/admin",
            name: "adminCabinet",
            component: AdminCabinet,
            children: [
                {path: "", component: InfoLayout},
                {path: "cabinet", component: InfoLayout},
                {path: "users", component: AdminUsers}
            ],
            meta: {
                requiresAuth: true,
                role: role.ROLE_ADMIN
            }
        },
        {
            path: "/teacher",
            name: "teacherCabinet",
            component: TeacherCabinet,
            children: [
                {path: "", component: InfoLayout},
                {path: "cabinet", component: InfoLayout}
            ],
            meta: {
                requiresAuth: true,
                role: role.ROLE_TEACHER
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                loginPage: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                loginPage: true
            }
        },
        {
            path: "/courses",
            name: "courses",
            component: Courses
        },
        {
            path: "/courses/:id",
            name: "course-desc",
            component: CourseDescription
        },
        {
            path: "/contents",
            name: "content",
            component: VideoContent
        },
        {
            path: "*",
            name: "404",
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isLoginPage = to.matched.some(record => record.meta.loginPage);
    const isAdminPage = to.matched.some(
        record => record.meta.role === role.ROLE_ADMIN
    );
    const isTeacherPage = to.matched.some(
        record => record.meta.role === role.ROLE_TEACHER
    );
    const isUserPage = to.matched.some(
        record => record.meta.role === role.ROLE_USER
    );

    const isAuthenticated = !!localStorage.getItem("auth");
    const userRole = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).role
        : null;

    if (requiresAuth && !isAuthenticated && !userRole) {
        next("/login");
        return;
    } else if (isLoginPage && isAuthenticated) {
        next("/");
        return;
    } else if (requiresAuth && userRole !== role.ROLE_ADMIN && isAdminPage) {
        const route = userRole.toLowerCase().replace("role_", "");
        next(`/${route}/cabinet`);
        return;
    } else if (requiresAuth && userRole !== role.ROLE_TEACHER && isTeacherPage) {
        const route = userRole.toLowerCase().replace("role_", "");
        next(`/${route}/cabinet`);
        return;
    } else if (requiresAuth && userRole !== role.ROLE_USER && isUserPage) {
        const route = userRole.toLowerCase().replace("role_", "");
        next(`/${route}/cabinet`);
        return;
    }
    next();
});

export default router;
