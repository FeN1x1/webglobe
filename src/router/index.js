import Vue from "vue";
import VueRouter from "vue-router";
import JobsList from "@/views/JobsList.vue";
import PersonsList from "@/views/PersonsList.vue";
import Job from "@/views/Job.vue";
import Person from "@/views/Person.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/jobsList",
    name: "JobsList",
    component: JobsList,
  },
  {
    path: "/personsList",
    name: "PersonsList",
    component: PersonsList,
  },
  {
    path: "/job/:id",
    name: "Job",
    component: Job,
    props: true,
  },
  {
    path: "/person/:id",
    name: "Person",
    component: Person,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
