import React, { useState, useEffect } from 'react';

//redux
import { connect } from 'react-redux'

//styling
import './Email.css';
import { Divider, TextArea, Input, Form, Button } from 'semantic-ui-react'

const EditTemplate = props => {
    const { templateData } = props
    const [id, setId] = useState(templateData.id)
    const [name, setName] = useState(templateData.name)
    const [subject, setSubject] = useState(templateData.subject)
    const [body, setBody] = useState(templateData.body)
    
    // if template in template menu is clicked, this updates state
    useEffect(() => {
        if (id === templateData.id) return
        setId(templateData.id)
        setName(templateData.name)
        setSubject(templateData.subject)
        setBody(templateData.body)
    });

    // updates template in back end 
    const saveEditTemplate = () => {
        const { userData, templateData, login, currentTemplate } = props
        if (!templateData.id) return
            const reqObj = {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                userId: userData.id,
                name, 
                subject, 
                body 
            })
        }
        
        fetch(`http://localhost:3000/templates/${templateData.id}`, reqObj)
        .then(r=>r.json())
        .then(userData => {
            login(userData)
            console.log(userData.templates.filter(t=>t.id ===templateData.id))
            currentTemplate(userData.templates.filter(t => t.id === templateData.id)[0])

        });
    }

    return (
        <> 
        {/* EDIT TEMPLATE FORM */}
            <Input placeholder="template name" 
                value={name}
                onChange={e => setName(e.target.value)}/>
            <Divider/>

            <Input placeholder="subject"
                onChange={e => setSubject(e.target.value)}
                value={subject}/>
                
            <Form className="template-text" >
                <TextArea className="template-text" 
                    placeholder="body"
                    onChange={e => setBody(e.target.value)}
                    value={body}/>
            </Form>
            <Button onClick={saveEditTemplate}>Save</Button>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
      login: userData => dispatch({ type: 'LOGIN_USER', payload: userData }), 
      currentTemplate: templateData => dispatch({type:'SET_CURRENT_TEMPLATE', payload: templateData})
    };
};
  
const mapStateToProps = state => {
    return {
        templateData: state.currentTemplate,
        userData: state.login
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditTemplate);