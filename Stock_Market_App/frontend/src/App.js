import React from 'react'
import Footer from './components/Footer'
import Chartpage from './page/Chartpage'
import Fundamentpage from './page/Fundamentpage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'

function App() {
    return (
        <div>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/fundament" component={Fundamentpage} />
                        <Route path="/" component={Chartpage} />
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>

    )
}

export default App;