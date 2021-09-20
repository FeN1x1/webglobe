import Vue from "vue";
import VueRouter from "vue-router";

import JobsList from "@/views/JobsList.vue";
import PersonsList from "@/views/PersonsList.vue";
import Job from "@/views/Job.vue";
import Person from "@/views/Person.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/jobsList" },
  {
    path: "/jobsList",
    name: "jobsList",
    component: JobsList,
  },
  {
    path: "/personsList",
    name: "personsList",
    component: PersonsList,
  },
  {
    path: "/job",
    name: "createJob",
    component: Job,
  },
  {
    path: "/job/:id",
    name: "editJob",
    component: Job,
    props: true,
  },
  {
    path: "/person",
    name: "createPerson",
    component: Person,
  },
  {
    path: "/person/:id",
    name: "editPerson",
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
