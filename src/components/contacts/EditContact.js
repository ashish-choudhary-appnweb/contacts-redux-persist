import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContact, updateContact } from '../../actions/contactActions';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  static getDerivedStateFromProps(props, state){
    const { name, email, phone } = props.contact;
    return {
      name,
      email,
      phone
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    const { contacts, contact } = this.props;
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if(contact.phone !== phone) {
      const res = contacts.filter(item => item.phone === phone)
      if(res.length > 0){
        this.setState({ errors: { phone: 'Phone Number Already Exist.' } });
        return;
      }
    }

    if(!(/^\d{10}$/.test(phone))){
      this.setState({ errors: { phone: 'Please Check the phone no.' } });
      return;
    }

    const { id } = this.props.match.params;

    const updatedContact = {
      id,
      name,
      email,
      phone
    };

    this.props.updateContact(updatedContact);

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              type="number"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact,
  contacts: state.contact.contacts
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
