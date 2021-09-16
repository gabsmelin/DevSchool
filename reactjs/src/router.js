
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PaginaPrincipal from './pages/principal';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={PaginaPrincipal} />
            </Switch>
        </BrowserRouter>
    )
}