import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import App from './components/App';

const theme = createMuiTheme({
    palette: {
        secondary: blue
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)