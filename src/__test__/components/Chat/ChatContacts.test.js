import React from 'react';
import ChatContacts from './../../../components/Chat/ChatContacts.jsx';
import renderer from 'react-test-renderer';

test('ChatContacts', () => {
  let contacts = [
    {
      name: "Ara Targaryen",
      image: "ara"
    },
    {
      name: "Kakadu Lannister",
      image: "kakadu"
    }
  ];

  let tree = renderer.create(<ChatContacts contacts={contacts}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
