import React from 'react';
import styled from 'styled-components';
import UIState, { UIStateListener } from 'ui/UIState';

const Container = styled.div`
  font-size: 13px;
  line-height: 20px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditInput = styled.input`
  display: block;
  width: 100%;
  background-color: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  border: none;
  padding: 0;
`;

class InlineEdit extends React.Component {

  componentWillReceiveProps(nextProps) {
    const isEditing = UIState.sidebarRenameItemId === nextProps.id;

    if (isEditing) {
      setTimeout(() => this.nameInput.base.focus(), 0);
    }
  }

  handleKeyDown = (e) => {
    const { onCancel, onSave } = this.props;

    switch (e.key) {
      case 'Enter':
        onSave && onSave(this.nameInput.base.value);
        this.toggleEditing();
        break;
      case 'Escape':
        this.toggleEditing();
        onCancel && onCancel();
        break;
    }
  };

  toggleEditing = () => {
    const isEditing = UIState.sidebarRenameItemId === this.props.id;

    if (isEditing) {
      UIState.update({
        sidebarRenameItemId: null
      });
      return;
    }

    UIState.update({
      sidebarRenameItemId: this.props.id
    });

    setTimeout(() => this.nameInput.base.focus(), 0);
  };

  onCancel = () => {
    this.setState({ editing: false });
  };

  render() {
    const isEditing = UIState.sidebarRenameItemId === this.props.id;

    return (
      <Container onDoubleClick={ this.toggleEditing }>
        { isEditing && (
          <EditInput
            type="text"
            ref={ input => this.nameInput = input }
            defaultValue={ this.props.defaultValue }
            onBlur={ this.onCancel }
            onKeyDown={ this.handleKeyDown }/>
        )}

        { !isEditing && this.props.children }
      </Container>
    );
  }

}

export default UIStateListener(InlineEdit);