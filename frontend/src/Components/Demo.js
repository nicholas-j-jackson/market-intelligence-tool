import React, {Component} from 'react';
import { Steps } from "intro.js-react";
import './Demo.css'


class Demo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            stepsEnabled: false,
            initialStep: 0,
            steps: [
                {
                    title: "Welcome to",
                    intro: "Market Intelligence Tool!",
                    position: "middle",
                },
                {
                    element: "#step1",
                    title: "Select the Chain",
                    intro: "Select one sub chain",
                },
                {
                    element: "#step2",
                    title: "Select the Store",
                    intro: "Select the location/region to compare",
                },
                {
                    element: "#step3",
                    title: "Menus and Price",
                    intro: "Compare the prices between different locations",
                },
                {
                    element: ".world",
                    intro: "Click on this to view the tutorial again",
                }
            ],
        };
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false}));
    };

    toggleSteps = () => {
        this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
    };

    render() {
        return (
            <div>
                <Steps
                    enabled={this.state.stepsEnabled}
                    steps={this.state.steps}
                    initialStep={this.state.initialStep}
                    options={{ hideNext: false,
                               showProgress: true,
                               showStepNumbers: true,
                            }}
                    onExit={this.onExit}
                />
                <button class="world" onClick={this.toggleSteps}>Start Tutorial</button>

            </div>
        );
    }
}

export default Demo;