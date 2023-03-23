import axios from 'axios';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') {
      return;
    }

    // Add user message to the messages array
    setMessages(prevMessages => [
      ...prevMessages,
      {text: input, isHero: false},
    ]);
    setInput('');

    // Replace with your OpenAI API key
    const apiKey = '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';

    // Construct the API request payload
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        // Add any initial message or conversation context here
        {role: 'system', content: 'You are chatting with a Marvel hero.'},
        {role: 'user', content: input},
      ],
    };

    // Send the API request
    axios
      .post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      .then(response => {
        const reply = response.data.choices[0].message.content;
        setMessages(prevMessages => [
          ...prevMessages,
          {text: reply, isHero: true},
        ]);
      })
      .catch(error => {
        console.error('Error sending message to ChatGPT:', error);
      });
  };

  return (
    <Container>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <MessageBubble isHero={item.isHero}>
            <MessageText>{item.text}</MessageText>
          </MessageBubble>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <InputContainer>
        <ChatInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message here..."
        />
        <SendButton onPress={handleSendMessage}>
          <SendButtonText>Send</SendButtonText>
        </SendButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const MessageBubble = styled.View`
  background-color: ${props => (props.isHero ? '#add8e6' : '#f1d1d1')};
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  align-self: ${props => (props.isHero ? 'flex-start' : 'flex-end')};
`;

const MessageText = styled.Text`
  font-size: 16px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 5px;
`;

const ChatInput = styled.TextInput`
  flex: 1;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 10px;
  border-radius: 5px;
  margin-left: 5px;
`;

const SendButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default Chat;
