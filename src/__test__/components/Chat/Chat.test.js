import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../../../components/Chat/Chat';

test('Chat', () => {
  const messages = [
    {
      message: 'Hello, how do you do?',
      date: '28.04.2019',
      user: 'ara',
    },
    {
      message: "Nice to hear you. I am fine. Let's meet today.",
      date: '28.04.2019',
      user: 'me',
    },
  ];

  const component = renderer.create(<Chat messages={messages} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
