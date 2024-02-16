import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    selectedConversation: null,
    conversations: [],
  },
  reducers: {
    setMessagesReducer(state, action) {
      state.messages = [...action.payload];
    },
    setConversationsReducer(state, action) {
      state.conversations = [...action.payload];
    },
    setSelectedConversationReducer(state, action) {
      state.selectedConversation = action.payload;
    },
  },
});

export const {
  setMessagesReducer,
  setSelectedConversationReducer,
  setConversationsReducer,
} = chatSlice.actions;
export default chatSlice.reducer;
