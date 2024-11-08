import { create } from 'zustand';

const useModalStore = create((set) => ({
  isCreateChatRoomModalOpen: false,
  openCreateChatRoomModal: () => set({ isCreateChatRoomModalOpen: true }),
  closeCreateChatRoomModal: () => set({ isCreateChatRoomModalOpen: false }),
}));

export default useModalStore;