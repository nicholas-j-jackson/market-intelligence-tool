import Card from 'react-bootstrap/Card';
import React from 'react';



class ReviewBox extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{(this.props.review[this.props.index]).address}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{(this.props.review[this.props.index]).rating}</Card.Subtitle>
                    <Card.Text>
                        {(this.props.review[this.props.index]).review_text}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ReviewBox;