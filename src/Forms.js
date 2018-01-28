import React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import {ReadResults, WriteResults} from './Results';

export class ReadForm extends React.PureComponent {

    getValidationState = () => this.props.input ? 'success' : 'error';
  
    render = () =>
        <form className="ReadForm" onSubmit={this.props.onSubmit}>
        <FormGroup controlId="inputRead" validationState={this.getValidationState()}>
          <FormControl
            type="text"
            value={this.props.input}
            onChange={this.props.onChange}
            placeholder="Enter key..."
            required
            autoComplete="off"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button type="submit" bsStyle="warning">Read Key!</Button>
        <ReadResults data={this.props.data} />
      </form>
}

export class WriteForm extends React.PureComponent {

    getValidationState = () => this.props.input ? 'success' : 'error';
  
    render = () =>
        <form className="WriteForm" onSubmit={this.props.onSubmit}>
        <FormGroup controlId="inputWrite" validationState={this.getValidationState()}>
          <FormControl
            type="text"
            value={this.props.input}
            onChange={this.props.onChange}
            placeholder="Enter value..."
            required
            autoComplete="off"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button type="submit" bsStyle="warning">Write value!</Button>
        <WriteResults data={this.props.data} />
      </form>

}