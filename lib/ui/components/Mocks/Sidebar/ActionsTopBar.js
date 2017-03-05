import React from 'react';
import API from 'api';
import MockState from 'ui/states/MocksState';
import Icon from 'ui/components/common/Icon';
import ActionIcon from 'ui/components/common/ActionIcon';
import IconDropdown from 'ui/components/common/IconDropdown';
import { ActionGroup, ActionsContainer, Action } from 'ui/components/Mocks/Sidebar/styled';

const toggleRecording = () => {
  if (API.isRecording) {
    API.stopRecording();
  } else {
    API.startRecording();
  }
};

const addNew = (type) => {
  if (type === 'mock') {
    const newMock = API.addMock();

    MocksState.selectItems([newMock]);
  }

  if (type === 'group') {
    const newGroup = API.addGroup({ name: 'New Group' });

    MockState.addGroup({
      id: newGroup.id,
      isOpen: false,
      lastState: null
    });

    MockState.selectItems([newGroup]);
  }
};

const ActionsTopBar = () => (
  <ActionsContainer>
    <ActionGroup marginRight="40">
      <Action>
        <IconDropdown icon="add"
                      options={ ['mock', 'group'] }
                      onChange={ addNew }/>
      </Action>
      <Action onClick={ toggleRecording } margin="2">
        {
          API.isRecording
            ? <Icon src="recording" style={{ fill: '#c44a13' }}/>
            : <ActionIcon action="record"/>
        }
      </Action>
    </ActionGroup>

    <ActionGroup autosize>
      <Action onClick={ MockState.collapseAllGroups }>
        <ActionIcon action="collapseAll" disabled={ !API.groups.length }/>
      </Action>
      <Action onClick={ MockState.expandAllGroups }>
        <ActionIcon action="expandAll" disabled={ !API.groups.length }/>
      </Action>
    </ActionGroup>

    <ActionGroup>
      <Action>
        <ActionIcon action="undo"/>
      </Action>
      <Action onClick={ MockState.deleteSelected }>
        <ActionIcon action="remove" disabled={ !API.groups.length || !API.mocks.length }/>
      </Action>
    </ActionGroup>
  </ActionsContainer>
);

export default ActionsTopBar;