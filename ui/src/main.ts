import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vant/lib/index.css';

import { Form, Button, Field, CellGroup, List } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Icon } from 'vant';
import { Uploader } from 'vant';
import { Badge } from 'vant';
import { Loading } from 'vant';

const app = createApp(App)

app.use(Form);
app.use(Field);
app.use(Button);
app.use(CellGroup);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Grid);
app.use(GridItem);
app.use(Icon);
app.use(Uploader);
app.use(Badge);
app.use(Loading);
app.use(List);

app.use(createPinia())
app.use(router)

app.mount('#app')