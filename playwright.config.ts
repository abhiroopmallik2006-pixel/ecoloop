import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/e2e',fullyParallel:false,workers:1,timeout:30000,
 expect:{timeout:10000},reporter:'list',
 use:{baseURL:'http://127.0.0.1:3000',headless:true,viewport:{width:1440,height:1000},screenshot:'only-on-failure'},
 projects:[{name:'chromium',use:{browserName:'chromium'}}]
});
