import {ChatBoxModel} from "../models/chatbox";
const checkOutChatBox = async (name, to) => {
  const existing = await ChatBoxModel.findOne({name});
  if (existing) {
    return existing;
  }else{
    return await new ChatBoxModel({name: name}).save();
  }
}
const Query = {
  chatbox: async (parent, { name1,name2 }) => {
    console.log("後端有成功Query")
    let box= await checkOutChatBox(name1, name2);
    return box;
  },
};
export default Query;