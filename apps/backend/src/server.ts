import { Elysia } from 'elysia';
import { routes } from '@/interfaces/routes';
import { config } from '@/infrastructures/config';

const app = new Elysia();

app.use(routes);

app.get('/', () => 'Backend is running');

app.listen(config.APP_PORT, () => {
    console.log(`✅ Server is running at http://localhost:${config.APP_PORT}`);
});
