import React from 'react';

//redux
import { connect } from 'react-redux';

//styling
import './Email.css';
import { Button, Icon } from 'semantic-ui-react';

const SendEmailButton = props => {
    const { currentContacts, currentTemplate } = props.state

    const emailArray = () => {
        return currentContacts.contacts.map(contact => contact.email)
    }

    // sends user to email client with template and contacts
    const sendEmail = () => {
        const mailtoURL = `mailto:${emailArray().join(",")}?subject=${currentTemplate.subject}&body=${encodeURI(currentTemplate.body)}`
        window.open(mailtoURL, "_blank") 
    }

    return (
        <Button animated onClick={sendEmail}>
            <Button.Content visible>Send</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
        </Button>
    );
};

const mapStateToProps = state => {
    return {
      state
    };
};
  
export default connect(mapStateToProps)(SendEmailButton);




