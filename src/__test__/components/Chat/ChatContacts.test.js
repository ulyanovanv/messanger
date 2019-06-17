import React from 'react';
import renderer from 'react-test-renderer';
import ChatContacts from '../../../components/Chat/ChatContacts';

test('ChatContacts', () => {
  const contacts = [
    {
      name: 'Ara Targaryen',
      image: 'ara',
    },
    {
      name: 'Kakadu Lannister',
      image: 'kakadu',
    },
  ];

  const tree = renderer.create(<ChatContacts contacts={contacts} />).toJSON();
  expect(tree).toMatchSnapshot();
});
