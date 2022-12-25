import { gql } from '@apollo/client';
const CREATE_CHATBOX_MUTATION = gql`
 mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
        name
        messages {
        sender
        body
    }
 }
}
`;   
const CREATE_MESSAGE_MUTATION = gql`
 mutation createMessage($name1: String!, $name2: String!,$name3: String!) {
    createMessage(name: $name1, to: $name2 , body: $name3) {
        sender
        body
    
 }
}
`;  
export { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION };