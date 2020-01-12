import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
class RouterMap extends Component {
    render() {
        const { routes } = this.props;
        return (
            <Switch>
                <Redirect from="/main" to="/main/userlist" exact />;
                {routes.map((item, index) => {
                    const TempComponent = item.component;
                    return (
                        <Route
                            key={item.name}
                            path={item.path}
                            component={config => {
                                if (item.children) {
                                    return <TempComponent children={item.children} {...config} />;
                                } else {
                                    return <TempComponent {...config} />;
                                }
                            }}
                        />
                    );
                })}
            </Switch>
        );
    }
}
export default RouterMap;
